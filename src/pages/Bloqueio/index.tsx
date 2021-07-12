/* eslint-disable camelcase */
import { FormHandles } from "@unform/core";
import { Form } from "@unform/mobile";
import { getMonth } from "date-fns";
import { getDate } from "date-fns/esm";
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

         const diaN = getDate(new Date(2021, 1, data.dia));
         const mesN = getMonth(new Date(2021, data.mes, 1));
         console.log(mesN);

         const response = await api.post("/service/bloqueio", {
            from: data.from,
            at: data.at,
            dia: diaN,
            mes: mesN,
         });
         console.log(response.data);
      },
      [prestador.id]
   );

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
