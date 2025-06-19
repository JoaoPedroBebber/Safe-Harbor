import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from './app-context/UserContext';
import { MaterialIcons } from '@expo/vector-icons';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();
  const { setUser } = useUser();

  async function handleLogin() {
    if (!email.trim() || !senha.trim()) {
      Alert.alert('Digite seu e-mail e senha');
      return;
    }
    setCarregando(true);
    try {
      // Busca usuário pelo e-mail
      const res = await fetch(`http://localhost:3000/users?email=${encodeURIComponent(email)}`);
      if (!res.ok) {
        Alert.alert('Erro ao buscar usuário');
        setCarregando(false);
        return;
      }
      const data = await res.json();
      // Se a API retorna um array, pegue o primeiro usuário
      const usuario = Array.isArray(data) ? data[0] : data;
      if (!usuario) {
        Alert.alert('Usuário não encontrado');
        setCarregando(false);
        return;
      }
      // Verifica a senha (comparação simples, ideal seria hash)
      if (usuario.senhaHash !== senha) {
        Alert.alert('Senha incorreta');
        setCarregando(false);
        return;
      }
      setUser(usuario);
      router.replace('/');
    } catch {
      Alert.alert('Erro ao conectar com o servidor');
    }
    setCarregando(false);
  }

  function handleCadastro() {
    router.push('/cadastro');
  }

  function handleVoltar() {
    router.replace('/');
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleVoltar}>
        <MaterialIcons name="arrow-back" size={22} color="#1976d2" />
        <Text style={styles.backButtonText}>Voltar ao Início</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Entrar</Text>
      <Text style={styles.text}>Digite seu e-mail e senha para acessar seu perfil</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={carregando}>
        {carregando ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Entrar</Text>}
      </TouchableOpacity>
      <TouchableOpacity style={styles.linkButton} onPress={handleCadastro}>
        <MaterialIcons name="person-add-alt" size={18} color="#1976d2" />
        <Text style={styles.linkText}> Não tem conta? Cadastre-se</Text>
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
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10, color: '#1976d2', textAlign: 'center' },
  text: { fontSize: 16, color: '#333', textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#1976d2', borderRadius: 8, padding: 10, marginBottom: 16, fontSize: 16 },
  button: { backgroundColor: '#1976d2', paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginBottom: 8 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#e3f2fd',
    borderRadius: 24,
    elevation: 1,
    shadowColor: '#1976d2',
    shadowOpacity: 0.10,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  linkText: { color: '#1976d2', fontSize: 15, fontWeight: 'bold' },
});
