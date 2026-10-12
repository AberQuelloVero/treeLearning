import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { BigButton } from './BigButton.tsx';
import { colors, font, spacing } from '../theme.ts';

interface Props {
  visible: boolean;
  title: string;
  text: string;
  onClose: () => void;
}

export function RealLifeModal({ visible, title, text, onClose }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{text}</Text>
          <BigButton label="Ho capito" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', padding: spacing.m },
  card: { backgroundColor: colors.bg, borderRadius: 20, padding: spacing.l },
  title: { fontSize: font.title, fontWeight: '800', color: colors.text, marginBottom: spacing.m },
  text: { fontSize: font.body, color: colors.text, lineHeight: 30, marginBottom: spacing.m },
});
