import type { NavigatorScreenParams } from '@react-navigation/native';

export type MainTabParamList = {
  Home: undefined;
  Recovery: undefined;
  Library: undefined;
  Community: undefined;
  User: undefined;
};

export type RootStackParamList = {
  Questionnaire: undefined;
  MainTabs: NavigatorScreenParams<MainTabParamList> | undefined;
};
