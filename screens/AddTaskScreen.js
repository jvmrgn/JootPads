import React from 'react';
import { Button, Platform, ToastAndroid, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Input, FormControl, VStack, Select, CheckIcon } from 'native-base';
import { useNavigation } from '@react-navigation/native';
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

export default function AddTaskScreen() {
  const navigation = useNavigation();
  const addTask = useTasksStore((state) => state.addTask);

  return (
    <Formik
      initialValues={{ title: '', description: '', step: 'Para fazer' }}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          const response = await api.post('/tasks', values);
          addTask(response.data);
          resetForm();
          navigation.navigate('Tarefas');
          showToast("Tarefa adicionada com sucesso");
        } catch (error) {
          console.error(error);
          showToast("Erro ao adicionar tarefa");
        }
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
        <VStack space={4} padding={5}>
          <FormControl isInvalid={touched.title && errors.title}>
            <FormControl.Label>Título</FormControl.Label>
            <Input
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              value={values.title}
            />
            {touched.title && errors.title && <FormControl.ErrorMessage>{errors.title}</FormControl.ErrorMessage>}
          </FormControl>
          <FormControl isInvalid={touched.description && errors.description}>
            <FormControl.Label>Descrição</FormControl.Label>
            <Input
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              value={values.description}
            />
            {touched.description && errors.description && <FormControl.ErrorMessage>{errors.description}</FormControl.ErrorMessage>}
          </FormControl>
          <FormControl isInvalid={touched.step && errors.step}>
            <FormControl.Label>Estado</FormControl.Label>
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
            >
              <Select.Item label="Para fazer" value="Para fazer" />
              <Select.Item label="Em andamento" value="Em andamento" />
              <Select.Item label="Pronto" value="Pronto" />
            </Select>
            {touched.step && errors.step && <FormControl.ErrorMessage>{errors.step}</FormControl.ErrorMessage>}
          </FormControl>
          <Button onPress={handleSubmit} title="Adicionar Tarefa" />
        </VStack>
      )}
    </Formik>
  );
}

