/* eslint-disable consistent-return */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-expressions */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { RefreshControl, ScrollView, Text } from "react-native";

import { Feather } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/core";
import prBr, { format, getDate, isToday } from "date-fns";

import { useAuth } from "../../hooks/AuthContext";
import { api, socket } from "../../services/api";
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
   ContainerFlatList,
} from "./styles";

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

   function formated(ano: number, mes: number, dia: number, min: number) {
      const date = new Date(ano, mes, dia, 0, min);
      const horaFormated = format(date, "HH:mm");
      const dataFormated = format(date, "dd/MM");
      return { horaFormated, dataFormated };
   }

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
                           <Feather name="clipboard" size={20} />
                           {"  "}
                           {nextAgendamento.service}
                        </TextService>
                     </ContainerText>
                  </BoxFirst>
               )}

               <ContainerFlatList
                  contentContainerStyle={{
                     paddingBottom: 20,
                     paddingLeft: 5,
                     paddingRight: 5,
                  }}
                  data={afterAgendamento}
                  keyExtractor={(h) => h.id}
                  renderItem={({ item: h }) => (
                     <BoxSecond>
                        <Feather name="clock" size={25} />
                        <ContainerAgenda>
                           <TextService>
                              {
                                 formated(h.ano, h.mes, h.dia, h.from)
                                    .horaFormated
                              }
                           </TextService>

                           <TextService>
                              {
                                 formated(h.ano, h.mes, h.dia, h.from)
                                    .dataFormated
                              }
                           </TextService>
                        </ContainerAgenda>

                        <BoxText>
                           <AvatarImag
                              source={{
                                 uri: `${urlAvatar}${h.user.avatar}`,
                              }}
                           />

                           <BoxTextElements>
                              <TextName> {h.user.nome} </TextName>
                              <TextService> {h.service} </TextService>
                           </BoxTextElements>
                        </BoxText>
                     </BoxSecond>
                  )}
               />
               {/* {afterAgendamento.map((h) => (
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
               ))} */}
            </ContainerBody>
         </ScrollView>
      </Container>
   );
};

export default DashBoard;
