/* eslint-disable consistent-return */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-expressions */
import { useNavigation } from "@react-navigation/core";
import AppLoading from "expo-app-loading";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { RefreshControl, ScrollView, Text } from "react-native";
import prBr, { format, getDate, isToday } from "date-fns";

import { Feather } from "@expo/vector-icons";
import {
   AvatarContainer,
   AvatarImage,
   AvatarImag,
   BoxFirst,
   BoxSecond,
   Container,
   ContainerBody,
   ContainerText,
   DateText,
   Header,
   HeaderTitle,
   Linear,
   NextAppointment,
   ProfileButton,
   TextName,
   TextService,
   UserAvatar,
   UserName,
   BoxText,
   ContainerAgenda,
   BoxTextElements,
} from "./styles";
import { Fonts } from "../utils";
import { api, socket } from "../../services/api";
import { useAuth } from "../../hooks/AuthContext";

export interface Request {
   ano: number;
   mes: number;
   dia: number;
   from: number;
   service: string;
   id: string;
   user: {
      nome: string;
      avatar: string;
   };
}

export interface Response {
   ano: number;
   mes: number;
   dia: number;
   from: number;
   service: string;
   id: string;
   user: {
      nome: string;
      avatar: string;
   };
}

const DashBoard: React.FC = () => {
   const data = new Date(Date.now());
   const dataFormat = format(data, "EEEE dd/MM/yyyy", { locale: prBr });
   const { prestador } = useAuth();
   const { navigate } = useNavigation();

   const [appointment, setAppoitment] = useState<Response[]>([]);
   const [agendas, seAgendas] = useState<any[]>([]);
   const [refleshing, setReflesh] = useState(false);

   const navigateToProfile = useCallback(() => {
      navigate("Profile");
   }, [navigate]);

   useEffect(() => {
      socket.on("agenda", (newAgenda: Response) => {
         seAgendas([newAgenda, ...agendas]);
      });

      socket.on("delet", (del: string) => {
         const de = appointment.filter((h) => {
            return h.id !== del;
         });

         setAppoitment(de);
      });
   }, [agendas, appointment]);

   useEffect(() => {
      agendas;
      api.get("/agendamento/me/prestador").then((res) =>
         setAppoitment(res.data)
      );
   }, [agendas]);

   const nextAgendamento = useMemo(() => {
      return appointment.find((ap) => {
         const dia = getDate(new Date(Date.now()));
         if (ap.dia === dia) {
            return ap;
         }
      });
   }, [appointment]);

   const afterAgendamento = useMemo(() => {
      return appointment.filter((h) => {
         const dataNow = getDate(new Date(Date.now()));
         return h.dia >= dataNow;
      });
   }, [appointment]);

   const onRefresh = useCallback(() => {
      function wait(timeout: any) {
         return new Promise((resolve) => {
            setTimeout(resolve, timeout);
         });
      }

      wait(2000).then(() => {
         setReflesh(false);
         api.get("/agendamento/me/prestador").then((res) =>
            setAppoitment(res.data)
         );
      });
   }, []);

   const urlAvatar = "https://dai-nails.s3.us-east-2.amazonaws.com/";

   return (
      <Container
         start={{ x: 0, y: 0 }}
         end={{ x: 1, y: 0 }}
         locations={[0.2, 1]}
         colors={["#E4C6D5", "#EAEAEA"]}
      >
         <Header>
            <Linear
               start={{ x: 1, y: 1 }}
               end={{ x: 0, y: 1 }}
               colors={["#f4b7b7", "#bf4e8a"]}
            >
               <HeaderTitle style={{ fontFamily: "MontRegular" }}>
                  Bem vindo, {"\n"}
                  <UserName style={{ fontFamily: "MontBold" }}>
                     {prestador.nome}
                  </UserName>
               </HeaderTitle>

               <ProfileButton onPress={navigateToProfile}>
                  <UserAvatar
                     source={{
                        uri: `${urlAvatar}${prestador.avatar}`,
                     }}
                  />
               </ProfileButton>
            </Linear>
         </Header>

         <ScrollView
            refreshControl={
               <RefreshControl refreshing={refleshing} onRefresh={onRefresh} />
            }
         >
            <ContainerBody>
               <DateText style={{ fontFamily: "MontRegular" }}>
                  {dataFormat}
               </DateText>
               <NextAppointment style={{ fontFamily: "MontBold" }}>
                  Proximo Atendimento
               </NextAppointment>

               {nextAgendamento === undefined && (
                  <Text>Sem horários para hoje</Text>
               )}
               {isToday(data) && nextAgendamento && (
                  <BoxFirst>
                     <AvatarContainer>
                        <AvatarImage
                           source={{
                              uri: `${urlAvatar}${nextAgendamento.user.avatar}`,
                           }}
                        />
                     </AvatarContainer>
                     <ContainerText>
                        <TextName style={{ fontFamily: "MontBold" }}>
                           {nextAgendamento.user.nome}
                        </TextName>
                        <TextService style={{ fontFamily: "MontRegular" }}>
                           {" "}
                           <Feather name="clock" size={20} /> Horário:{" "}
                           {format(
                              new Date(
                                 nextAgendamento.ano,
                                 nextAgendamento.mes,
                                 nextAgendamento.dia,
                                 0,
                                 nextAgendamento.from,
                                 0
                              ),
                              "HH:mm"
                           )}{" "}
                           hs
                        </TextService>
                        <TextService style={{ fontFamily: "MontRegular" }}>
                           {" "}
                           <Feather name="clipboard" size={20} /> Serviço:{" "}
                           {nextAgendamento.service}
                        </TextService>
                     </ContainerText>
                  </BoxFirst>
               )}
               <ScrollView>
                  {afterAgendamento.map((agenda) => (
                     <BoxSecond key={agenda.id}>
                        <Feather name="clock" size={25} />
                        <ContainerAgenda>
                           <TextService style={{ fontFamily: "MontBold" }}>
                              {format(
                                 new Date(
                                    agenda.ano,
                                    agenda.mes,
                                    agenda.dia,
                                    0,
                                    agenda.from,
                                    0
                                 ),
                                 "HH:mm"
                              )}
                           </TextService>
                           <TextService style={{ fontFamily: "MontBold" }}>
                              {format(
                                 new Date(
                                    agenda.ano,
                                    agenda.mes,
                                    agenda.dia,
                                    0,
                                    agenda.from,
                                    0
                                 ),
                                 "dd/MM"
                              )}
                           </TextService>
                        </ContainerAgenda>
                        <BoxText>
                           <AvatarImag
                              source={{
                                 uri: `${urlAvatar}${agenda.user.avatar}`,
                              }}
                           />
                           <BoxTextElements>
                              <Text
                                 style={{
                                    marginLeft: 30,
                                    fontSize: 16,
                                    fontFamily: "MontBold",
                                 }}
                              >
                                 {agenda.user.nome}
                              </Text>
                              <Text
                                 style={{
                                    marginLeft: 30,
                                    fontSize: 14,
                                    fontFamily: "MontBold",
                                 }}
                              >
                                 {agenda.service}
                              </Text>
                           </BoxTextElements>
                        </BoxText>
                     </BoxSecond>
                  ))}
               </ScrollView>
            </ContainerBody>
         </ScrollView>
      </Container>
   );
};

export default DashBoard;
