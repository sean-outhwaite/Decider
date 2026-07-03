import { useLocalSearchParams } from 'expo-router'
import { Alert, Pressable, StyleSheet, View } from 'react-native'

import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'

import FullscreenListView from '@/components/fullscreen-list-view'
import ListItemSwipeable from '@/components/list-item-swipeable'
import { Confirmed, Suggestion } from '../constants/types'

import { useConfirmed } from './providers/confirmed'
import { useSuggestions } from './providers/suggestions'

import { IconSymbol } from '@/components/ui/icon-symbol'

export default function ModalScreen() {
  const { screen } = useLocalSearchParams()

  const { restoreConfirmed, confirmed } = useConfirmed()
  const { restoreSuggestion, suggestions } = useSuggestions()

  // TODO: Move this filtering to the providers
  const archived: (Confirmed | Suggestion)[] =
    screen === 'confirmed'
      ? confirmed.filter((item) => item.archived)
      : suggestions.filter((item) => item.archived)

  const swipeHandlers: Record<string, (id: string) => void> = {
    confirmed: restoreConfirmed,
    suggestions: restoreSuggestion,
  }

  const handleSwipe = Array.isArray(screen) ? () => {} : swipeHandlers[screen]

  return (
    <FullscreenListView>
      <View style={styles.listContainer}>
        {archived.length > 0 ? (
          archived.map((item) => (
            <ListItemSwipeable
              actionType="restore"
              key={item.id}
              onSwipeableOpen={() => handleSwipe(item.id)}
            >
              <ThemedView
                style={{
                  display: 'flex',
                }}
              >
                <ThemedText style={styles.listItems}>{item.title}</ThemedText>
                {'rejectionReason' in item && item.rejectionReason && (
                  <Pressable
                    style={styles.fab}
                    onPress={() =>
                      Alert.alert(
                        'Rejection Reason',
                        item.rejectionReason || undefined,
                      )
                    }
                  >
                    <IconSymbol color="#d99eee" name="i.circle" size={24} />
                  </Pressable>
                )}
              </ThemedView>
            </ListItemSwipeable>
          ))
        ) : (
          <ThemedText style={{ fontStyle: 'italic' }}>
            No deleted items
          </ThemedText>
        )}
      </View>
    </FullscreenListView>
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
  fab: {
    position: 'absolute',
    top: 4,
    right: 5,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
