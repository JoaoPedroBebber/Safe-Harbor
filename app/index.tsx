import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import 'expo-router/entry';
import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  // Estado para o modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  // Mensagens explicativas para cada botão
  const explanations = {
    respiracao: 'Ajuda a controlar a respiração em momentos de ansiedade.',
    afirmacao: 'Exibe frases de apoio para melhorar o bem-estar.',
    grounding: 'Técnicas para trazer sua atenção ao momento presente.',
    diario: 'Permite registrar anotações sobre seu dia.',
    emergencia: 'Acesso rápido a recursos em caso de crise.',
  };

  function showInfo(title: string, message: string) {
    setModalTitle(title);
    setModalMessage(message);
    setModalVisible(true);
  }

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="anchor" size={60} color="#1976d2" style={{ marginBottom: 10 }} />
      <Text style={styles.title}>Secure Harbor</Text>

      {/* Modal customizado */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>{modalTitle}</Text>
            <Text style={styles.modalMessage}>{modalMessage}</Text>
            <Pressable style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/respiracao')}>
          <Text style={styles.buttonText}>Respiração Guiada</Text>
        </TouchableOpacity>
        <Ionicons
          name="information-circle-outline"
          size={24}
          color="#1976d2"
          style={styles.infoIcon}
          onPress={() => showInfo('Respiração Guiada', explanations.respiracao)}
        />
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/afirmacao')}>
          <Text style={styles.buttonText}>Frases de Apoio</Text>
        </TouchableOpacity>
        <Ionicons
          name="information-circle-outline"
          size={24}
          color="#1976d2"
          style={styles.infoIcon}
          onPress={() => showInfo('Frases de Apoio', explanations.afirmacao)}
        />
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/grounding')}>
          <Text style={styles.buttonText}>Grounding</Text>
        </TouchableOpacity>
        <Ionicons
          name="information-circle-outline"
          size={24}
          color="#1976d2"
          style={styles.infoIcon}
          onPress={() => showInfo('Grounding', explanations.grounding)}
        />
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/diario')}>
          <Text style={styles.buttonText}>Diário</Text>
        </TouchableOpacity>
        <Ionicons
          name="information-circle-outline"
          size={24}
          color="#1976d2"
          style={styles.infoIcon}
          onPress={() => showInfo('Diário', explanations.diario)}
        />
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, styles.emergency]} onPress={() => router.push('/emergencia')}>
          <Text style={styles.buttonText}>Estou em crise</Text>
        </TouchableOpacity>
        <Ionicons
          name="information-circle-outline"
          size={24}
          color="#d32f2f"
          style={styles.infoIcon}
          onPress={() => showInfo('Emergência', explanations.emergencia)}
        />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => router.replace('/Sobre')}>
          <Ionicons name="person-circle" size={28} color="#1976d2" />
          <Text style={styles.footerText}>Sobre</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e3f2fd' },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 40, color: '#1976d2' },
  buttonRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  button: { backgroundColor: '#1976d2', padding: 18, borderRadius: 12, width: 250, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  emergency: { backgroundColor: '#d32f2f' },
  infoIcon: { marginLeft: 10 },

  // Modal styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  modalBox: { backgroundColor: '#fff', borderRadius: 16, padding: 28, width: 300, alignItems: 'center', elevation: 8 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, color: '#1976d2' },
  modalMessage: { fontSize: 16, color: '#333', marginBottom: 24, textAlign: 'center' },
  modalButton: { backgroundColor: '#1976d2', borderRadius: 8, paddingVertical: 8, paddingHorizontal: 24 },

  // Footer styles
  footer: { 
    flexDirection: 'row', 
    justifyContent: 'center', // centraliza o conteúdo
    alignItems: 'center', 
    width: '100%', 
    padding: 10, 
    backgroundColor: '#fff', 
    borderTopWidth: 1, 
    borderTopColor: '#ddd' 
  },
  footerButton: { flexDirection: 'column', alignItems: 'center' },
  footerText: { color: '#1976d2', fontSize: 12, marginTop: 4 },
});

export const options = {
  headerShown: false,
};