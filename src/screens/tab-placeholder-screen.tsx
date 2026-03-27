import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type TabPlaceholderScreenProps = Readonly<{
  titleKey: 'tabs.recovery' | 'tabs.library' | 'tabs.community' | 'tabs.user';
}>;

export const TabPlaceholderScreen = ({ titleKey }: TabPlaceholderScreenProps) => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient colors={['#050B1C', '#07112a', '#050B1C']} style={styles.container}>
      <StatusBar style="light" />
      <View style={[styles.content, { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 }]}>
        <Text style={styles.title}>{t(titleKey)}</Text>
        <Text style={styles.body}>{t('tabs.placeholderBody')}</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'center',
  },
  body: {
    marginTop: 12,
    color: 'rgba(255,255,255,0.62)',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 20,
  },
});
