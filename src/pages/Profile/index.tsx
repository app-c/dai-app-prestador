/* eslint-disable camelcase */
import React, { useRef, useCallback, useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import {
   KeyboardAvoidingView,
   ScrollView,
   Platform,
   Alert,
   View,
   Button as RNButton,
   StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import * as ImagePicker from 'expo-image-picker';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {api} from '../../services/api';
import getValidationErrors from '../../utils/getValidationsErrors';
import { useAuth } from '../../hooks/AuthContext';

import {
   Container,
   UserAvatarButtom,
   UserAvatar,
   Text,
   BackButton,
   Off,
   OffContainer,
} from './styles';
import { cores } from '../../utils/ferramentas';

interface ProfileFormData {
   name: string;
   email: string;
   telefone: string;
   old_password: string;
   password: string;
   password_confirmation: string;
}

const Profile: React.FC = () => {
   const [image, setImage] = useState<any>();
   const formRef = useRef<FormHandles>(null);
   const navigation = useNavigation();

   const { user, signOut, updateUser } = useAuth();

   const logOf = useCallback(() => {
      signOut();
   }, [signOut]);

   const handleGoBack = useCallback(() => {
      navigation.goBack();
   }, [navigation]);

   const handleSubmit = useCallback(
      async (data: ProfileFormData) => {
         try {
            formRef.current?.setErrors({});

            const schme = Yup.object().shape({
               name: Yup.string().required('nome obrigatoório'),
               email: Yup.string()
                  .required('emal obrigatorio')
                  .email('digite um email valido'),
               telefone: Yup.number()
                  .required()
                  .min(11, 'digite um telefone valido'),
               old_password: Yup.string(),

               password: Yup.string()
                  .ensure()
                  .when('old_password', {
                     is: val => !!val.length,
                     then: Yup.string().required(),
                     otherwise: Yup.string(),
                  }),
               password_confirmation: Yup.string()
                  .ensure()
                  .when('old_password', {
                     is: val => !!val.length,
                     then: Yup.string().required(),
                     otherwise: Yup.string(),
                  })
                  .oneOf([Yup.ref('password'), null], 'confirmaçao incorreta'),
            });

            await schme.validate(data, {
               abortEarly: false,
            });

            const {
               name,
               email,
               telefone,
               old_password,
               password,
               password_confirmation,
            } = data;

            const formData = {
               name,
               email,
               telefone,
               ...(old_password
                  ? { old_password, password, password_confirmation }
                  : {}),
            };

            const response = await api.put('/profile', formData);

            updateUser(response.data);

            Alert.alert(
               'Perfil atualizado com sucesso',
               'seu perfil foi atualizado',
            );

            navigation.goBack();
         } catch (err) {
            if (err instanceof Yup.ValidationError) {
               const errors = getValidationErrors(err);
               formRef.current?.setErrors(errors);

               return;
            }
            Alert.alert(
               'Erro no cadastro',
               'Ocorreu um erro ao tentar fazer o cadastro',
            );
         }
      },
      [navigation, updateUser],
   );

   useEffect(() => {
      (async () => {
         if (Platform.OS !== 'web') {
            const {
               status,
            } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
               Alert.alert(
                  'Sorry, we need camera roll permissions to make this work!',
               );
            }
         }
      })();
   }, []);

   const UpdateAvatar = useCallback(async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.All,
         allowsEditing: true,
         aspect: [4, 3],
         quality: 1,
      });

      if (!result.cancelled) {
         const data = new FormData();

         data.append('avatar', {
            type: 'image/jpg',
            name: `${user.id}.jpg`,
            uri: result.uri,
         });

         api.patch('/avatar', data).then(res => {
            updateUser(res.data);
         });
      }
   }, [updateUser, user.id]);
   return (
      <>
         <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            enabled
         >
            <ScrollView keyboardShouldPersistTaps="handled">
               <Container>
                  <OffContainer>
                     <BackButton onPress={handleGoBack}>
                        <Feather
                           name="chevron-left"
                           size={26}
                           color="#04d361"
                        />
                     </BackButton>
                     <Off onPress={logOf}>
                        <Feather name="power" size={26} color="black" />
                     </Off>
                  </OffContainer>

                  <UserAvatarButtom onPress={UpdateAvatar}>
                     <UserAvatar source={{ uri: `${user.avatar_url}` }} />
                  </UserAvatarButtom>

                  <View>
                     <Text>Meu perfil</Text>
                  </View>

                  <Form
                     initialData={{
                        name: user.name,
                        email: user.email,
                        telefone: user.telefone,
                     }}
                     ref={formRef}
                     onSubmit={handleSubmit}
                  >
                     <Input
                        autoCorrect={false}
                        name="name"
                        icon="user"
                        placeholder="Nome"
                     />

                     <Input
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="email-address"
                        name="email"
                        icon="mail"
                        placeholder="E-mail"
                     />

                     <Input
                        name="telefone"
                        icon="phone"
                        placeholder="Telefone"
                        keyboardType="numeric"
                     />

                     <Input
                        secureTextEntry
                        containerStyle={{ marginTop: 16 }}
                        name="old_password"
                        icon="lock"
                        placeholder="Senha atual"
                     />
                     <Input
                        secureTextEntry
                        name="password"
                        icon="lock"
                        placeholder="Nova senha"
                     />
                     <Input
                        secureTextEntry
                        name="password_confirmation"
                        icon="lock"
                        placeholder="Confirmar senha"
                     />
                  </Form>
                  <Button
                     onPress={() => {
                        formRef.current?.submitForm();
                     }}
                  >
                     Confirmar mudanças
                  </Button>
               </Container>
            </ScrollView>
         </KeyboardAvoidingView>
      </>
   );
};

export default Profile;
