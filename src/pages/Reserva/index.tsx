/* eslint-disable camelcase */
import { FormHandles } from "@unform/core";
import { Form } from "@unform/mobile";
import { getMonth } from "date-fns";
import { getDate } from "date-fns/esm";
import React, { useCallback, useRef, useState } from "react";
import { Alert, TextInput } from "react-native";

import Button from "../../components/Button";
import Input from "../../components/Input";
import { useAuth } from "../../hooks/AuthContext";
import { api } from "../../services/api";

import {
   Container,
   ContainerAvatar,
   ContainerFlatList,
   ContainerInput,
   ContainerUser,
   ImageAvatar,
   TextTitle,
} from "./styles";

interface DataBloqueio {
   nome: string;
   provider_id: string;
   from: string;
   at: string;
   dia: number;
   mes: number;
}

export interface IResposta {
   id: string;
   nome: string;
   avatar: string;
}

const Reserva: React.FC = () => {
   const formRef = useRef<FormHandles>(null);
   const [use, setUse] = useState<IResposta[]>([]);

   const handleBloqueio = useCallback(async (data: DataBloqueio) => {
      formRef.current?.setErrors({});

      const mesN = getMonth(new Date(2021, data.mes, 1));

      const user = await api.get("/find", {
         params: {
            nome: data.nome,
         },
      });
      console.log(data.nome);
      const { message } = user.data;

      if (message) {
         Alert.alert("Sorry", message);
      }
      setUse(user.data);

      const userNome = use.find((h) => {
         return h.nome === data.nome;
      });

      const response = await api.post("/service/reserva", {
         user_id: userNome?.id,
         from: data.from,
         at: data.at,
         mes: mesN,
      });
      console.log(response.data);
   }, []);

   const urlAvatar = "https://dai-nails.s3.us-east-2.amazonaws.com/";

   return (
      <Container>
         <TextTitle>Reserva de horários</TextTitle>

         <ContainerFlatList>
            <ContainerInput
               showsVerticalScrollIndicator
               contentContainerStyle={{
                  paddingBottom: 0,
               }}
               data={use}
               keyExtractor={(res) => res.id}
               renderItem={({ item: res }) => (
                  <ContainerUser>
                     <ContainerAvatar>
                        <ImageAvatar
                           source={{ uri: `${urlAvatar}${res.avatar}` }}
                        />
                     </ContainerAvatar>
                     <TextTitle>{res.nome}</TextTitle>
                  </ContainerUser>
               )}
            />
         </ContainerFlatList>

         <Form ref={formRef} onSubmit={handleBloqueio}>
            <Input name="nome" icon="" placeholder="pesquisar" />

            <Button onPress={() => formRef.current?.submitForm()}>
               Pesquisar
            </Button>

            <Input
               name="from"
               icon=""
               placeholder="Início da hora para bloquear"
            />

            <Input name="at" icon="" placeholder="Fim da hora do bloqueio" />

            <Input name="mes" icon="" placeholder="Mês do bloqueio" />

            <Button onPress={() => formRef.current?.submitForm()}>
               Bloquer
            </Button>
         </Form>
      </Container>
   );
};

export default Reserva;
