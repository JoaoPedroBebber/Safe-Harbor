import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Alert, Button, FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router'; // Adicione este import
import { UserProvider, useUser } from './app-context/UserContext'; // Ajuste o caminho conforme necessário

type Anotacao = {
  id: string;
  conteudo: string;
  data: string;
};

const API_URL = 'http://localhost:3000/diario'; // Troque para seu IP se testar no celular

export default function DiarioScreen() {
  const { user } = useUser();
  const router = useRouter();
  const [anotacao, setAnotacao] = useState('');
  const [anotacoes, setAnotacoes] = useState<Anotacao[]>([]);
  const [editando, setEditando] = useState<Anotacao | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [novoTexto, setNovoTexto] = useState('');

  useEffect(() => {
    if (!user) {
      router.replace('/login');
    }
  }, [user]);

  useEffect(() => {
    carregarAnotacoes();
  }, []);

  async function carregarAnotacoes() {
    if (!user) return;
    try {
      const res = await fetch(`http://localhost:3000/diario?idUser=${user.id}`);
      const data = await res.json();
      setAnotacoes(data);
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível carregar as anotações.');
    }
  }

  async function salvarAnotacoes(novas: Anotacao[]) {
    setAnotacoes(novas);
    await AsyncStorage.setItem('diario', JSON.stringify(novas));
  }

  async function adicionarAnotacao() {
    if (!anotacao.trim() || !user) return;
    try {
      const res = await fetch('http://localhost:3000/diario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conteudo: anotacao, idUser: user.id }),
      });
      if (res.ok) {
        carregarAnotacoes();
        setAnotacao('');
      }
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível adicionar a anotação.');
    }
  }

  async function excluirAnotacao(id: string) {
    console.log('Excluir anotação com id:', id); // Debug: veja o id
    Alert.alert('Excluir', 'Deseja excluir esta anotação?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            const res = await fetch(`http://localhost:3000/diario/${id}`, { method: 'DELETE' });
            console.log('Status da exclusão:', res.status); // Debug: veja o status
            if (res.ok) {
              carregarAnotacoes();
            } else {
              Alert.alert('Erro', 'Não foi possível excluir.');
            }
          } catch (e) {
            Alert.alert('Erro', 'Não foi possível excluir.');
          }
        },
      },
    ]);
  }

  function editarAnotacao(anotacao: Anotacao) {
    setEditando(anotacao);
    setNovoTexto(anotacao.conteudo);
    setModalVisible(true);
  }

  function abrirModalEdicao(item: any) {
    setEditando(item);
    setNovoTexto(item.conteudo);
    setModalVisible(true);
  }

  async function salvarEdicao() {
    if (!novoTexto.trim() || !editando) return;
    try {
      await fetch(`${API_URL}/${editando.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conteudo: novoTexto }),
      });
      setModalVisible(false);
      setEditando(null);
      setNovoTexto('');
      carregarAnotacoes();
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível editar.');
    }
  }

  return (
    <View style={styles.container}>
      {/* Botão de voltar no topo */}
      <TouchableOpacity style={styles.headerBack} onPress={() => router.replace('/')}>
        <Ionicons name="arrow-back" size={28} color="#1976d2" />
        <Text style={styles.headerBackText}>Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Diário</Text>
      <Text style={styles.text}>Registre suas anotações do dia a dia.</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Digite sua anotação..."
          value={anotacao}
          onChangeText={setAnotacao}
        />
        <TouchableOpacity style={styles.addButton} onPress={adicionarAnotacao}>
          <Text style={styles.addButtonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
  data={anotacoes}
  keyExtractor={item => item.id}
  renderItem={({ item }) => (
    <View
      style={{
        padding: 12,
        borderBottomWidth: 1,
        borderColor: '#eee',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <TouchableOpacity
        style={{ flex: 1 }}
        onLongPress={() => editarAnotacao(item)}
      >
        <Text>{item.conteudo}</Text>
      </TouchableOpacity>
      <Button
        title="Excluir"
        color="red"
        onPress={() => {
          console.log('Excluir', item.id); // debug
          excluirAnotacao(item.id);
        }}
      />
    </View>
  )}
  ListEmptyComponent={
    <Text style={{ textAlign: 'center', marginTop: 20 }}>
      Nenhuma anotação ainda.
    </Text>
  }
/>

      {/* Modal de edição */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Editar Anotação</Text>
            <TextInput
              style={styles.input}
              value={novoTexto}
              onChangeText={setNovoTexto}
              multiline
            />
            <View style={{ flexDirection: 'row', marginTop: 16 }}>
              <TouchableOpacity style={[styles.addButton, { marginRight: 10 }]} onPress={salvarEdicao}>
                <Text style={styles.addButtonText}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.addButton, { backgroundColor: '#aaa' }]} onPress={() => setModalVisible(false)}>
                <Text style={styles.addButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  headerBack: { position: 'absolute', top: 50, left: 20, flexDirection: 'row', alignItems: 'center', padding: 8 },
  headerBackText: { color: '#1976d2', fontSize: 18, marginLeft: 6, fontWeight: 'bold' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10, color: '#1976d2', textAlign: 'center' },
  text: { fontSize: 18, color: '#333', textAlign: 'center', marginBottom: 20 },
  inputRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  input: { flex: 1, borderWidth: 1, borderColor: '#1976d2', borderRadius: 8, padding: 10, marginRight: 8 },
  addButton: { backgroundColor: '#1976d2', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8 },
  addButtonText: { color: '#fff', fontWeight: 'bold' },
  noteBox: { backgroundColor: '#e3f2fd', borderRadius: 8, padding: 12, marginBottom: 12 },
  noteText: { fontSize: 16, color: '#333', flex: 1 },
  noteDate: { fontSize: 12, color: '#666', marginTop: 4 },
  deleteText: { color: '#d32f2f', marginTop: 8, fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  modalBox: { backgroundColor: '#fff', borderRadius: 16, padding: 28, width: 300, alignItems: 'center', elevation: 8 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, color: '#1976d2' },
});