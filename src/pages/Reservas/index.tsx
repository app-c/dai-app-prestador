import { useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";

import { Cards, Container, ContainerCards, TextTitle } from "./styles";

const Reservas: React.FC = () => {
   const { navigate } = useNavigation();

   const handleNavigateA = useCallback(() => {
      navigate("ReservaCliente");
   }, [navigate]);

   const handleNavigateB = useCallback(() => {
      navigate("Bloqueio");
   }, [navigate]);

   const handleNavigateC = useCallback(() => {
      navigate("Reserva mensal");
   }, []);

   return (
      <Container>
         <ContainerCards>
            <Cards onPress={handleNavigateB}>
               <TextTitle>Reservar um horário</TextTitle>
            </Cards>
            <Cards onPress={handleNavigateA}>
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
