import React, { useCallback, useRef, useState } from "react";
import AppLoading from "expo-app-loading";
import { AntDesign as Icon } from "@expo/vector-icons";

import { Alert, Image, ScrollView, StyleSheet } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import Logo from "../../assets/Logo.png";
import { Fonts } from "../utils";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { api } from "../../services/api";
import {
   BackContainer,
   BackText,
   Boto,
   Container,
   Linear,
   TextInputs,
   Title,
} from "./styles";
import getValidationErrors from "../../utils/getValidationsErrors";

interface SignUpFormDatea {
   nome: string;
   email: string;
   telefone: string;
   senha: string;
   work_init: string;
   work_and: string;
   funcao: string;
}

const SingUp: React.FC = () => {
   const formRef = useRef<FormHandles>(null);
   const { goBack } = useNavigation();

   const navigate = useNavigation();

   const handleSigUp = useCallback(
      async (data: SignUpFormDatea) => {
         try {
            formRef.current?.setErrors({});

            const shema = Yup.object().shape({
               nome: Yup.string().required("Nome obrigatorio"),
               email: Yup.string()
                  .required("E-mail Obrigatorio")
                  .email("Digite um email valido"),
               telefone: Yup.number()
                  .min(11, "telefone invalido")
                  .required("telefone obrigatorio"),
               senha: Yup.string()
                  .required("Senha obrigatoria")
                  .min(6, "No minimo 6 digitos"),
               work_init: Yup.string().required(),
               work_and: Yup.string().required(),
               funcao: Yup.string().required(),
            });

            await shema.validate(data, {
               abortEarly: false,
            });

            const response = await api.post("/prestador", {
               nome: data.nome,
               email: data.email,
               telefone: data.telefone,
               senha: data.senha,
               work_init: data.work_init,
               work_and: data.work_and,
               funcao: data.funcao,
            });

            console.log(response.status);

            Alert.alert("Cadastro realiazado com sucesso!");
         } catch (err) {
            if (err instanceof Yup.ValidationError) {
               const errors = getValidationErrors(err);
               formRef.current?.setErrors(errors);

               return;
            }

            console.log(err);

            Alert.alert(
               "Erro no cadastro",
               "Ocorreu um erro ao tentar fazer o cadastro"
            );
         }
      },
      [goBack]
   );

   const fonstsLoadd = Fonts();
   if (!fonstsLoadd) {
      return <AppLoading />;
   }

   const styles = StyleSheet.create({
      input: {
         fontFamily: "MontBold",
      },
   });

   const start = "08:00";
   const stop = "19:00";

   return (
      <Linear
         colors={["#E4C6D5", "#EAEAEA"]}
         start={{ x: 0, y: 0 }}
         end={{ x: 0, y: 1 }}
      >
         <ScrollView scrollEnabled>
            <Container behavior="padding">
               <Image source={Logo} />
               <Title style={{ fontFamily: "MontBold" }}>Criar uma conta</Title>
               <Form ref={formRef} onSubmit={handleSigUp}>
                  <Input name="nome" icon="user" placeholder="Nome" />

                  <Input
                     name="email"
                     icon="mail"
                     placeholder="E-mail"
                     keyboardType="email-address"
                     autoCapitalize="none"
                  />

                  <Input
                     name="telefone"
                     icon="phone"
                     placeholder="telefone"
                     keyboardType="number-pad"
                  />

                  <Input
                     name="senha"
                     icon="lock"
                     placeholder="Senha"
                     keyboardType="visible-password"
                     secureTextEntry
                  />

                  <TextInputs>
                     Inicio da jornada de trabalho exp: 08:00
                  </TextInputs>

                  <Input
                     name="work_init"
                     icon="clock"
                     placeholder="Início da jornada "
                  />

                  <TextInputs>Fim da jornada de trabalho exp: 17:00</TextInputs>

                  <Input
                     name="work_and"
                     icon="clock"
                     placeholder="Término da jornada "
                  />

                  <Input name="funcao" icon="award" placeholder="Sua funçao" />

                  <Button
                     onPress={() => {
                        formRef.current?.submitForm();
                     }}
                  >
                     Criar
                  </Button>
               </Form>
            </Container>
         </ScrollView>
         <BackContainer onPress={() => navigate.goBack()}>
            <Icon name="back" color="#999999" size={20} />
            <BackText>Voltar para login</BackText>
         </BackContainer>
      </Linear>
   );
};

export default SingUp;
