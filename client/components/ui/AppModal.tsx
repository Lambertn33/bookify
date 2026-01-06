import { StyleSheet} from 'react-native'
import Modal from 'react-native-modal';
import { FontAwesome5 } from '@expo/vector-icons';
import { AppView, AppText, AppButton, AppTitle } from '.';

interface AppModalProps {
  isVisible: boolean;
  onClose: () => void;
  message: string;
  success?: boolean;
}

const AppModal = ({ isVisible, onClose, message, success = true }: AppModalProps) => {
  return (
    <AppView style={styles.container}>
      <Modal isVisible={isVisible} onBackdropPress={onClose}>
        <AppView style={styles.modalContent} paddingTop ={40} paddingBottom={40}>
          {success ? (
            <AppView style={styles.iconContainer}>
              <FontAwesome5 name="check-circle" size={128} color="#4CAF50" />
            </AppView>
          ) : (
            <AppView style={styles.iconContainer}>
              <FontAwesome5 name="times-circle" size={128} color="#f44336" />
            </AppView>
          )}
          <AppTitle style={styles.message}>{message}</AppTitle>
          <AppButton onPress={onClose}>
            <AppText style={styles.closeButtonText}>Close</AppText>
          </AppButton>
        </AppView>
      </Modal>
    </AppView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    gap: 40,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: "bold",
    textAlign: 'center',
  },
});

export default AppModal;