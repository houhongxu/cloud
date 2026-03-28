import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import { LibraryScreenBody } from '../features/library/components/library-screen-body';
import { gradient } from '../theme/design-tokens';

export const LibraryScreen = () => (
  <LinearGradient colors={[...gradient.screenCool]} style={styles.root}>
    <StatusBar style="dark" />
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
