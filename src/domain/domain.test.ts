import test from 'node:test';
import assert from 'node:assert/strict';
import { createGeneralQuizChapter, QuizSession, isCorrect } from './quiz.ts';
import { emptyProgress, recordQuiz } from './progress.ts';
import type { Question, Topic } from './types.ts';

const qs: Question[] = [
  { id: 'a', type: 'choice', prompt: '?', options: ['x', 'y'], answer: 1, explanation: 'e' },
  { id: 'b', type: 'truefalse', prompt: '?', answer: true, explanation: 'e' },
  { id: 'c', type: 'order', prompt: '?', items: ['1', '2', '3'], explanation: 'e' },
];

test('isCorrect handles all question types', () => {
  assert.ok(isCorrect(qs[0], 1));
  assert.ok(!isCorrect(qs[1], false));
  assert.ok(isCorrect(qs[2], ['1', '2', '3']));
  assert.ok(!isCorrect(qs[2], ['2', '1', '3']));
});

test('wrong answers are requeued once and lower the score', () => {
  const s = new QuizSession(qs, 1);
  const first = s.current!;
  s.submit(first.type === 'truefalse' ? false : first.type === 'choice' ? 0 : []);
  assert.equal(s.finished, false);
  let guard = 0;
  while (!s.finished && guard++ < 10) {
    const q = s.current!;
    s.submit(q.type === 'order' ? q.items : q.answer);
  }
  assert.ok(s.finished);
  assert.ok(Math.abs(s.score - 2 / 3) < 1e-9);
});

test('general quiz combines questions from all selected categories and levels', () => {
  const topics = [{
    id: 'devices',
    title: 'Dispositivi',
    icon: '📱',
    levels: [{
      id: 'beginner',
      title: 'Principiante',
      chapters: [
        { id: 'device-basics', title: 'Dispositivi', steps: [], realLife: { title: '', text: '' }, quiz: [qs[0]] },
        { id: 'device-safety', title: 'Uso sicuro', steps: [], realLife: { title: '', text: '' }, quiz: [qs[1]] },
      ],
    }, {
      id: 'intermediate',
      title: 'Intermedio',
      chapters: [{ id: 'connections', title: 'Connessioni', steps: [], realLife: { title: '', text: '' }, quiz: [qs[2]] }],
    }],
  }] as unknown as Topic[];

  const chapter = createGeneralQuizChapter(topics);
  assert.equal(chapter.id, 'general-quiz');
  assert.deepEqual(chapter.quiz, qs);
});

test('streak grows on consecutive days and resets after a gap', () => {
  const r = { chapterId: 'c1', score: 1, correct: 3, answered: 3 };
  let p = recordQuiz(emptyProgress(), r, new Date(2025, 0, 1));
  p = recordQuiz(p, r, new Date(2025, 0, 1));
  assert.equal(p.streak, 1);
  p = recordQuiz(p, r, new Date(2025, 0, 2));
  assert.equal(p.streak, 2);
  p = recordQuiz(p, r, new Date(2025, 0, 5));
  assert.equal(p.streak, 1);
});
