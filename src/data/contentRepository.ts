import content from './content/content.json';
import expandedContent from './content/expanded-content.json';
import type { Chapter, Level, Topic } from '../domain/types.ts';

const baseTopics = content.topics as unknown as Topic[];
const additionalChapters = expandedContent.chapters as unknown as {
  topicId: string;
  levelId: string;
  chapter: Chapter;
}[];
const topics = baseTopics.map((topic) => ({
  ...topic,
  levels: topic.levels.map((level) => ({
    ...level,
    chapters: [
      ...level.chapters,
      ...additionalChapters
        .filter((entry) => entry.topicId === topic.id && entry.levelId === level.id)
        .map((entry) => entry.chapter),
    ],
  })),
}));

export const getTopics = (): Topic[] => topics;
export const getTopic = (id: string): Topic | undefined => topics.find((t) => t.id === id);
export const getLevel = (topicId: string, levelId: string): Level | undefined =>
  getTopic(topicId)?.levels.find((l) => l.id === levelId);
export const getChapter = (topicId: string, levelId: string, chapterId: string): Chapter | undefined =>
  getLevel(topicId, levelId)?.chapters.find((c) => c.id === chapterId);
