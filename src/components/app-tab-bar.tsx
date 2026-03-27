import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  CommunityTabIcon,
  HomeTabIcon,
  LibraryTabIcon,
  RecoveryTabIcon,
  UserTabIcon,
} from './app-tab-bar-icons';

const ICON_SIZE = 22;

const tabLabelKey = (routeName: string): string => {
  switch (routeName) {
    case 'Home':
      return 'tabs.home';
    case 'Recovery':
      return 'tabs.recovery';
    case 'Library':
      return 'tabs.library';
    case 'Community':
      return 'tabs.community';
    case 'User':
      return 'tabs.user';
    default:
      return 'tabs.home';
  }
};

const TabGlyph = ({ routeName, color }: Readonly<{ routeName: string; color: string }>) => {
  switch (routeName) {
    case 'Home':
      return <HomeTabIcon size={ICON_SIZE} color={color} />;
    case 'Recovery':
      return <RecoveryTabIcon size={ICON_SIZE} color={color} />;
    case 'Library':
      return <LibraryTabIcon size={ICON_SIZE} color={color} />;
    case 'Community':
      return <CommunityTabIcon size={ICON_SIZE} color={color} />;
    case 'User':
      return <UserTabIcon size={ICON_SIZE} color={color} />;
    default:
      return <HomeTabIcon size={ICON_SIZE} color={color} />;
  }
};

export const AppTabBar = ({ state, navigation }: BottomTabBarProps) => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrap, { paddingBottom: Math.max(insets.bottom, 10) }]}>
      <View style={styles.row}>
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const color = focused ? '#00E676' : 'rgba(255,255,255,0.42)';
          const label = t(tabLabelKey(route.name));

          const onPress = (): void => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = (): void => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={focused ? { selected: true } : {}}
              accessibilityLabel={label}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.item}
              activeOpacity={0.85}
            >
              <TabGlyph routeName={route.name} color={color} />
              <Text style={[styles.label, { color }]} numberOfLines={1}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: 'rgba(5, 11, 28, 0.94)',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255,255,255,0.08)',
    paddingTop: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    minWidth: 0,
  },
  label: {
    fontSize: 10,
    fontWeight: '800',
  },
});
