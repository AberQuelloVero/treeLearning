import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BigButton } from './BigButton.tsx';
import { shuffle } from '../../domain/quiz.ts';
import type { Question, UserAnswer } from '../../domain/types.ts';
import { colors, font, spacing } from '../theme.ts';

interface Props {
  question: Question;
  onAnswered: (answer: UserAnswer) => boolean;
  onNext: () => void;
}

/** Shows one question; after answering, shows feedback and the targeted explanation. */
export function QuestionView({ question, onAnswered, onNext }: Props) {
  const [result, setResult] = useState<boolean | null>(null);
  const [picked, setPicked] = useState<string[]>([]);
  const pool = useMemo(() => (question.type === 'order' ? shuffle(question.items) : []), [question]);

  const submit = (a: UserAnswer) => setResult(onAnswered(a));

  return (
    <View>
      <Text style={styles.prompt}>{question.prompt}</Text>

      {result === null && question.type === 'choice' &&
        question.options.map((o, i) => <BigButton key={o} label={o} variant="secondary" onPress={() => submit(i)} />)}

      {result === null && question.type === 'truefalse' && (
        <>
          <BigButton label="Vero" variant="secondary" onPress={() => submit(true)} />
          <BigButton label="Falso" variant="secondary" onPress={() => submit(false)} />
        </>
      )}

      {result === null && question.type === 'order' && (
        <>
          <Text style={styles.hint}>Tocca i passaggi nell'ordine giusto:</Text>
          {pool.map((item) => (
            <BigButton
              key={item}
              label={picked.includes(item) ? `${picked.indexOf(item) + 1}. ${item}` : item}
              variant="secondary"
              disabled={picked.includes(item)}
              onPress={() => setPicked([...picked, item])}
            />
          ))}
          <BigButton label="Conferma" disabled={picked.length !== pool.length} onPress={() => submit(picked)} />
          <BigButton label="Ricomincia" variant="secondary" onPress={() => setPicked([])} />
        </>
      )}

      {result !== null && (
        <View accessibilityLiveRegion="polite">
          <Text style={[styles.feedback, { color: result ? colors.good : colors.bad }]}>
            {result ? '✅ Giusto!' : '❌ Non proprio'}
          </Text>
          <Text style={styles.explanation}>{question.explanation}</Text>
          <BigButton label="Avanti" onPress={() => { setResult(null); setPicked([]); onNext(); }} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  prompt: { fontSize: font.title, fontWeight: '700', color: colors.text, marginBottom: spacing.m },
  hint: { fontSize: font.small, color: colors.text, marginBottom: spacing.s },
  feedback: { fontSize: font.title, fontWeight: '800', marginVertical: spacing.m },
  explanation: { fontSize: font.body, color: colors.text, lineHeight: 30, marginBottom: spacing.m },
});
