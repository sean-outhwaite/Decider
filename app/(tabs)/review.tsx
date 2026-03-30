import { Pressable, StyleSheet, Text, View } from 'react-native'

import NewListView from '@/components/new-list-view'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { IconSymbol } from '@/components/ui/icon-symbol'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useConfirmed } from '../providers/confirmed'
import { usePlatform } from '../providers/platform'
import { useSuggestions } from '../providers/suggestions'
import { RootStackParamList } from '../types'

export default function HomeScreen() {
  const { suggestions, archiveSuggestion, removeSuggestion } = useSuggestions()
  const { platform } = usePlatform()
  const user = platform === 'ios' ? 'Swan' : 'Sab'
  const filteredSuggestions = suggestions.filter(
    (suggestion) => suggestion.submittedBy !== user && !suggestion.archived,
  )

  const archivedSuggestions = suggestions.filter(
    (suggestion) => suggestion.submittedBy !== user && suggestion.archived,
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

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  return (
    <>
      <NewListView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="title">
            Review Suggestions<Text style={{ color: '#d99eee' }}>.</Text>
          </ThemedText>
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
                    <ThemedText
                      style={styles.buttonText}
                      type="defaultSemiBold"
                    >
                      ✓
                    </ThemedText>
                  </Pressable>
                  <Pressable
                    onPress={() => handleReject(suggestions.indexOf(item))}
                    style={styles.rejectButton}
                  >
                    <ThemedText
                      style={styles.buttonText}
                      type="defaultSemiBold"
                    >
                      X
                    </ThemedText>
                  </Pressable>
                </View>
              </ThemedView>
            ))}
          </View>
        </ThemedView>
      </NewListView>
      <Pressable
        style={styles.fab}
        onPress={() =>
          navigation.navigate('modal', {
            title: 'Deleted Suggestions',
            data: JSON.stringify(archivedSuggestions),
          })
        }
      >
        <Text style={styles.fabText}>
          <IconSymbol color="#fff" name="document.on.trash" size={24} />
        </Text>
      </Pressable>
    </>
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
    color: '#fff',
    padding: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'stretch',
    overflow: 'hidden',
  },
  buttonText: {
    color: '#ffffffff',
    fontSize: 16,
  },
  approveButton: {
    backgroundColor: '#71c375ff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 0,
    borderRightWidth: 0.75,
    borderColor: '#444',
  },
  rejectButton: {
    backgroundColor: '#e06464ff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 0,
    borderLeftWidth: 0.75,
    borderColor: '#444',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#d99eee',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  fabText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
})
