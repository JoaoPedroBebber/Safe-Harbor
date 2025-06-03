import { Ionicons } from '@expo/vector-icons'; // Adicione este import
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AffirmationsScreen() {
  const router = useRouter();
  const [affirmations, setAffirmations] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula um fetch (mock API)
    setTimeout(() => {
      const data = require('../assets/data/affirmations.json');
      setAffirmations(data);
      setLoading(false);
    }, 1000); // 1 segundo para simular carregamento
  }, []);

  const nextAffirmation = () => {
    setIndex((prev) => (prev + 1) % affirmations.length);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#1976d2" />
        <Text style={{ marginTop: 20 }}>Carregando frases...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Botão de voltar no topo */}
      <TouchableOpacity style={styles.headerBack} onPress={() => router.replace('/')}>
        <Ionicons name="arrow-back" size={28} color="#1976d2" />
        <Text style={styles.headerBackText}>Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Frases de Apoio</Text>
      <Text style={styles.affirmation}>{affirmations[index]}</Text>
      <TouchableOpacity style={styles.button} onPress={nextAffirmation}>
        <Text style={styles.buttonText}>Próxima</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e3f2fd' },
  headerBack: { position: 'absolute', top: 50, left: 20, flexDirection: 'row', alignItems: 'center', padding: 8 },
  headerBackText: { color: '#1976d2', fontSize: 18, marginLeft: 6, fontWeight: 'bold' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, color: '#1976d2' },
  affirmation: { fontSize: 22, marginBottom: 30, color: '#1976d2', textAlign: 'center', paddingHorizontal: 20 },
  button: { backgroundColor: '#1976d2', padding: 14, borderRadius: 8, marginBottom: 20, width: 180, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18 },
});