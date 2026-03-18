import { HelloWave } from '@/components/hello-wave'
import ListItemSwipeable from '@/components/list-item-swipeable'
import ListView from '@/components/list-view'
import { ThemedTextInput } from '@/components/themed-input'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { Image } from 'expo-image'
import { useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { usePlatform } from '../providers/platform'
import { useSuggestions } from '../providers/suggestions'

export default function HomeScreen() {
  const [submission, setSubmission] = useState('')
  const { suggestions, addSuggestion, removeSuggestion } = useSuggestions()
  const user = usePlatform().platform === 'ios' ? 'Swan' : 'Sab'

  const handleDelete = (index: number) => {
    const updatedSuggestions = [...suggestions]
    const itemToDelete = updatedSuggestions.splice(index, 1)[0]
    removeSuggestion(itemToDelete.id)
  }

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
          source={require('@/assets/images/splash.png')}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">
          Decider<Text style={{ color: '#d99eee' }}>.</Text>
        </ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Submit a suggestion</ThemedText>
      </ThemedView>
      <ThemedView>
        <ThemedTextInput
          type="default"
          placeholder="Enter your suggestion"
          placeholderTextColor="#888"
          value={submission}
          onChangeText={setSubmission}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 8,
          }}
        >
          <Button color="#d99eee" title="Submit" onPress={handleSubmit} />
        </View>
      </ThemedView>
      <ThemedView>
        <ThemedText style={{ alignSelf: 'center', height: 40 }} type="title">
          Your Suggestions
        </ThemedText>
        <View style={styles.listContainer}>
          {filteredSuggestions.map((item) => (
            <ListItemSwipeable
              key={item.id}
              onSwipeableOpen={() => {
                handleDelete(filteredSuggestions.indexOf(item))
              }}
            >
              <ThemedView>
                <Text style={styles.listItems}>{item.title}</Text>
              </ThemedView>
            </ListItemSwipeable>
          ))}
        </View>
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
    height: '100%',
    width: '100%',
    position: 'absolute',
    transform: [{ scale: 3 }],
    top: 80,
  },
  listContainer: {
    padding: 10,
  },
  listItems: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#3b3b3bff',
    color: '#fff',
    borderRadius: 8,
  },
})
