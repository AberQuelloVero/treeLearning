import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { BigButton } from '../components/BigButton.tsx';
import type { Progress, Topic } from '../../domain/types.ts';
import { colors, font, spacing } from '../theme.ts';

interface Props {
  topics: Topic[];
  progress: Progress;
  onSelect: (topic: Topic) => void;
  onGeneralQuiz: () => void;
}

export function HomeScreen({ topics, progress, onSelect, onGeneralQuiz }: Props) {
  const acc = progress.totalAnswers ? Math.round((progress.correctAnswers / progress.totalAnswers) * 100) : 0;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text accessibilityRole="header" style={styles.title}>Cosa vuoi imparare?</Text>
      <Text style={styles.stats}>🔥 Giorni di fila: {progress.streak}   ·   Quiz: {progress.quizzesTaken}   ·   Precisione: {acc}%</Text>
      <BigButton label="🎯 Quiz generale" variant="secondary" onPress={onGeneralQuiz} />
      {topics.map((t) => (
        <BigButton key={t.id} label={`${t.icon} ${t.title}`} onPress={() => onSelect(t)} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.m, backgroundColor: colors.bg },
  title: { fontSize: font.title + 4, fontWeight: '800', color: colors.text, marginBottom: spacing.m },
  stats: { fontSize: font.small, color: colors.text, marginBottom: spacing.m },
});
