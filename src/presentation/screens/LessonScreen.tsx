import React, { useRef, useState } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { BigButton } from '../components/BigButton.tsx';
import { RealLifeModal } from '../components/RealLifeModal.tsx';
import { QuestionView } from '../components/QuestionView.tsx';
import { QuizSession } from '../../domain/quiz.ts';
import type { Chapter } from '../../domain/types.ts';
import { colors, font, spacing } from '../theme.ts';

interface Props {
  chapter: Chapter;
  startWithQuiz?: boolean; // "Test libero": quiz without reading the theory first
  onQuizDone: (r: { chapterId: string; score: number; correct: number; answered: number }) => void;
  onBack: () => void;
}

export function LessonScreen({ chapter, startWithQuiz = false, onQuizDone, onBack }: Props) {
  const [mode, setMode] = useState<'theory' | 'quiz' | 'done'>(startWithQuiz ? 'quiz' : 'theory');
  const [showRealLife, setShowRealLife] = useState(false);
  const [, force] = useState(0);
  const session = useRef(new QuizSession(chapter.quiz));
  const s = session.current;

  const restart = () => { session.current = new QuizSession(chapter.quiz); setMode('quiz'); };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text accessibilityRole="header" style={styles.title}>{chapter.title}</Text>

      {mode === 'theory' && (
        <>
          {chapter.steps.map((st, i) => (
            <Text key={i} style={styles.step}>{i + 1}. {st.text}</Text>
          ))}
          <BigButton label="Esempio pratico" variant="secondary" onPress={() => setShowRealLife(true)} />
          <BigButton label="Fai il quiz" onPress={() => setMode('quiz')} />
        </>
      )}

      {mode === 'quiz' && s.current && (
        <>
          <Text style={styles.progress}>Domande risolte: {s.correct} di {s.total}</Text>
          <QuestionView
            key={s.current.id}
            question={s.current}
            onAnswered={(a) => s.submit(a)}
            onNext={() => {
              if (s.finished) {
                onQuizDone({ chapterId: chapter.id, score: s.score, correct: s.correct, answered: s.answered });
                setMode('done');
              } else force((n) => n + 1);
            }}
          />
          <BigButton label="Esempio pratico" variant="secondary" onPress={() => setShowRealLife(true)} />
        </>
      )}

      {mode === 'done' && (
        <>
          <Text style={styles.step}>🎉 Quiz completato! Punteggio: {Math.round(s.score * 100)}%</Text>
          <BigButton label="Rifai il quiz" onPress={restart} />
          <BigButton label="Rileggi la spiegazione" variant="secondary" onPress={() => setMode('theory')} />
        </>
      )}

      <BigButton label="← Indietro" variant="secondary" onPress={onBack} />
      <RealLifeModal
        visible={showRealLife}
        title={chapter.realLife.title}
        text={chapter.realLife.text}
        onClose={() => setShowRealLife(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.m, paddingBottom: spacing.l * 2, backgroundColor: colors.bg },
  title: { fontSize: font.title + 4, fontWeight: '800', color: colors.text, marginBottom: spacing.m },
  step: { fontSize: font.body, lineHeight: 32, color: colors.text, marginBottom: spacing.m },
  progress: { fontSize: font.small, color: colors.text, marginBottom: spacing.m },
});
