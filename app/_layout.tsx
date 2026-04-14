import { useColorScheme } from '@/hooks/use-color-scheme'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import 'react-native-reanimated'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import AuthProvider from './providers/auth'
import ConfirmedProvider from './providers/confirmed'
import PlatformProvider from './providers/platform'
import SuggestionsProvider from './providers/suggestions'

export const unstable_settings = {
  anchor: '(tabs)',
}

export default function RootLayout() {
  const colorScheme = useColorScheme()

  //To do - fix typing for route params in modal screen

  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <AuthProvider>
          <ConfirmedProvider>
            <SuggestionsProvider>
              <PlatformProvider>
                <ThemeProvider
                  value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
                >
                  <Stack>
                    <Stack.Screen
                      name="index"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="(tabs)"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="modal"
                      options={({ route }: { route: any }) => ({
                        presentation: 'modal',
                        title: route.params?.title
                          ? route.params.title
                          : 'Modal',
                      })}
                    />
                  </Stack>
                  <StatusBar style="auto" />
                </ThemeProvider>
              </PlatformProvider>
            </SuggestionsProvider>
          </ConfirmedProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
