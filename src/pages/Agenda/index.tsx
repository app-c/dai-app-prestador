import AppLoading from "expo-app-loading";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Fontisto as Icon, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { StyleSheet, Text } from "react-native";
import { format } from "date-fns";
import { api, socket } from "../../services/api";
import {
   Container,
   AgendaView,
   List,
   Descript,
   FootContainer,
   Iconcontainer,
   Title,
   ContainerAgenda,
   ContainerElement,
   Avatar,
   ContainerText,
   ContainerAvatart,
   PropsText,
} from "./styles";
import { Fonts } from "../utils";

export interface Response {
   id: string;
   ano: number;
   mes: number;
   dia: number;
   from: number;
   service: string;
   user: {
      nome: string;
      avatar: string;
      telefone: string;
   };
}

const Agenda: React.FC = () => {
   const { navigate } = useNavigation();
   const [agenda, setAgenda] = useState<Response[]>([]);

   useEffect(() => {
      api.get("/agendamento/me/prestador").then((h) => setAgenda(h.data));
   }, []);

   const fonstsLoadd = Fonts();
   if (!fonstsLoadd) {
      return <AppLoading />;
   }

   console.log(agenda);
   const styles = StyleSheet.create({
      descriçao: {
         fontFamily: "MontRegular",
         fontSize: 14,
         alignItems: "center",
      },

      Title: {
         fontFamily: "MontBold",
         fontSize: 20,
      },

      props: {
         fontFamily: "MontBold",
         fontSize: 16,
      },

      textos: {
         fontFamily: "MontRegular",
         fontSize: 14,
      },
   });

   return (
      <>
         <Container>
            <Title style={{ fontFamily: "MontBold" }}>Minha agenda</Title>
            <List
               data={agenda}
               keyExtractor={(h) => h.id}
               renderItem={({ item: h }) => (
                  <ContainerAgenda>
                     <Text style={styles.Title}>{h.user.nome}</Text>
                     <AgendaView>
                        <ContainerElement>
                           <ContainerAvatart>
                              <Avatar source={{ uri: `${h.user.avatar}` }} />
                           </ContainerAvatart>
                        </ContainerElement>

                        <ContainerElement>
                           <ContainerText>
                              <PropsText style={styles.props}>
                                 Serviço:{" "}
                                 <Text style={styles.textos}>
                                    {" "}
                                    {h.service}{" "}
                                 </Text>
                              </PropsText>

                              <PropsText style={styles.props}>
                                 Telefone:{" "}
                                 <Text style={styles.textos}>
                                    {" "}
                                    {h.user.telefone}{" "}
                                 </Text>
                              </PropsText>

                              <PropsText style={styles.props}>
                                 Data:{" "}
                                 <Text style={styles.textos}>
                                    {h.dia}/ {h.mes}/{h.ano}
                                 </Text>
                              </PropsText>

                              <PropsText style={styles.props}>
                                 Horário:{" "}
                                 <Text style={styles.textos}>
                                    {format(
                                       new Date(
                                          h.ano,
                                          h.dia,
                                          h.mes,
                                          0,
                                          h.from,
                                          0
                                       ),
                                       "HH:00"
                                    )}
                                 </Text>
                              </PropsText>
                           </ContainerText>
                        </ContainerElement>
                     </AgendaView>
                  </ContainerAgenda>
               )}
            />
         </Container>
      </>
   );
};

export default Agenda;
