import type { Progress } from './types.ts';

export const emptyProgress = (): Progress => ({
  completedChapters: {},
  quizzesTaken: 0,
  correctAnswers: 0,
  totalAnswers: 0,
  streak: 0,
  lastActiveDay: null,
});

export const dayKey = (d: Date): string =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

const daysBetween = (a: string, b: string): number => {
  const [ya, ma, da] = a.split('-').map(Number);
  const [yb, mb, db] = b.split('-').map(Number);
  return Math.round((Date.UTC(yb, mb - 1, db) - Date.UTC(ya, ma - 1, da)) / 86400000);
};

export function recordQuiz(
  p: Progress,
  result: { chapterId: string; score: number; correct: number; answered: number },
  now: Date = new Date(),
): Progress {
  const today = dayKey(now);
  let streak = p.streak;
  if (p.lastActiveDay === null) streak = 1;
  else {
    const gap = daysBetween(p.lastActiveDay, today);
    if (gap === 1) streak += 1;
    else if (gap > 1 || gap < 0) streak = 1;
  }
  return {
    completedChapters: {
      ...p.completedChapters,
      [result.chapterId]: Math.max(p.completedChapters[result.chapterId] ?? 0, result.score),
    },
    quizzesTaken: p.quizzesTaken + 1,
    correctAnswers: p.correctAnswers + result.correct,
    totalAnswers: p.totalAnswers + result.answered,
    streak,
    lastActiveDay: today,
  };
}
