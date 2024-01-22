import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function Header() {
  return (
    <View style={styles.Header}>
      <Text>Header</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
    Header: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
