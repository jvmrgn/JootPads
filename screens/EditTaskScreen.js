import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Platform, ToastAndroid, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Input, FormControl, Select, CheckIcon } from 'native-base';
import { useTasksStore } from '../globalStore';
import api from '../api';

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(4, 'O título precisa ter pelo menos 4 caracteres')
    .max(64, 'O título pode ter no máximo 64 caracteres')
    .required('É necessário informar o título'),
  description: Yup.string()
    .min(8, 'A descrição precisa ter pelo menos 8 caracteres')
    .max(128, 'A descrição pode ter no máximo 128 caracteres')
    .required('É necessário informar a descrição'),
  step: Yup.string().matches(
    /Para fazer|Em andamento|Pronto/,
    'Os passos devem ser "Para fazer", "Em andamento" ou "Pronto"'
  ).required('É necessário informar o estado'),
});

const showToast = (message) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else if (Platform.OS === 'ios') {
    Alert.alert(message);
  }
};

const EditTaskScreen = ({ task, onClose }) => {
  const { updateTask } = useTasksStore();
  const [message, setMessage] = useState(null);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000); 
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={!!task}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Formik
            initialValues={{ title: task.title, description: task.description, step: task.step }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              try {
                const response = await api.put(`/tasks/${task.id}`, values);
                updateTask(response.data);
                onClose();
                showMessage("Tarefa editada com sucesso");
                showToast("Tarefa editada com sucesso");
              } catch (error) {
                console.error(error);
                showMessage("Erro ao editar tarefa");
                showToast("Erro ao editar tarefa");
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
              <>
                {message && (
                  <View style={[styles.messageBox, { backgroundColor: message.includes('sucesso') ? 'green' : 'red' }]}>
                    <Text style={styles.messageText}>{message}</Text>
                  </View>
                )}
                <FormControl isInvalid={touched.title && errors.title}>
                  <FormControl.Label style={styles.label}>Título</FormControl.Label>
                  <Input
                    onChangeText={handleChange('title')}
                    onBlur={handleBlur('title')}
                    value={values.title}
                    style={styles.input}
                  />
                  {touched.title && errors.title && <Text style={styles.error}>{errors.title}</Text>}
                </FormControl>
                <FormControl isInvalid={touched.description && errors.description}>
                  <FormControl.Label style={styles.label}>Descrição</FormControl.Label>
                  <Input
                    onChangeText={handleChange('description')}
                    onBlur={handleBlur('description')}
                    value={values.description}
                    style={styles.input}
                  />
                  {touched.description && errors.description && <Text style={styles.error}>{errors.description}</Text>}
                </FormControl>
                <FormControl isInvalid={touched.step && errors.step}>
                  <FormControl.Label style={styles.label}>Estado</FormControl.Label>
                  <Select
                    selectedValue={values.step}
                    minWidth="200"
                    accessibilityLabel="Selecione o estado"
                    placeholder="Selecione o estado"
                    _selectedItem={{
                      bg: "teal.600",
                      endIcon: <CheckIcon size="5" />,
                    }}
                    mt={1}
                    onValueChange={(itemValue) => setFieldValue('step', itemValue)}
                    style={styles.input}
                  >
                    <Select.Item label="Para fazer" value="Para fazer" />
                    <Select.Item label="Em andamento" value="Em andamento" />
                    <Select.Item label="Pronto" value="Pronto" />
                  </Select>
                  {touched.step && errors.step && <Text style={styles.error}>{errors.step}</Text>}
                </FormControl>
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                  <Text style={styles.buttonText}>Salvar Alterações</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onClose} style={[styles.button, styles.cancelButton]}>
                  <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    width: '90%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: 'black',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: 'white',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'tomato',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: 'gray',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  messageBox: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  messageText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditTaskScreen;