import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import './src/i18n';

export default function App() {
  const { t, i18n } = useTranslation();

  const onToggleLanguage = (): void => {
    const nextLanguage = i18n.language.startsWith('zh') ? 'en' : 'zh';
    void i18n.changeLanguage(nextLanguage);
  };

  return (
    <LinearGradient colors={['#2cb6d9', '#101347', '#090d30']} style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.content}>
        <Text style={styles.logo}>CLOUD MVP</Text>
        <Text style={styles.title}>{t('hello.title')}</Text>
        <Text style={styles.subtitle}>{t('hello.subtitle')}</Text>

        <TouchableOpacity style={styles.primaryButton} onPress={onToggleLanguage}>
          <Text style={styles.primaryButtonText}>{t('hello.cta')}</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 14,
  },
  logo: {
    color: '#ffffff',
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 32,
  },
  title: {
    color: '#ffffff',
    fontSize: 32,
    lineHeight: 40,
    textAlign: 'center',
    fontWeight: '700',
  },
  subtitle: {
    color: '#e4ecff',
    fontSize: 22,
    lineHeight: 30,
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: 20,
  },
  primaryButton: {
    minWidth: 160,
    borderRadius: 999,
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 26,
  },
  primaryButtonText: {
    color: '#101347',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
  },
});
