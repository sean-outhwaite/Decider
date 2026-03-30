import { StyleSheet } from 'react-native'
import Swipeable, {
  SwipeableProps,
} from 'react-native-gesture-handler/ReanimatedSwipeable'
import Reanimated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { IconSymbol } from './ui/icon-symbol'

type ListItemSwipeableProps = {
  onSwipeableOpen: SwipeableProps['onSwipeableOpen']
  children: React.ReactNode
  actionType: 'delete' | 'restore'
}

export default function ListItemSwipeable({
  onSwipeableOpen,
  children,
  actionType,
}: ListItemSwipeableProps) {
  function RightAction(prog: SharedValue<number>) {
    const styleAnimation = useAnimatedStyle(() => {
      const width = interpolate(prog.value, [0, 1], [0, 100], 'clamp')
      return {
        width,
      }
    })

    return (
      <Reanimated.View style={[styles[actionType], styleAnimation]}>
        <IconSymbol
          name={actionType === 'delete' ? 'trash.fill' : 'arrow.clockwise'}
          size={26}
          color="#fff"
        />
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
  delete: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#e06464ff',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  restore: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 15,
    marginVertical: 5,
    backgroundColor: 'rgb(108, 224, 100)',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  rightActionText: {
    color: 'white',
    fontWeight: 'bold',
  },
})
