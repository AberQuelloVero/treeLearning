import React from 'react';
import { Pressable, Text, StyleSheet, type ViewStyle } from 'react-native';
import { colors, font, spacing } from '../theme.ts';

interface Props {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'good' | 'bad';
  disabled?: boolean;
  style?: ViewStyle;
}

export function BigButton({ label, onPress, variant = 'primary', disabled, style }: Props) {
  const bg = { primary: colors.primary, secondary: colors.surface, good: colors.good, bad: colors.bad }[variant];
  const fg = variant === 'secondary' ? colors.primary : colors.onPrimary;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.btn,
        { backgroundColor: bg, borderColor: colors.border, opacity: disabled ? 0.5 : pressed ? 0.7 : 1 },
        pressed && styles.pressed,
        style,
      ]}
    >
      <Text style={[styles.label, { color: fg }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: { minHeight: 64, paddingHorizontal: spacing.l, paddingVertical: spacing.m, borderRadius: 16, borderWidth: 2, justifyContent: 'center', marginVertical: spacing.s },
  pressed: { transform: [{ scale: 0.97 }] },
  label: { fontSize: font.body, fontWeight: '700', textAlign: 'center' },
});
