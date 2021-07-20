import React, { useState, useCallback } from "react";
import { Alert } from "react-native";

import { useNavigation } from "@react-navigation/core";
import { number } from "yup/lib/locale";

import { useAuth } from "../../../hooks/AuthContext";
import { api } from "../../../services/api";
import { convertHours } from "../../utils";
import {
   Title,
   Container,
   ContainerForm,
   ContainerInput,
   Inputs,
   Text,
   ContainerText,
   ContainerButton,
   TextButton,
} from "./styles";

const ReservaDiaria: React.FC = () => {
   const { navigate } = useNavigation();
   const [mes, setMes] = useState<number>();
   const [from, setFrom] = useState<string>("");
   const [at, setAt] = useState<string>("");

   console.log(mes, from, at);
   const handleReserva = useCallback(async () => {
      const mesN = Number(mes);
      const res = await api.post("/prestador/reserva", {
         mes: mesN,
         from,
         at,
      });
      const { message } = res.data;

      if (!message) {
         Alert.alert("Reserva criada com sucesso");
         navigate("Home");
      } else {
         Alert.alert("Erro", message);
      }
   }, [at, from, mes, navigate]);

   return (
      <Container>
         <Title>Reserva diaria</Title>

         <ContainerForm>
            <Title>E</Title>

            <ContainerInput>
               <ContainerText>
                  <Text>Digite o mes</Text>
               </ContainerText>
               <Inputs onChangeText={(text) => setMes(text)} value={mes} />
            </ContainerInput>

            <ContainerInput>
               <ContainerText>
                  <Text>Digite a hora que começa sua reserva</Text>
               </ContainerText>
               <Inputs
                  onChangeText={(text) => {
                     setFrom(text);
                  }}
                  value={from}
               />
            </ContainerInput>

            <ContainerInput>
               <ContainerText>
                  <Text>Digite a hora que termina sua reserva</Text>
               </ContainerText>
               <Inputs
                  onChangeText={(text) => {
                     setAt(text);
                  }}
                  value={at}
               />
            </ContainerInput>
         </ContainerForm>
         <ContainerButton onPress={handleReserva}>
            <TextButton>Reservar</TextButton>
         </ContainerButton>
      </Container>
   );
};

export default ReservaDiaria;
