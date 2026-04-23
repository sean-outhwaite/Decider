import FullscreenListView from '@/components/fullscreen-list-view'
import ListItemSwipeable from '@/components/list-item-swipeable'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { IconSymbol } from '@/components/ui/icon-symbol'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { RootStackParamList } from '../../constants/types'
import { useConfirmed } from '../providers/confirmed'

export default function TabTwoScreen() {
  const { confirmed, archiveConfirmed } = useConfirmed()

  const activeConfirmed = confirmed.filter((item) => !item.archived)

  const handleDelete = (index: number) => {
    const updatedConfirmed = [...activeConfirmed]
    const itemToDelete = updatedConfirmed.splice(index, 1)[0]
    archiveConfirmed(itemToDelete.id)
  }

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  return (
    <>
      <FullscreenListView>
        <ThemedView>
          <ThemedText type="title">
            Ready to Watch<Text style={{ color: '#d99eee' }}>.</Text>
          </ThemedText>
          <View style={styles.listContainer}>
            {activeConfirmed.length > 0 ? (
              activeConfirmed.map((item) => (
                <ListItemSwipeable
                  actionType="delete"
                  key={item.id}
                  onSwipeableOpen={() => {
                    handleDelete(activeConfirmed.indexOf(item))
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
              ))
            ) : (
              <ThemedText style={{ fontStyle: 'italic' }}>
                Nothing to watch.
              </ThemedText>
            )}
          </View>
        </ThemedView>
      </FullscreenListView>
      <Pressable
        style={styles.fab}
        onPress={() =>
          navigation.navigate('modal', {
            title: 'Deleted Items',
            screen: 'confirmed',
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
