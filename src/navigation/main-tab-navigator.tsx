import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AppTabBar } from '../components/app-tab-bar';
import { CommunityScreen } from '../screens/community-screen';
import { HomeScreen } from '../screens/home-screen';
import { LibraryScreen } from '../screens/library-screen';
import { RecoveryScreen } from '../screens/recovery-screen';
import { UserScreen } from '../screens/user-screen';
import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <AppTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Recovery" component={RecoveryScreen} />
      <Tab.Screen name="Library" component={LibraryScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="User" component={UserScreen} />
    </Tab.Navigator>
  );
};
