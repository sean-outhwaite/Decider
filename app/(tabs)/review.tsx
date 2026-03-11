import { Image } from 'expo-image'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import ListView from '@/components/list-view'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { useConfirmed } from '../providers/confirmed'
import { usePlatform } from '../providers/platform'
import { useSuggestions } from '../providers/suggestions'

export default function HomeScreen() {
  const { suggestions, archiveSuggestion, removeSuggestion } = useSuggestions()
  const { platform } = usePlatform()
  const user = platform === 'ios' ? 'Swan' : 'Sab'
  const filteredSuggestions = suggestions.filter(
    (suggestion) => suggestion.submittedBy !== user,
  )

  const { addConfirmed } = useConfirmed()

  const handleReject = (index: number) => {
    const updatedSuggestions = [...suggestions]
    const itemToReject = updatedSuggestions.splice(index, 1)[0]
    archiveSuggestion(itemToReject.id)
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
        <View style={styles.listContainer}>
          {filteredSuggestions.map((item) => (
            <ThemedView key={item.id} style={styles.listItems}>
              <Text style={styles.listText}>{item.title}</Text>
              <View style={styles.buttonRow}>
                <Pressable
                  onPress={() => handleApprove(suggestions.indexOf(item))}
                  style={styles.approveButton}
                >
                  <ThemedText style={styles.buttonText} type="defaultSemiBold">
                    Approve
                  </ThemedText>
                </Pressable>
                <Pressable
                  onPress={() => handleReject(suggestions.indexOf(item))}
                  style={styles.rejectButton}
                >
                  <ThemedText style={styles.buttonText} type="defaultSemiBold">
                    X
                  </ThemedText>
                </Pressable>
              </View>
            </ThemedView>
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
    backgroundColor: '#3b3b3bff',
    borderRadius: 8,
    marginBottom: 8,
    padding: 0,
    overflow: 'hidden',
    elevation: 0,
    shadowColor: 'transparent',
  },
  listText: {
    color: '#ffffffff',
    padding: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'stretch',
  },
  buttonText: {
    color: '#ffffffff',
    fontSize: 16,
  },
  approveButton: {
    backgroundColor: '#4CAF50',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 0,
  },
  rejectButton: {
    backgroundColor: '#ff5a4eff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 0,
    elevation: 0,
    shadowColor: 'transparent',
  },
})
