<<<<<<< HEAD
import React, { useCallback, useRef } from "react";
import { Alert, Image, RefreshControl } from "react-native";

import AppLoading from "expo-app-loading";

import { Feather } from "@expo/vector-icons";

=======
/* eslint-disable camelcase */
import AppLoading from "expo-app-loading";
import React, { useCallback, useRef } from "react";
import { Alert, Image } from "react-native";
>>>>>>> 8f1dc5ec56f9edce1d740e0a284a68b0545c3439
import { useNavigation } from "@react-navigation/core";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/mobile";
import * as Yup from "yup";

import Logo from "../../assets/Logo.png";
import Button from "../../componentesServiço/Button";
import Input from "../../componentesServiço/Input";
import { useAuth } from "../../hooks/AuthContext";
import { api } from "../../services/api";
import getValidationErrors from "../../utils/getValidationsErrors";
import { Fonts } from "../utils";
import { Container, TextTitle } from "./styles";

interface IData {
   provider_id: string;
   service: string;
   description: string;
   time: string;
   value: string;
}
const Serviço: React.FC = () => {
   const formRef = useRef<FormHandles>(null);
   const fontsL = Fonts();
   const { navigate } = useNavigation();
   const { prestador } = useAuth();

   const createService = useCallback(
      async (data: IData) => {
         try {
            formRef.current?.setErrors({});

            const shema = Yup.object().shape({
               service: Yup.string().required("Nome obrigatorio"),
               description: Yup.string().required("E-mail Obrigatorio"),
               time: Yup.string().required(),
               value: Yup.string().required(),
            });

            await shema.validate(data, {
               abortEarly: false,
            });

            const res = await api.post("/service/service", {
               provider_id: prestador.id,
               service: data.service,
               description: data.description,
               time: data.time,
               value: data.value,
            });

            const { message } = res.data;
            if (!message) {
               Alert.alert("Serviço cadastrado com sucesso!");
               navigate("Home");
            } else {
               Alert.alert("Erroo", message);
            }
         } catch (err) {
            if (err instanceof Yup.ValidationError) {
               const errors = getValidationErrors(err);
               formRef.current?.setErrors(errors);

               return;
            }
            Alert.alert("Erro ao cadastrar um novo serviço");
         }
      },
      [navigate, prestador.id]
   );

   if (!fontsL) {
      return <AppLoading />;
   }

   return (
      <>
         <Container behavior="padding">
            <Image source={Logo} />
            <TextTitle style={{ fontFamily: "MontBold" }}>
               Criar um Serviço
            </TextTitle>
            <Form ref={formRef} onSubmit={createService}>
               <Input name="service" icon="" placeholder="Nome do serivço" />
               <Input
                  name="description"
                  icon=""
                  placeholder="Descrição do serviço"
               />
               <Input
                  name="time"
                  icon=""
                  placeholder="Duraçao do service exp: 01:00"
               />
               <Input name="value" icon="" placeholder="Valor do serviço" />

               <Button
                  onPress={() => {
                     formRef.current?.submitForm();
                  }}
               >
                  Criar
               </Button>
            </Form>
         </Container>
      </>
   );
};

export default Serviço;
