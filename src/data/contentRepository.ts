import content from './content/content.json';
import type { Chapter, Level, Topic } from '../domain/types.ts';

const topics = content.topics as unknown as Topic[];

export const getTopics = (): Topic[] => topics;
export const getTopic = (id: string): Topic | undefined => topics.find((t) => t.id === id);
export const getLevel = (topicId: string, levelId: string): Level | undefined =>
  getTopic(topicId)?.levels.find((l) => l.id === levelId);
export const getChapter = (topicId: string, levelId: string, chapterId: string): Chapter | undefined =>
  getLevel(topicId, levelId)?.chapters.find((c) => c.id === chapterId);
