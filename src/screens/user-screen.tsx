import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import { UserScreenBody } from '../features/user/components/user-screen-body';

export const UserScreen = () => (
  <LinearGradient colors={['#020f2d', '#041e4f', '#020f2d']} style={styles.root}>
    <StatusBar style="light" />
    <View style={styles.layer}>
      <UserScreenBody />
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
