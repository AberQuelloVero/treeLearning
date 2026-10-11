import type { Chapter, Question, Topic, UserAnswer } from './types.ts';

export function createGeneralQuizChapter(topics: readonly Topic[]): Chapter {
  return {
    id: 'general-quiz',
    title: 'Quiz generale',
    steps: [{ text: 'Rispondi alle domande di tutte le categorie per ripassare l’alfabetizzazione digitale.' }],
    realLife: {
      title: 'Ripasso completo',
      text: 'Come un giro di ripasso prima di uscire, questo quiz tocca un po’ tutti gli argomenti.',
    },
    quiz: topics.flatMap((topic) => topic.levels.flatMap((level) => level.chapters.flatMap((chapter) => chapter.quiz))),
  };
}

export function isCorrect(q: Question, answer: UserAnswer): boolean {
  switch (q.type) {
    case 'choice':
    case 'truefalse':
      return answer === q.answer;
    case 'order':
      return Array.isArray(answer) && answer.length === q.items.length && answer.every((v, i) => v === q.items[i]);
  }
}

/** Deterministic PRNG so rotation is testable. */
function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function shuffle<T>(items: readonly T[], rand: () => number = Math.random): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Rotating quiz: questions in a new order every session, wrong ones are re-queued once at the end. */
export class QuizSession {
  private queue: Question[];
  private requeued = new Set<string>();
  correct = 0;
  answered = 0;
  readonly total: number;

  constructor(questions: readonly Question[], seed?: number) {
    this.queue = shuffle(questions, seed === undefined ? Math.random : mulberry32(seed));
    this.total = questions.length;
  }

  get current(): Question | undefined {
    return this.queue[0];
  }

  get finished(): boolean {
    return this.queue.length === 0;
  }

  /** Returns whether the answer was correct. */
  submit(answer: UserAnswer): boolean {
    const q = this.queue.shift();
    if (!q) return false;
    const ok = isCorrect(q, answer);
    if (ok) {
      this.correct++;
    } else if (!this.requeued.has(q.id)) {
      this.requeued.add(q.id);
      this.queue.push(q);
    }
    this.answered++;
    return ok;
  }

  /** Score on first attempts: 0..1 */
  get score(): number {
    const firstTry = this.total - this.requeued.size;
    return this.total === 0 ? 0 : Math.max(0, firstTry) / this.total;
  }
}
