import { ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { ThemedView } from '@/components/themed-view'
import { useThemeColor } from '@/hooks/use-theme-color'

type Props = {
  children?: React.ReactNode
}
export default function NewListView({ children }: Props) {
  const backgroundColor = useThemeColor({}, 'background')

  return (
    <SafeAreaView style={{ backgroundColor, flex: 1 }}>
      <ScrollView style={{ backgroundColor, flex: 1 }}>
        <ThemedView style={styles.content}>{children}</ThemedView>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
})
