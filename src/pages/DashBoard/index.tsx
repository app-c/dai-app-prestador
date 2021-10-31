/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable block-scoped-var */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-expressions */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { RefreshControl, ScrollView, Text } from "react-native";

import * as Notification from "expo-notifications";
import { hide } from "expo-splash-screen";

import { Feather, Ionicons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/core";
import prBr, { format, getDate, getHours, isToday } from "date-fns";
import { ConsoleWriter } from "istanbul-lib-report";

import { useAuth } from "../../hooks/AuthContext";
import { api, socket } from "../../services/api";
import { convertHours } from "../utils";
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
   ContainerAvatar,
   ContainerMail,
   Recivid,
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
   from: number;
}

interface Message {
   message: {
      content: string;
   };
}

const DashBoard: React.FC = () => {
   const data = new Date(Date.now());
   const dataFormat = format(data, "EEEE dd/MM/yyyy", { locale: prBr });
   const { prestador } = useAuth();
   const { navigate } = useNavigation();

   const [appointment, setAppoitment] = useState<Request[]>([]);
   const [agendas, seAgendas] = useState<Response[]>([{ from: 0 }]);
   const [refleshing, setReflesh] = useState(false);
   const [recived, setRecived] = useState(0);
   const [message, setMessage] = useState<any[]>([]);

   const handleMessage = useCallback(() => {
      setRecived(0);
      navigate("message");
   }, [navigate]);

   // const horformated = useMemo(() => {
   //    const age = appointment.map((h) => {
   //       return h.from;
   //    });
   //    const leng = age.length - 1;
   //    const hora = age[leng];
   //    const date = new Date(2021, 1, 1, 0, hora, 0);
   //    var form = format(date, "HH:mm", { locale: prBr });

   //    return form;
   // }, [appointment]);

   const mess = useCallback(() => {
      setRecived(recived + 1);
      return setMessage;
   }, [recived]);

   const notifica = useCallback(() => {
      Notification.setNotificationHandler({
         handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
         }),
      });

      function wait(timeout: any) {
         return new Promise((resolve) => {
            setTimeout(resolve, timeout);
         });
      }

      async function not() {
         const notifica = await Notification.scheduleNotificationAsync({
            content: {
               title: "Meu agendamento",
               body: `Você tem um novo agendamento   `,
               sound: true,
               priority: Notification.AndroidNotificationPriority.HIGH,
            },
            trigger: { seconds: 3 },
         });
         return notifica;
      }
      mess();
      not();
   }, [mess, appointment]);

   const navigateToProfile = useCallback(() => {
      navigate("Profile");
   }, [navigate]);

   useEffect(() => {
      socket.on("hora", (newAgenda: Response) => {
         seAgendas([...agendas, newAgenda]);
      });

      socket.on("delet", (del: string) => {
         const de = appointment.filter((h) => {
            return h.id !== del;
         });

         setAppoitment(de);
      });
   }, []);

   useEffect(() => {
      api.get("/agendamento/me/prestador").then((res) =>
         setAppoitment(res.data)
      );
      notifica();
   }, [agendas]);

   const nextAgendamento = useMemo(() => {
      return appointment.find((ap) => {
         const dia = getDate(new Date(Date.now()));
         const horaN = new Date(Date.now());
         const horformated = format(horaN, "HH:mm");
         const convetH = convertHours(horformated);
         const hora = new Date(0, 0, 0, 0, ap.from, 0).getHours();
         if (ap.dia === dia && ap.from >= convetH) {
            return ap;
         }
      });
   }, [appointment]);

   const afterAgendamento = useMemo(() => {
      return appointment.filter((h) => {
         const horaN = new Date(Date.now());
         const horformated = format(horaN, "HH:mm");
         const convetH = convertHours(horformated);
         const dataNow = getDate(new Date(Date.now()));
         if (h.dia >= dataNow) {
            return h;
         }
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
                  <ContainerAvatar>
                     <ContainerMail onPress={handleMessage}>
                        <Recivid>
                           <Text>{recived}</Text>
                        </Recivid>
                        <Ionicons name="mail-outline" size={30} />
                     </ContainerMail>
                     <UserAvatar
                        source={{
                           uri: `${urlAvatar}${prestador.avatar}`,
                        }}
                     />
                  </ContainerAvatar>
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
