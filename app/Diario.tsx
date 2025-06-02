import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type Anotacao = {
  id: number;
  texto: string;
  data: string;
};

export default function DiarioScreen() {
  const [anotacao, setAnotacao] = useState('');
  const [anotacoes, setAnotacoes] = useState<Anotacao[]>([]);
  const [editando, setEditando] = useState<Anotacao | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [novoTexto, setNovoTexto] = useState('');

  // Adicionar anotação
  function adicionarAnotacao() {
    if (!anotacao.trim()) return;
    const novaAnotacao = {
      id: Date.now(),
      texto: anotacao,
      data: new Date().toLocaleString(),
    };
    setAnotacoes([novaAnotacao, ...anotacoes]);
    setAnotacao('');
  }

  // Excluir anotação
  function excluirAnotacao(id: number) {
    Alert.alert('Excluir', 'Deseja excluir esta anotação?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          setAnotacoes(anotacoes.filter(a => a.id !== id));
        },
      },
    ]);
  }

  // Abrir modal de edição
  function editarAnotacao(anotacao: Anotacao) {
    setEditando(anotacao);
    setNovoTexto(anotacao.texto);
    setModalVisible(true);
  }

  // Salvar edição
  function salvarEdicao() {
    if (!novoTexto.trim() || !editando) return;
    setAnotacoes(anotacoes.map(a =>
      a.id === editando.id ? { ...a, texto: novoTexto, data: new Date().toLocaleString() } : a
    ));
    setModalVisible(false);
    setEditando(null);
    setNovoTexto('');
  }

  return (
    <View style={styles.container}>
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