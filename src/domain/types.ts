export type LevelId = 'beginner' | 'intermediate' | 'pro';

export type Question =
  | { id: string; type: 'choice'; prompt: string; options: string[]; answer: number; explanation: string }
  | { id: string; type: 'truefalse'; prompt: string; answer: boolean; explanation: string }
  | { id: string; type: 'order'; prompt: string; items: string[]; explanation: string };

export interface Step {
  text: string;
}

export interface Chapter {
  id: string;
  title: string;
  steps: Step[];
  realLife: { title: string; text: string };
  quiz: Question[];
}

export interface Level {
  id: LevelId;
  title: string;
  chapters: Chapter[];
}

export interface Topic {
  id: string;
  title: string;
  icon: string;
  levels: Level[];
}

export type UserAnswer = number | boolean | string[];

export interface Progress {
  completedChapters: Record<string, number>; // chapterId -> best score (0..1)
  quizzesTaken: number;
  correctAnswers: number;
  totalAnswers: number;
  streak: number;
  lastActiveDay: string | null; // YYYY-MM-DD
}
