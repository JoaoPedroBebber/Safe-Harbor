import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function SobreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sobre o Desenvolvedor</Text>
      <Text style={styles.text}>
        Olá! Meu nome é [Seu Nome]. Desenvolvi este app como parte de um projeto para ajudar pessoas a encontrarem um porto seguro em momentos difíceis. Espero que seja útil para você!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: '#1976d2' },
  text: { fontSize: 18, color: '#333', textAlign: 'center' },
});