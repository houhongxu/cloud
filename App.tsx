import { Lora_400Regular, Lora_600SemiBold, Lora_700Bold } from '@expo-google-fonts/lora';
import {
  Raleway_400Regular,
  Raleway_500Medium,
  Raleway_600SemiBold,
  Raleway_700Bold,
} from '@expo-google-fonts/raleway';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import './src/i18n';
import { isFontBootstrapComplete } from './src/lib/font-load-gate';
import { RootNavigator } from './src/navigation/root-navigator';
import { color } from './src/theme/design-tokens';

void SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Lora_400Regular,
    Lora_600SemiBold,
    Lora_700Bold,
    Raleway_400Regular,
    Raleway_500Medium,
    Raleway_600SemiBold,
    Raleway_700Bold,
  });

  const fontsReady = isFontBootstrapComplete(fontsLoaded, fontError);

  useEffect(() => {
    if (fontsReady) {
      void SplashScreen.hideAsync().catch(() => {
        /* splash API can be unavailable on some web contexts */
      });
    }
  }, [fontsReady]);

  if (!fontsReady) {
    return (
      <View style={styles.bootPlaceholder} accessibilityLabel="Loading">
        <ActivityIndicator size="large" color={color.primary} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  bootPlaceholder: {
    flex: 1,
    backgroundColor: color.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
