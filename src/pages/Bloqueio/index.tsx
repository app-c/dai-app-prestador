/* eslint-disable camelcase */
import { FormHandles } from "@unform/core";
import { Form } from "@unform/mobile";
import React, { useCallback, useRef } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useAuth } from "../../hooks/AuthContext";
import { api } from "../../services/api";

import { Container, TextTitle } from "./styles";

interface DataBloqueio {
   provider_id: string;
   from: string;
   at: string;
   dia: number;
   mes: number;
}

const Bloqueio: React.FC = () => {
   const formRef = useRef<FormHandles>(null);
   const { prestador } = useAuth();
   console.log(prestador.id);

   const handleBloqueio = useCallback(
      async (data: DataBloqueio) => {
         formRef.current?.setErrors({});
         console.log(data);

         const response = await api.post("/service/bloqueio", {
            from: data.from,
            at: data.at,
            dia: data.dia,
            mes: data.mes,
         });
         console.log(response.data);
      },
      [prestador.id]
   );

   const bl = useCallback(async () => {
      const response = await api.post("/service/bloqueio", {
         provider_id: prestador.id,
         from: "14:00",
         at: "18:00",
         dia: 10,
         mes: 7,
      });
      console.log(response.data);
   }, []);
   return (
      <Container>
         <TextTitle>Bloqueio</TextTitle>

         <Form ref={formRef} onSubmit={handleBloqueio}>
            <Input
               name="from"
               icon=""
               placeholder="Início da hora para bloquear"
            />

            <Input name="at" icon="" placeholder="Fim da hora do bloqueio" />

            <Input name="dia" icon="" placeholder="Dia do bloqueio" />

            <Input name="mes" icon="" placeholder="Mês do bloqueio" />

            <Button onPress={() => formRef.current?.submitForm()}>
               Bloquer
            </Button>
         </Form>
      </Container>
   );
};

export default Bloqueio;
