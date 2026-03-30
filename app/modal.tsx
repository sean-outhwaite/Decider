import { useLocalSearchParams } from 'expo-router'
import { StyleSheet, View } from 'react-native'

import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'

import ListItemSwipeable from '@/components/list-item-swipeable'
import NewListView from '@/components/new-list-view'
import { Confirmed } from './types'

import { useConfirmed } from './providers/confirmed'
import { useSuggestions } from './providers/suggestions'

export default function ModalScreen() {
  const { data, screen } = useLocalSearchParams()

  const archived = Array.isArray(data) ? ['Invalid Data'] : JSON.parse(data)

  const { restoreConfirmed } = useConfirmed()
  const { restoreSuggestion } = useSuggestions()

  const swipeHandlers: Record<string, (id: string) => void> = {
    confirmed: restoreConfirmed,
    suggestions: restoreSuggestion,
  }

  const handleSwipe = Array.isArray(screen) ? () => {} : swipeHandlers[screen]

  return (
    <NewListView>
      <View style={styles.listContainer}>
        {archived.length > 0 ? (
          archived.map((item: Confirmed) => (
            <ListItemSwipeable
              key={item.id}
              onSwipeableOpen={() => handleSwipe(item.id)}
            >
              <ThemedView
                style={{
                  display: 'flex',
                }}
              >
                <ThemedText style={styles.listItems}>{item.title}</ThemedText>
              </ThemedView>
            </ListItemSwipeable>
          ))
        ) : (
          <ThemedText>No deleted items</ThemedText>
        )}
      </View>
    </NewListView>
  )
}

const styles = StyleSheet.create({
  listItems: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#3b3b3bff',
    color: '#fff',
    borderRadius: 8,
  },
  listContainer: {
    width: '100%',
    padding: 10,
  },
})
