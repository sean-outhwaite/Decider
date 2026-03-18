import { StyleSheet, Text } from 'react-native'
import Swipeable, {
  SwipeableProps,
} from 'react-native-gesture-handler/ReanimatedSwipeable'
import Reanimated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated'

type ListItemSwipeableProps = {
  onSwipeableOpen: SwipeableProps['onSwipeableOpen']
  children: React.ReactNode
}

export default function ListItemSwipeable({
  onSwipeableOpen,
  children,
}: ListItemSwipeableProps) {
  function RightAction(prog: SharedValue<number>) {
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
    <Swipeable
      childrenContainerStyle={{ flex: 1 }}
      onSwipeableOpen={onSwipeableOpen}
      renderRightActions={RightAction}
    >
      {children}
    </Swipeable>
  )
}
const styles = StyleSheet.create({
  rightAction: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#e06464ff',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  rightActionText: {
    color: 'white',
    fontWeight: 'bold',
  },
})
