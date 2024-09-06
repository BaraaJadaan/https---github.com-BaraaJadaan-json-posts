import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';


export default function RootLayout() {

  return (
    <Provider store={store}>
    <GestureHandlerRootView>
      <Stack>
        <Stack.Screen 
            name="index" 
            options={{ title: 'Posts', headerTitleAlign: 'center',  }} />
      </Stack>
    </GestureHandlerRootView>
    </Provider>
  );
}
