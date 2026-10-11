import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { BigButton } from '../components/BigButton.tsx';
import type { Progress, Topic } from '../../domain/types.ts';
import { colors, font, spacing } from '../theme.ts';

interface Props {
  topic: Topic;
  progress: Progress;
  onOpen: (chapterId: string, levelId: string, freeTest: boolean) => void;
  onBack: () => void;
}

export function LevelScreen({ topic, progress, onOpen, onBack }: Props) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text accessibilityRole="header" style={styles.title}>{topic.icon} {topic.title}</Text>
      {topic.levels.map((lvl) => (
        <React.Fragment key={lvl.id}>
          <Text style={styles.level}>{lvl.title}</Text>
          {lvl.chapters.map((c) => {
            const best = progress.completedChapters[c.id];
            const done = best !== undefined ? ` ✓ ${Math.round(best * 100)}%` : '';
            return (
              <React.Fragment key={c.id}>
                <BigButton label={`📖 ${c.title}${done}`} onPress={() => onOpen(c.id, lvl.id, false)} />
                <BigButton label="⚡ Test libero (salta la teoria)" variant="secondary" onPress={() => onOpen(c.id, lvl.id, true)} />
              </React.Fragment>
            );
          })}
        </React.Fragment>
      ))}
      <BigButton label="← Indietro" variant="secondary" onPress={onBack} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.m, backgroundColor: colors.bg },
  title: { fontSize: font.title + 4, fontWeight: '800', color: colors.text, marginBottom: spacing.m },
  level: { fontSize: font.title, fontWeight: '700', color: colors.primary, marginTop: spacing.m },
});
