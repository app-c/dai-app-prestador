import AppLoading from "expo-app-loading";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Alert, RefreshControl } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import { withRepeat } from "react-native-reanimated";
import { api } from "../../services/api";
import { Fonts } from "../utils";
import {
   Box,
   BoxEdit,
   BoxEditTouth,
   Container,
   ContainerEdid,
   ContainerService,
   ContainerUpdate,
   List,
   Scroll,
   TextDescription,
   TextElementos,
   TextTitle,
   BoxEditToutB,
   Caixa,
} from "./styles";
import Input from "../../componentesServiço/Input";
import Button from "../../componentesServiço/Button";
import getValidationErrors from "../../utils/getValidationsErrors";
import { useAuth } from "../../hooks/AuthContext";

export interface IData {
   id: string;
   service: string;
   time: string;
   description: string;
   value: number;
}

const UpdateService: React.FC = () => {
   const { navigate } = useNavigation();
   const formRef = useRef<FormHandles>(null);
   const fontsL = Fonts();
   const [update, setUdate] = useState(false);
   const [response, setResponse] = useState<IData[]>([]);
   const { prestador } = useAuth();
   const [res, setRes] = useState("");
   const [des, setDes] = useState("");
   const [time, setTime] = useState("");
   const [value, setValue] = useState<number>();
   const [serviceId, setServiceId] = useState("");
   const [refleshing, setReflesh] = useState(false);

   const handleUpdate = useCallback(
      (
         id: string,
         service: string,
         descripton: string,
         time: string,
         value: number
      ) => {
         setServiceId(id);
         setRes(service);
         setDes(descripton);
         setTime(time);
         setValue(value);
         setUdate(true);
      },
      []
   );

   const handleDelete = useCallback(async (id: string) => {
      await api.delete(`/service/${id}/delet`);

      setResponse(response.filter((h) => h.id !== id));

      console.log(id);
   }, []);

   const updateService = useCallback(
      async (data: IData) => {
         try {
            formRef.current?.setErrors({});

            const res = await api.patch("/service/update", {
               id: serviceId,
               service: data.service,
               description: data.description,
               time: data.time,
               value: data.value,
            });

            const { message, statusCode } = res.data;
            if (!message || !statusCode) {
               Alert.alert("Serviço atualizado com sucesso");
               navigate("Home");
            } else {
               Alert.alert("Erro", message);
            }

            api.get(`/${prestador.id}/list`).then((response) => {
               setResponse(response.data);
            });
         } catch (err) {
            if (err instanceof Yup.ValidationError) {
               const errors = getValidationErrors(err);
               formRef.current?.setErrors(errors);

               return;
            }
            Alert.alert("Erro ao cadastrar um novo serviço", err.message);
         }
      },
      [navigate, prestador.id, serviceId]
   );

   function wait(timeout: any) {
      return new Promise((resolve) => {
         setTimeout(resolve, timeout);
      });
   }

   const onRefresh = useCallback(() => {
      wait(2000).then(() => {
         setReflesh(false);
         api.get(`/${prestador.id}/list`).then((response) => {
            setResponse(response.data);
         });
      });
   }, [prestador.id, refleshing]);

   useEffect(() => {
      api.get(`/${prestador.id}/list`).then((response) => {
         setResponse(response.data);
      });
   }, [prestador.id, response]);

   if (!fontsL) {
      return <AppLoading />;
   }

   return (
      <>
         <Container behavior="padding">
            <Scroll>
               <TextTitle>Atualizar os serviços</TextTitle>

               <ContainerService>
                  <List
                     refreshControl={
                        <RefreshControl
                           refreshing={refleshing}
                           onRefresh={onRefresh}
                        />
                     }
                     contentContainerStyle={{
                        paddingBottom: 30,
                     }}
                     data={response}
                     keyExtractor={(res) => res.id}
                     renderItem={({ item: res }) => (
                        <Box>
                           <TextElementos>
                              {" "}
                              Serviço: {}
                              <TextDescription>{res.service}</TextDescription>
                           </TextElementos>

                           <TextElementos>
                              {" "}
                              Descrição: {}
                              <TextDescription>
                                 {res.description}
                              </TextDescription>
                           </TextElementos>

                           <TextElementos>
                              {" "}
                              Valor: R$ {}
                              <TextDescription>{res.value}</TextDescription>
                           </TextElementos>

                           <TextElementos>
                              {" "}
                              Tempo: {}
                              <TextDescription> {res.time}</TextDescription>
                           </TextElementos>
                           <ContainerEdid>
                              <BoxEditTouth
                                 onPress={() => {
                                    handleUpdate(
                                       res.id,
                                       res.service,
                                       res.description,
                                       res.time,
                                       res.value
                                    );
                                 }}
                              >
                                 <BoxEdit>
                                    <TextDescription>Editar</TextDescription>
                                 </BoxEdit>
                              </BoxEditTouth>

                              <BoxEditToutB
                                 onPress={() => handleDelete(res.id)}
                              >
                                 <BoxEdit>
                                    <TextDescription>Deletar</TextDescription>
                                 </BoxEdit>
                              </BoxEditToutB>
                           </ContainerEdid>
                        </Box>
                     )}
                  />
                  <ContainerUpdate>
                     {update === true && (
                        <Form
                           initialData={{
                              service: res,
                              description: des,
                              time,
                              value,
                           }}
                           ref={formRef}
                           onSubmit={updateService}
                        >
                           <Input
                              name="service"
                              icon=""
                              placeholder="Nome do serivço"
                           />

                           <Input
                              name="description"
                              icon=""
                              placeholder="Descrição do serviço"
                           />

                           <Input
                              name="value"
                              icon=""
                              placeholder="Valor do serviço"
                           />

                           <Input
                              name="time"
                              icon=""
                              placeholder="Duraçao do service exp: 01:00"
                           />

                           <Button
                              onPress={() => {
                                 formRef.current?.submitForm();
                              }}
                           >
                              Atualizar
                           </Button>
                        </Form>
                     )}
                  </ContainerUpdate>
               </ContainerService>
            </Scroll>
         </Container>
      </>
   );
};

export default UpdateService;
