import { Image } from 'expo-image'
import {
  Button,
  FlatList,
  GestureResponderEvent,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native'

import { HelloWave } from '@/components/hello-wave'
import ListView from '@/components/list-view'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { useState } from 'react'

export default function HomeScreen() {
  const [submission, setSubmission] = useState('')
  const [suggestions, setSuggestions] = useState<{ key: string }[]>([])

  const handleSubmit = (e: GestureResponderEvent) => {
    e.preventDefault()
    setSuggestions([...suggestions, { key: submission }])
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
        <TextInput
          placeholder="Enter your suggestion"
          value={submission}
          onChangeText={setSubmission}
        />
        <Button
          title="Submit"
          onPress={(e) => {
            handleSubmit(e)
          }}
        />
      </ThemedView>
      <ThemedView>
        <ThemedText type="title">Your Suggestions</ThemedText>
        <FlatList
          data={suggestions}
          renderItem={({ item }) => <Text>{item.key}</Text>}
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
})
