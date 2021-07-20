import React, { useCallback } from "react";

import { useNavigation } from "@react-navigation/native";

import { Cards, Container, ContainerCards, TextTitle } from "./styles";

const Reservas: React.FC = () => {
   const { navigate } = useNavigation();

   const handleNavigateA = useCallback(() => {
      navigate("Bloqueio");
   }, [navigate]);

   const handleNavigateB = useCallback(() => {
<<<<<<< HEAD
      navigate("ReservaCliente");
   }, [navigate]);

   const handleNavigateC = useCallback(() => {
      navigate("reserva diaria");
=======
      navigate("Bloqueio");
>>>>>>> 8f1dc5ec56f9edce1d740e0a284a68b0545c3439
   }, [navigate]);

   const handleNavigateC = useCallback(() => {
      navigate("Reserva mensal");
   }, []);

   return (
      <Container>
         <ContainerCards>
<<<<<<< HEAD
=======
            <Cards onPress={handleNavigateB}>
               <TextTitle>Reservar um horário</TextTitle>
            </Cards>
>>>>>>> 8f1dc5ec56f9edce1d740e0a284a68b0545c3439
            <Cards onPress={handleNavigateA}>
               <TextTitle>Reservar um horário para um dia específico</TextTitle>
            </Cards>

            <Cards onPress={handleNavigateB}>
               <TextTitle>Agendar um horário para um cliente</TextTitle>
            </Cards>
         </ContainerCards>

         <ContainerCards>
            <Cards onPress={handleNavigateC}>
               <TextTitle>Reservar um horário para todo o mês</TextTitle>
            </Cards>
         </ContainerCards>
      </Container>
   );
};

export default Reservas;
