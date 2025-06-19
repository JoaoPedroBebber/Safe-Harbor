import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function CadastroScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  async function handleCadastrar() {
    if (!nome.trim() || !email.trim() || !senha.trim()) {
      Alert.alert('Preencha todos os campos');
      return;
    }
    try {
      const res = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senhaHash: senha }),
      });
      if (res.ok) {
        Alert.alert('Usuário cadastrado com sucesso!');
        router.replace('/login');
      } else {
        Alert.alert('Erro ao cadastrar usuário');
      }
    } catch {
      Alert.alert('Erro ao conectar com o servidor');
    }
  }

  function handleVoltar() {
    router.replace('/login');
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleVoltar}>
        <MaterialIcons name="arrow-back" size={22} color="#1976d2" />
        <Text style={styles.backButtonText}>Voltar para Login</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Cadastro de Usuário</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleCadastrar}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff', justifyContent: 'center' },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 18,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#e3f2fd',
    borderRadius: 24,
    elevation: 2,
    shadowColor: '#1976d2',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  backButtonText: { color: '#1976d2', fontSize: 17, marginLeft: 8, fontWeight: 'bold' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#1976d2', textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#1976d2', borderRadius: 8, padding: 8, marginBottom: 12, fontSize: 15, height: 42 },
  button: { backgroundColor: '#1976d2', paddingVertical: 10, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});