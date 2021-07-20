/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useCallback, useMemo, useState, useEffect } from "react";
import { Alert } from "react-native";

import Picker from "@react-native-community/datetimepicker";
import { useRoute, useNavigation } from "@react-navigation/core";
import { getDate, getMonth, getYear } from "date-fns";

import Button from "../../components/Button";
import { useAuth } from "../../hooks/AuthContext";
import { api } from "../../services/api";
import { convertHours } from "../utils";
import {
   Container,
   ContainerCalendario,
   ContainerHorariso,
   Hour,
   HourContainer,
   HourText,
   SectionContente,
   Title,
} from "./styles";

interface RouteParams {
   service: string;
   user_id: string;
}

interface AvailavilityItem {
   hour: string;
   avaliable: boolean;
}

const AgendamentoCliente: React.FC = () => {
   const route = useRoute();
   const { navigate } = useNavigation();
   const { prestador } = useAuth();
   const { service, user_id } = route.params as RouteParams;
   console.log(service, user_id);

   const [showPiker, setShowPiker] = useState(false);
   const [selectDia, setSelectDia] = useState(new Date());
   const [disponivel, setDisponivel] = useState<AvailavilityItem[]>([]);
   const [selectHour, setSelectHour] = useState("");

   const hendleDatePiker = useCallback(() => {
      function show() {
         setShowPiker((state) => !state);
      }
      show();
   }, []);

   const handleSelectHour = useCallback((hour: string) => {
      setSelectHour(hour);
   }, []);

   const handleChange = useCallback((event: any, date: Date | undefined) => {
      setShowPiker(false);
      if (date) {
         setSelectDia(date);
      }
   }, []);

   const availabily = useMemo(() => {
      return disponivel.map(({ avaliable, hour }) => {
         return {
            hour,
            avaliable,
         };
      });
   }, [disponivel]);

   const handleDisponivel = useMemo(() => {
      return disponivel.filter((h) => {
         return h.avaliable !== false;
      });
   }, [disponivel]);

   const handleCreateAppointment = useCallback(async () => {
      try {
         const date = new Date(selectDia);
         const dia = getDate(date);
         const mes = getMonth(date) + 1;
         const ano = getYear(date);

         const agen = await api.post("agendamento", {
            provider_id: prestador.id,
            user_id,
            from: selectHour,
            dia,
            mes,
            ano,
            service,
         });

         const { message } = agen.data;
         if (!message) {
            Alert.alert("Agendamento criado com sucesso");
            navigate("Home");
         } else {
            Alert.alert("Erro", message);
         }
      } catch (err) {
         console.log(err);
         Alert.alert("Erro ao criar agendamento", err.message);
      }
   }, [selectDia, prestador.id, user_id, selectHour, service, navigate]);

   useEffect(() => {
      const dat = new Date(selectDia);
      const dia = getDate(dat);
      const mes = getMonth(dat) + 1;
      const ano = getYear(dat);

      api.get(`agendamento/h/horarios`, {
         params: {
            provider_id: prestador.id,
            mes,
            ano,
            dia,
            service,
         },
      }).then((response) => {
         setDisponivel(response.data);
      });
   }, [prestador.id, selectDia, service]);

   return (
      <Container>
         <Title>Agendamento</Title>

         <ContainerHorariso>
            <ContainerCalendario>
               <Button onPress={hendleDatePiker}>Calendário</Button>
            </ContainerCalendario>

            {showPiker && <Picker value={selectDia} onChange={handleChange} />}

            <SectionContente>
               {availabily.map(({ hour, avaliable }) => (
                  <HourContainer
                     enabled={avaliable}
                     onPress={() => handleSelectHour(hour)}
                     key={hour}
                  >
                     <Hour available={avaliable} select={selectHour === hour}>
                        <HourText select={selectHour === hour}>{hour}</HourText>
                     </Hour>
                  </HourContainer>
               ))}
            </SectionContente>
         </ContainerHorariso>

         <Button onPress={handleCreateAppointment}>Agendar</Button>
      </Container>
   );
};

export default AgendamentoCliente;
