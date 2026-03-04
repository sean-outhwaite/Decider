import { HelloWave } from '@/components/hello-wave'
import ListView from '@/components/list-view'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { Image } from 'expo-image'
import { FlatList, StyleSheet, Text } from 'react-native'
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable'
import Reanimated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { useConfirmed } from '../providers/confirmed'

export default function TabTwoScreen() {
  const { confirmed, removeConfirmed } = useConfirmed()

  const handleDelete = (index: number) => {
    const updatedConfirmed = [...confirmed]
    const itemToDelete = updatedConfirmed.splice(index, 1)[0]
    removeConfirmed(itemToDelete.id)
  }

  function RightAction(prog: SharedValue<number>, drag: SharedValue<number>) {
    const styleAnimation = useAnimatedStyle(() => {
      const width = interpolate(prog.value, [0, 1], [0, 100], 'clamp')
      return {
        width,
      }
    })

    return (
      <Reanimated.View style={[styles.rightAction, styleAnimation]}>
        <Text style={styles.rightActionText}>Delete</Text>
      </Reanimated.View>
    )
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
      <ThemedView>
        <ThemedText type="title">Ready to Watch</ThemedText>
        <FlatList
          style={styles.listContainer}
          data={confirmed}
          renderItem={({ item }) => (
            <Swipeable
              childrenContainerStyle={{ flex: 1 }}
              renderRightActions={RightAction}
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
            </Swipeable>
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
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  listContainer: {
    width: '100%',
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
  rightAction: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 15,
    marginVertical: 5,
    backgroundColor: 'red',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  rightActionText: {
    color: 'white',
    fontWeight: 'bold',
  },
})
