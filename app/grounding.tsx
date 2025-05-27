import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Step = { prompt: string; color: string };

export default function GroundingScreen() {
  const router = useRouter();
  const [steps, setSteps] = useState<Step[]>([]);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const data = require('../assets/data/grounding.json');
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
        <ActivityIndicator size="large" color="#1976d2" />
        <Text style={{ marginTop: 20 }}>Carregando etapas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Grounding 5-4-3-2-1</Text>
      <View style={[styles.card, { borderColor: steps[step].color }]}>
        <Text style={styles.prompt}>{steps[step].prompt}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={nextStep}>
        <Text style={styles.buttonText}>{step < steps.length - 1 ? 'Próximo' : 'Recomeçar'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e3f2fd' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, color: '#1976d2' },
  card: { borderWidth: 3, borderRadius: 12, padding: 24, marginBottom: 30, backgroundColor: '#fff', width: 320 },
  prompt: { fontSize: 20, color: '#333', textAlign: 'center' },
  button: { backgroundColor: '#1976d2', padding: 14, borderRadius: 8, marginBottom: 20, width: 180, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18 },
  backButton: { marginTop: 10, padding: 12, backgroundColor: '#1976d2', borderRadius: 8 },
  backText: { color: '#fff', fontSize: 18 },
});