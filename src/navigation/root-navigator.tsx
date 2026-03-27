import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { QuestionnaireScreen } from '../screens/questionnaire-screen';
import { MainTabNavigator } from './main-tab-navigator';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Questionnaire">
      <Stack.Screen name="Questionnaire" component={QuestionnaireScreen} />
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />
    </Stack.Navigator>
  );
};
