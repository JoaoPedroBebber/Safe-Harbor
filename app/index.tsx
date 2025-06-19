import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import 'expo-router/entry';
import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useUser } from './app-context/UserContext';
import { MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen() {
  const router = useRouter();
  const { user, setUser } = useUser();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

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

  function handlePerfilPress() {
    if (user) {
      setUser(null);
      router.push('/login');
    } else {
      router.push('/login');
    }
  }

  function handleSobrePress() {
    router.push('/Sobre');
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <MaterialCommunityIcons name="anchor" size={60} color="#1976d2" style={{ marginBottom: 10 }} />
        <Text style={styles.title}>Secure Harbor</Text>

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

        <View style={styles.buttonContainer}>
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
            <TouchableOpacity style={styles.button} onPress={() => router.push('/Diario')}>
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
            <TouchableOpacity style={[styles.button, styles.emergency]} onPress={() => router.push('/Emergencia')}>
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
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={handleSobrePress}>
          <MaterialIcons name="info" size={22} color="#1976d2" />
          <Text style={styles.footerButtonText}>Sobre</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={handlePerfilPress}>
          <MaterialIcons name="person" size={22} color="#1976d2" />
          <Text style={styles.footerButtonText}>
            {user ? user.nome : 'Perfil'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3f2fd',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#1976d2',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#1976d2',
    padding: 18,
    borderRadius: 12,
    width: 250,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  emergency: {
    backgroundColor: '#d32f2f',
  },
  infoIcon: {
    marginLeft: 10,
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 28,
    width: 300,
    alignItems: 'center',
    elevation: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1976d2',
  },
  modalMessage: {
    fontSize: 16,
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#1976d2',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 24,
  },

  // Footer styles
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 18,
    borderTopWidth: 1,
    borderColor: '#e3f2fd',
    backgroundColor: '#fafcff',
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#e3f2fd',
  },
  footerButtonText: {
    color: '#1976d2',
    fontWeight: 'bold',
    marginLeft: 6,
    fontSize: 16,
  },
});

export const options = {
  headerShown: false,
};
