import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { getChapter, getTopics } from './src/data/contentRepository.ts';
import { loadProgress, saveProgress } from './src/data/progressRepository.ts';
import { emptyProgress, recordQuiz } from './src/domain/progress.ts';
import type { Progress, Topic } from './src/domain/types.ts';
import { HomeScreen } from './src/presentation/screens/HomeScreen.tsx';
import { LevelScreen } from './src/presentation/screens/LevelScreen.tsx';
import { LessonScreen } from './src/presentation/screens/LessonScreen.tsx';
import { colors } from './src/presentation/theme.ts';

type Route =
  | { name: 'home' }
  | { name: 'topic'; topic: Topic }
  | { name: 'lesson'; topic: Topic; levelId: string; chapterId: string; freeTest: boolean };

export default function App() {
  const [route, setRoute] = useState<Route>({ name: 'home' });
  const [progress, setProgress] = useState<Progress>(emptyProgress());

  useEffect(() => { loadProgress().then(setProgress); }, []);

  const chapter = route.name === 'lesson' ? getChapter(route.topic.id, route.levelId, route.chapterId) : undefined;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar barStyle="dark-content" />
      {route.name === 'home' && (
        <HomeScreen topics={getTopics()} progress={progress} onSelect={(topic) => setRoute({ name: 'topic', topic })} />
      )}
      {route.name === 'topic' && (
        <LevelScreen
          topic={route.topic}
          progress={progress}
          onBack={() => setRoute({ name: 'home' })}
          onOpen={(chapterId, levelId, freeTest) => setRoute({ name: 'lesson', topic: route.topic, chapterId, levelId, freeTest })}
        />
      )}
      {route.name === 'lesson' && chapter && (
        <LessonScreen
          key={chapter.id + route.freeTest}
          chapter={chapter}
          startWithQuiz={route.freeTest}
          onBack={() => setRoute({ name: 'topic', topic: route.topic })}
          onQuizDone={(r) => {
            const next = recordQuiz(progress, r);
            setProgress(next);
            saveProgress(next);
          }}
        />
      )}
    </SafeAreaView>
  );
}
