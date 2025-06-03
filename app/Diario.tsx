import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router'; // Adicione este import

type Anotacao = {
  id: number;
  texto: string;
  data: string;
};

export default function DiarioScreen() {
  const router = useRouter(); // Adicione esta linha
  const [anotacao, setAnotacao] = useState('');
  const [anotacoes, setAnotacoes] = useState<Anotacao[]>([]);
  const [editando, setEditando] = useState<Anotacao | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [novoTexto, setNovoTexto] = useState('');

  useEffect(() => {
    carregarAnotacoes();
  }, []);

  async function carregarAnotacoes() {
    const data = await AsyncStorage.getItem('diario');
    if (data) {
      setAnotacoes(JSON.parse(data));
    }
  }

  async function salvarAnotacoes(novas: Anotacao[]) {
    setAnotacoes(novas);
    await AsyncStorage.setItem('diario', JSON.stringify(novas));
  }

  async function adicionarAnotacao() {
    if (!anotacao.trim()) return;
    const dataAtual = new Date().toLocaleString();
    const nova: Anotacao = {
      id: Date.now(),
      texto: anotacao,
      data: dataAtual,
    };
    const novas = [nova, ...anotacoes];
    await salvarAnotacoes(novas);
    setAnotacao('');
  }

  async function excluirAnotacao(id: number) {
    Alert.alert('Excluir', 'Deseja excluir esta anotação?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          const novas = anotacoes.filter(a => a.id !== id);
          await salvarAnotacoes(novas);
        },
      },
    ]);
  }

  function editarAnotacao(anotacao: Anotacao) {
    setEditando(anotacao);
    setNovoTexto(anotacao.texto);
    setModalVisible(true);
  }

  async function salvarEdicao() {
    if (!novoTexto.trim() || !editando) return;
    const dataAtual = new Date().toLocaleString();
    const novas = anotacoes.map(a =>
      a.id === editando.id ? { ...a, texto: novoTexto, data: dataAtual } : a
    );
    await salvarAnotacoes(novas);
    setModalVisible(false);
    setEditando(null);
    setNovoTexto('');
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
        keyExtractor={item => item.id.toString()}
        style={{ width: '100%' }}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <View style={styles.noteBox}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={styles.noteText}>{item.texto}</Text>
              <TouchableOpacity onPress={() => editarAnotacao(item)}>
                <Ionicons name="pencil" size={22} color="#1976d2" style={{ marginLeft: 10 }} />
              </TouchableOpacity>
            </View>
            <Text style={styles.noteDate}>{item.data}</Text>
            <TouchableOpacity onPress={() => excluirAnotacao(item.id)}>
              <Text style={styles.deleteText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhuma anotação ainda.</Text>}
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