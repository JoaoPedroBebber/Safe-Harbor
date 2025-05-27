import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const steps = [
  { label: 'Inspire', duration: 4 },
  { label: 'Segure', duration: 4 },
  { label: 'Expire', duration: 6 },
];

export default function BreathingScreen() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [seconds, setSeconds] = useState(steps[0].duration);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev > 1) return prev - 1;
        if (step < steps.length - 1) {
          setStep(step + 1);
          return steps[step + 1].duration;
        } else {
          setStep(0);
          return steps[0].duration;
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [step]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Respiração Guiada</Text>
      <Text style={styles.step}>{steps[step].label}</Text>
      <Text style={styles.timer}>{seconds}s</Text>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e3f2fd' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, color: '#1976d2' },
  step: { fontSize: 24, marginBottom: 10, color: '#1976d2' },
  timer: { fontSize: 48, fontWeight: 'bold', marginBottom: 30, color: '#1976d2' },
  backButton: { marginTop: 40, padding: 12, backgroundColor: '#1976d2', borderRadius: 8 },
  backText: { color: '#fff', fontSize: 18 },
});