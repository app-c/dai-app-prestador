import { useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";

import { Cards, Container, TextTitle } from "./styles";

const Reservas: React.FC = () => {
   const { navigate } = useNavigation();

   const handleNavigateA = useCallback(() => {
      navigate("Reserva de horários");
   }, [navigate]);

   const handleNavigateB = useCallback(() => {
      navigate("Reserva");
   }, [navigate]);

   return (
      <Container>
         <Cards>
            <TextTitle>Reservar um horário</TextTitle>
         </Cards>
         <Cards onPress={handleNavigateA}>
            <TextTitle>Reservar um horário para um usuario</TextTitle>
         </Cards>
      </Container>
   );
};

export default Reservas;
