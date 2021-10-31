/* eslint-disable import/prefer-default-export */

import React, { useEffect, useState } from "react";

import { hide } from "expo-splash-screen";

import { startOfISOWeek } from "date-fns";
import { string } from "yup/lib/locale";

import { Mail } from "../../components/Listas/Mails";
import { api } from "../../services/api";
import { Container, ContainerText, Flat, TextElemenst } from "./styles";

export interface Response {
   id: string;
   content: string;
}

export const Message: React.FC = () => {
   const [mess, setMess] = useState<Response[]>();

   useEffect(() => {
      api.get("notification/find").then((h) => {
         setMess(h.data);
      });
   }, []);

   console.log(mess?.map((h) => h.content));

   return (
      <Container>
         <Mail message={mess} />
      </Container>
   );
};
