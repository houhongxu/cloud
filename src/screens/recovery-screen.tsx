import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import { RecoveryScreenBody } from '../features/recovery/components/recovery-screen-body';
import { gradient } from '../theme/design-tokens';

export const RecoveryScreen = () => (
  <LinearGradient colors={[...gradient.screen]} style={styles.root}>
    <StatusBar style="dark" />
    <View style={styles.layer}>
      <RecoveryScreenBody />
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
