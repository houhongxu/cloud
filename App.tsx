import { NavigationContainer } from '@react-navigation/native';

import './src/i18n';
import { RootNavigator } from './src/navigation/root-navigator';

export default function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
