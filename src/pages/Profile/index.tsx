/* eslint-disable camelcase */
import React, { useRef, useCallback, useState, useEffect } from "react";
import {
   KeyboardAvoidingView,
   ScrollView,
   Platform,
   Alert,
   View,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import { Feather } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/mobile";
import * as Yup from "yup";

import Button from "../../components/Button";
import Input from "../../components/Input";
import { useAuth } from "../../hooks/AuthContext";
import { api } from "../../services/api";
import getValidationErrors from "../../utils/getValidationsErrors";
import {
   Container,
   UserAvatarButtom,
   UserAvatar,
   Text,
   BackButton,
   Off,
   OffContainer,
} from "./styles";

interface ProfileFormData {
   nome: string;
   email: string;
   telefone: string;
   work_init: string;
   work_and: string;
   funcao: string;
   old_password: string;
   senha: string;
   password_confirmation: string;
}

const Profile: React.FC = () => {
   const formRef = useRef<FormHandles>(null);
   const navigation = useNavigation();
   const [avatar, setAvatar] = useState("");

   const { prestador, signOut, updateUser } = useAuth();

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
               nome: Yup.string().required("nome obrigatoório"),
               email: Yup.string()
                  .required("emal obrigatorio")
                  .email("digite um email valido"),
               telefone: Yup.string()
                  .required()
                  .min(11, "digite um telefone valido"),
               work_init: Yup.string().required(),
               work_and: Yup.string().required(),
               funcao: Yup.string().required(),
               old_password: Yup.string(),

               senha: Yup.string()
                  .ensure()
                  .when("old_password", {
                     is: (val: string) => !!val.length,
                     then: Yup.string().required(),
                     otherwise: Yup.string(),
                  }),
               password_confirmation: Yup.string()
                  .ensure()
                  .when("old_password", {
                     is: (val: string) => !!val.length,
                     then: Yup.string().required(),
                     otherwise: Yup.string(),
                  })
                  .oneOf([Yup.ref("senha"), null], "confirmaçao incorreta"),
            });

            await schme.validate(data, {
               abortEarly: false,
            });

            const {
               nome,
               email,
               telefone,
               work_init,
               work_and,
               old_password,
               senha,
               password_confirmation,
            } = data;

            const formData = {
               nome,
               email,
               work_init,
               work_and,
               telefone,
               ...(old_password
                  ? { old_password, senha, password_confirmation }
                  : {}),
            };

            const response = await api.put("/prestador/update", formData);

            updateUser(response.data);
            const { message } = response.data;
            if (!message) {
               Alert.alert(
                  "Perfil atualizado com sucesso",
                  "seu perfil foi atualizado"
               );
            } else {
               Alert.alert("Erro no cadastro", message);
            }
         } catch (err) {
            if (err instanceof Yup.ValidationError) {
               const errors = getValidationErrors(err);
               formRef.current?.setErrors(errors);
            }
         }
      },
      [updateUser]
   );

   useEffect(() => {
      (async () => {
         if (Platform.OS !== "web") {
            const { status } =
               await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== "granted") {
               Alert.alert(
                  "Sorry, we need camera roll permissions to make this work!"
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

         data.append("avatar", {
            type: "image/jpg",
            name: `${prestador.id}.jpg`,
            uri: result.uri,
         });

         setAvatar(result.uri);

         api.patch("/prestador/avatar", data).then((res) => {
            updateUser(res.data);
         });
      }
   }, [updateUser, prestador.id]);

   const urlAvatar = "https://dai-nails.s3.us-east-2.amazonaws.com/";

   const tel = `${prestador.telefone}`;
   return (
      <>
         <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
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
                     <UserAvatar
                        source={{
                           uri: avatar || `${urlAvatar}${prestador.avatar}`,
                        }}
                     />
                  </UserAvatarButtom>

                  <View>
                     <Text>Meu perfil</Text>
                  </View>

                  <Form
                     initialData={{
                        nome: prestador.nome,
                        email: prestador.email,
                        telefone: tel,
                        work_init: prestador.work_init,
                        work_and: prestador.work_and,
                        funcao: prestador.funcao,
                     }}
                     ref={formRef}
                     onSubmit={handleSubmit}
                  >
                     <Input
                        autoCorrect={false}
                        name="nome"
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
                        name="work_init"
                        icon="clock"
                        placeholder="Início da joranda"
                     />

                     <Input
                        name="work_and"
                        icon="clock"
                        placeholder="Fim da joranda"
                     />

                     <Input name="funcao" icon="" placeholder="Sua função" />

                     <Input
                        secureTextEntry
                        containerStyle={{ marginTop: 16 }}
                        name="old_password"
                        icon="lock"
                        placeholder="Senha atual"
                     />
                     <Input
                        secureTextEntry
                        name="senha"
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
