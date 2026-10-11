import AsyncStorage from '@react-native-async-storage/async-storage';
import { emptyProgress } from '../domain/progress.ts';
import type { Progress } from '../domain/types.ts';

const KEY = 'treelearning.progress.v1';

export async function loadProgress(): Promise<Progress> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? { ...emptyProgress(), ...JSON.parse(raw) } : emptyProgress();
  } catch {
    return emptyProgress();
  }
}

export async function saveProgress(p: Progress): Promise<void> {
  await AsyncStorage.setItem(KEY, JSON.stringify(p));
}
