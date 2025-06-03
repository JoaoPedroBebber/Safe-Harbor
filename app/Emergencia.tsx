import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function EmergencyScreen() {
  const router = useRouter();
  const [steps, setSteps] = useState<string[]>([]);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const data = require('../assets/data/emergency.json')
      setSteps(data);
      setLoading(false);
    }, 1000);
  }, []);

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setStep(0);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#d32f2f" />
        <Text style={{ marginTop: 20 }}>Carregando orientações...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estou em crise</Text>
      <View style={styles.card}>
        <Text style={styles.text}>{steps[step]}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={nextStep}>
        <Text style={styles.buttonText}>{step < steps.length - 1 ? 'Próxima orientação' : 'Recomeçar'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff3e0' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, color: '#d32f2f' },
  card: { borderWidth: 2, borderColor: '#d32f2f', borderRadius: 12, padding: 24, marginBottom: 30, backgroundColor: '#fff', width: 320 },
  text: { fontSize: 20, color: '#333', textAlign: 'center' },
  button: { backgroundColor: '#d32f2f', padding: 14, borderRadius: 8, marginBottom: 20, width: 220, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18 },
  backButton: { marginTop: 10, padding: 12, backgroundColor: '#1976d2', borderRadius: 8 },
  backText: { color: '#fff', fontSize: 18 },
});