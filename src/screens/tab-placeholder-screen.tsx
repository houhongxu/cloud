import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { color, gradient } from '../theme/design-tokens';
import { font } from '../theme/typography';

type TabPlaceholderScreenProps = Readonly<{
  titleKey: 'tabs.recovery' | 'tabs.library' | 'tabs.community' | 'tabs.user';
}>;

export const TabPlaceholderScreen = ({ titleKey }: TabPlaceholderScreenProps) => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient colors={[...gradient.screen]} style={styles.container}>
      <StatusBar style="dark" />
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
    color: color.text,
    fontSize: 22,
    fontFamily: font.headingBold,
    textAlign: 'center',
  },
  body: {
    marginTop: 12,
    color: color.textSecondary,
    fontSize: 14,
    fontFamily: font.bodySemi,
    textAlign: 'center',
    lineHeight: 20,
  },
});
