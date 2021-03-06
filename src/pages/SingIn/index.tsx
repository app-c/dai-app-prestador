import React, { useCallback, useRef, useState } from "react";
import AppLoading from "expo-app-loading";
import { AntDesign as Icon } from "@expo/vector-icons";
import { Alert, Image, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import {
   Container,
   Linear,
   Title,
   CreateAccountContainer,
   AccountText,
} from "./styles";

import Logo from "../../assets/Logo.png";
import { Fonts } from "../utils";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useAuth } from "../../hooks/AuthContext";
import { Boto } from "../SingUp/styles";
import getValidationErrors from "../../utils/getValidationsErrors";
import { api } from "../../services/api";

interface SignInFormData {
   email: string;
   senha: string;
}

const SingIn: React.FC = () => {
   const formRef = useRef<FormHandles>(null);

   const naivgation = useNavigation();
   const { signIn, prestador } = useAuth();
   console.log(prestador);

   const handleSingUp = useCallback(async () => {
      naivgation.navigate("SignUp");
   }, []);

   const handleSignIn = useCallback(
      async (data: SignInFormData) => {
         try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
               email: Yup.string()
                  .required("E-mail obrigatório")
                  .email("E-mail invalido"),
               senha: Yup.string().min(6, "Senha no minimo 6 digitos"),
            });

            await schema.validate(data, {
               abortEarly: false,
            });
            const response = await api.post("/prestador/session", {
               email: data.email,
               senha: data.senha,
            });

            const { message } = response.data;

            if (message) {
               Alert.alert("Erro", message);
            }

            await signIn({
               email: data.email,
               senha: data.senha,
            });
         } catch (err) {
            if (err instanceof Yup.ValidationError) {
               const errors = getValidationErrors(err);
               formRef.current?.setErrors(errors);
            }

            Alert.alert(
               "Erro na autenticação",
               "Ocorreu um erro ao fazer login"
            );
         }
      },
      [signIn]
   );

   const fonstsLoadd = Fonts();
   if (!fonstsLoadd) {
      return <AppLoading />;
   }

   const styles = StyleSheet.create({
      title: {
         fontFamily: "MontBold",
         marginBottom: 15,
         fontSize: 16,
      },
   });

   return (
      <Linear
         colors={["#E4C6D5", "#EAEAEA"]}
         start={{ x: 0, y: 0 }}
         end={{ x: 0, y: 1 }}
      >
         <ScrollView contentContainerStyle={{ flex: 1 }}>
            <Container behavior="padding">
               <Image source={Logo} />
               <Title style={styles.title}>Entrar com uma conta</Title>

               <Form ref={formRef} onSubmit={handleSignIn}>
                  <Input
                     name="email"
                     icon="mail"
                     placeholder="E-mail"
                     keyboardType="email-address"
                     autoCapitalize="none"
                  />
                  <Input
                     name="senha"
                     icon="lock"
                     placeholder="Senha"
                     secureTextEntry
                  />

                  <Button
                     onPress={() => {
                        formRef.current?.submitForm();
                     }}
                  >
                     Entrar
                  </Button>
               </Form>
            </Container>
         </ScrollView>
         <CreateAccountContainer onPress={handleSingUp}>
            <Icon name="right" color="#999999" size={20} />
            <AccountText style={{ fontFamily: "MontBold" }}>
               Criar uma conta
            </AccountText>
         </CreateAccountContainer>
      </Linear>
   );
};

export default SingIn;
