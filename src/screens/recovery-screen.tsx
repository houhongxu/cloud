import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import { RecoveryScreenBody } from '../features/recovery/components/recovery-screen-body';

export const RecoveryScreen = () => (
  <LinearGradient colors={['#050B1C', '#07112a', '#050B1C']} style={styles.root}>
    <StatusBar style="light" />
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
