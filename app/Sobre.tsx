import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SobreScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/perfil.jpg')}
        style={styles.profileImage}
      />
      <Text style={styles.title}>Sobre o Desenvolvedor</Text>
      <Text style={styles.text}>
        Olá! Meu nome é João Pedro Bebber, sou estudante de Engenharia de Software na FAG. Desenvolvi este aplicativo pensando especialmente em meus amigos e familiares que enfrentam desafios relacionados à ansiedade. Espero que este app possa ser um porto seguro e contribuir para o bem-estar de todos que o utilizarem.
      </Text>
      <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/')}>
        <Ionicons name="arrow-back" size={24} color="#1976d2" />
        <Text style={styles.backButtonText}>Voltar para Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e3f2fd', padding: 24 },
  profileImage: { width: 120, height: 120, borderRadius: 60, marginBottom: 24 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: '#1976d2' },
  text: { fontSize: 18, color: '#333', textAlign: 'center', marginBottom: 32 },
  backButton: { flexDirection: 'row', alignItems: 'center', marginTop: 16, padding: 10 },
  backButtonText: { color: '#1976d2', fontSize: 16, marginLeft: 8, fontWeight: 'bold' },
});