import { Image } from 'expo-image'
import { FlatList, Pressable, StyleSheet, Text } from 'react-native'

import ListView from '@/components/list-view'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { useConfirmed } from '../providers/confirmed'
import { usePlatform } from '../providers/platform'
import { useSuggestions } from '../providers/suggestions'

export default function HomeScreen() {
  const { suggestions, removeSuggestion } = useSuggestions()
  const { platform } = usePlatform()
  const user = platform === 'ios' ? 'Swan' : 'Sab'
  const filteredSuggestions = suggestions.filter(
    (suggestion) => suggestion.submittedBy !== user,
  )

  const { addConfirmed } = useConfirmed()

  const handleReject = (index: number) => {
    const updatedSuggestions = [...suggestions]
    const itemToReject = updatedSuggestions.splice(index, 1)[0]
    removeSuggestion(itemToReject.id)
  }

  const handleApprove = (index: number) => {
    const updatedSuggestions = [...suggestions]
    const approvedItem = updatedSuggestions.splice(index, 1)[0]
    removeSuggestion(approvedItem.id)
    addConfirmed(approvedItem.title)
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
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Review Suggestions</ThemedText>
      </ThemedView>
      <ThemedView>
        <FlatList
          style={styles.listContainer}
          data={filteredSuggestions}
          renderItem={({ item }) => (
            <ThemedView>
              <Text style={styles.listItems}>{item.title}</Text>
              <ThemedView style={styles.listItem}>
                <Pressable
                  onPress={() => handleApprove(suggestions.indexOf(item))}
                  style={styles.approveButton}
                >
                  <ThemedText>Approve</ThemedText>
                </Pressable>
                <Pressable
                  onPress={() => handleReject(suggestions.indexOf(item))}
                  style={styles.rejectButton}
                >
                  <ThemedText>Reject</ThemedText>
                </Pressable>
              </ThemedView>
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
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  approveButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: 10,
    borderRadius: 5,
  },
  rejectButton: {
    backgroundColor: '#f44336',
    color: 'white',
    padding: 10,
    borderRadius: 5,
  },
})
