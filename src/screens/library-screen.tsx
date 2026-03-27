import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import { LibraryScreenBody } from '../features/library/components/library-screen-body';

export const LibraryScreen = () => (
  <LinearGradient colors={['#0a0a23', '#1a0f2e', '#0a0a23']} style={styles.root}>
    <StatusBar style="light" />
    <View style={styles.layer}>
      <LibraryScreenBody />
    </View>
  </LinearGradient>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  layer: {
    flex: 1,
  },
});
