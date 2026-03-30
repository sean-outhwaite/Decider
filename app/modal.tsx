import { Link, useLocalSearchParams } from 'expo-router'
import { StyleSheet } from 'react-native'

import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'

import { Confirmed } from './types'

export default function ModalScreen() {
  const { data } = useLocalSearchParams()

  const archived = Array.isArray(data) ? ['Invalid Data'] : JSON.parse(data)

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">This is a modal</ThemedText>
      <Link href="/" dismissTo style={styles.link}>
        {archived.length > 0 ? (
          archived.map((item: Confirmed) => (
            <ThemedText key={item.id}>{item.title}</ThemedText>
          ))
        ) : (
          <ThemedText>No archived items</ThemedText>
        )}
      </Link>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
})
