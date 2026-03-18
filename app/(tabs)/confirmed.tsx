import ListItemSwipeable from '@/components/list-item-swipeable'
import NewListView from '@/components/new-list-view'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { StyleSheet, Text, View } from 'react-native'
import { useConfirmed } from '../providers/confirmed'

export default function TabTwoScreen() {
  const { confirmed, removeConfirmed } = useConfirmed()

  const handleDelete = (index: number) => {
    const updatedConfirmed = [...confirmed]
    const itemToDelete = updatedConfirmed.splice(index, 1)[0]
    removeConfirmed(itemToDelete.id)
  }

  return (
    <NewListView>
      <ThemedView>
        <ThemedText type="title">Ready to Watch</ThemedText>
        <View style={styles.listContainer}>
          {confirmed.map((item) => (
            <ListItemSwipeable
              key={item.id}
              onSwipeableOpen={() => {
                handleDelete(confirmed.indexOf(item))
              }}
            >
              <ThemedView
                style={{
                  display: 'flex',
                }}
              >
                <Text style={styles.listItems}>{item.title}</Text>
              </ThemedView>
            </ListItemSwipeable>
          ))}
        </View>
      </ThemedView>
    </NewListView>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  listContainer: {
    width: '100%',
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
