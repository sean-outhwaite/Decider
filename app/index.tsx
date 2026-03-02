import { Image } from 'expo-image'
import { Pressable, StyleSheet } from 'react-native'

import ListView from '@/components/list-view'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { getAuth, signInAnonymously } from '@react-native-firebase/auth'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { useAuth } from './providers/auth'

export default function HomeScreen() {
  const { user, initializing } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!initializing && user) {
      router.navigate('/(tabs)')
    }
  }, [user, initializing, router])

  if (initializing) return null

  if (!user) {
    return (
      <ListView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <Image
            source={require('@/assets/images/partial-react-logo.png')}
            style={styles.reactLogo}
          />
        }
      >
        <ThemedView style={styles.titleContainer}>
          <Pressable onPress={() => signInAnonymously(getAuth())}>
            <ThemedText>Login</ThemedText>
          </Pressable>
        </ThemedView>
      </ListView>
    )
  }

  return null
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
})
