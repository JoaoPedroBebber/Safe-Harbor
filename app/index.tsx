import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Secure Harbor</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/breathing')}>
        <Text style={styles.buttonText}>Respiração Guiada</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/affirmations')}>
        <Text style={styles.buttonText}>Frases de Apoio</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/grounding')}>
        <Text style={styles.buttonText}>Grounding</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.emergency]} onPress={() => router.push('/emergency')}>
        <Text style={styles.buttonText}>Estou em crise</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e3f2fd' },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 40, color: '#1976d2' },
  button: { backgroundColor: '#1976d2', padding: 18, borderRadius: 12, marginVertical: 10, width: 250, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  emergency: { backgroundColor: '#d32f2f' },
});