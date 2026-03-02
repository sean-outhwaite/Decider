import { Image } from 'expo-image'
import { Button, FlatList, StyleSheet, Text } from 'react-native'

import { HelloWave } from '@/components/hello-wave'
import ListView from '@/components/list-view'
import { ThemedTextInput } from '@/components/themed-input'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { useState } from 'react'
import { usePlatform } from '../providers/platform'
import { useSuggestions } from '../providers/suggestions'

export default function HomeScreen() {
  const [submission, setSubmission] = useState('')
  const { suggestions, addSuggestion } = useSuggestions()
  const user = usePlatform().platform === 'ios' ? 'Swan' : 'Sab'

  const filteredSuggestions = suggestions.filter(
    (suggestion) => suggestion.submittedBy === user,
  )

  const handleSubmit = () => {
    if (submission.trim() === '') return
    addSuggestion(submission, user)
    setSubmission('')
  }

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
        <ThemedText type="title">Decider</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Submit a suggestion</ThemedText>
      </ThemedView>
      <ThemedView>
        <ThemedTextInput
          placeholder="Enter your suggestion"
          value={submission}
          onChangeText={setSubmission}
        />
        <Button title="Submit" onPress={handleSubmit} />
      </ThemedView>
      <ThemedView>
        <ThemedText type="title">Your Suggestions</ThemedText>
        <FlatList
          style={styles.listContainer}
          data={filteredSuggestions}
          renderItem={({ item }) => (
            <ThemedView>
              <Text style={styles.listItems}>{item.title}</Text>
            </ThemedView>
          )}
        />
      </ThemedView>
    </ListView>
  )
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
  listContainer: {
    padding: 10,
  },
  listItems: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#f0efefff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: 8,
  },
})
