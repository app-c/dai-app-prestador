import AppLoading from 'expo-app-loading'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Fonts } from '../utils'
import {Fontisto as Icon, Feather} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core'
import { StyleSheet, Text } from 'react-native'
import {api, socket} from '../../services/api'
import { Container, AgendaView, List, Descript, FootContainer, Iconcontainer, Title, ContainerAgenda, ContainerElement, Avatar, ContainerText, ContainerAvatart, PropsText } from './styles'
import { format } from 'date-fns'

export interface Response {
   ano: number
   mes: number
   dia: number
   from: number
   id: string
   service: string
   user: {
      name: string
      telefone: number
      avatar_url: string
   }
}

const Agenda: React.FC = () => {
   const {navigate} = useNavigation()
   const [agenda, setAgenda] = useState<Response[]>([])

   useEffect(() => {
      
      api.get('/agendamento/me/prestador')
      .then((h) => setAgenda(h.data))
   }, [api])

   useEffect(() => {

   }, [])

   const navigateToHome = useCallback(() => {
      navigate('DashBoard')
   }, [])

   const navigateToBlockHour = useCallback(() => {
      console.log('ok')
   }, [])

   const navigateToService = useCallback(() => {
      navigate('Serviço')
   }, [])

   const fonstsLoadd = Fonts()
   if (!fonstsLoadd){
       return <AppLoading />
   }  
   
   const styles = StyleSheet.create({
      descriçao: {
         fontFamily: 'MontRegular',
         fontSize: 14,
         alignItems: 'center',
      },

      Title: {
         fontFamily: 'MontBold',
         fontSize: 20,

      },

      props: {
         fontFamily: 'MontBold',
         fontSize: 16,
      },

      textos: {
         fontFamily: 'MontRegular',
         fontSize: 14,
      }
   })

   return (
      <>
         <Container>
            <Title style={{fontFamily: 'MontBold'}} >Minha agenda</Title>
            <List 
               data={agenda}
               keyExtractor={h => h.id}
               renderItem={({ item: h}) => (
                  <ContainerAgenda>
                     <Text style={styles.Title} >{h.user.name}</Text>
                     <AgendaView>
                        <ContainerElement>
                           <ContainerAvatart>
                           <Avatar source={{uri: `${h.user.avatar_url}`}} />
                           </ContainerAvatart>
                        </ContainerElement>

                        <ContainerElement>
                           <ContainerText>
                              <PropsText style={styles.props} >
                                 Serviço: {' '}
                                 <Text style={styles.textos} > {h.service} </Text>
                              </PropsText>

                              <PropsText style={styles.props} >
                                 Telefone: {' '}
                                 <Text style={styles.textos}> {h.user.telefone} </Text>
                              </PropsText>

                              <PropsText style={styles.props} >
                                 Data: {' '}
                                 <Text style={styles.textos} >
                                    {h.dia}/ {h.mes}/{h.ano}
                                 </Text>
                              </PropsText>

                              <PropsText style={styles.props} >
                                 Horário: {' '}
                                 <Text style={styles.textos}>
                                    {format(new Date(h.ano, h.dia, h.mes, 0, h.from, 0), "HH:00")}
                                 </Text>
                              </PropsText>

                           </ContainerText>
                        </ContainerElement>
                     </AgendaView>
                  </ContainerAgenda>
               )}
            />
         </Container>
         <FootContainer>
            <Iconcontainer onPress={navigateToHome}>
               <Icon name='home' size={30} color="#f2f2f2" />
               <Descript style={styles.descriçao} >Home</Descript>
            </Iconcontainer>
            <Iconcontainer onPress={navigateToService}>
               <Feather name='clipboard' size={30} color="#f2f2f2" />
               <Descript style={styles.descriçao} >Criar um serviço</Descript>
            </Iconcontainer>
            <Iconcontainer onPress={navigateToBlockHour} >
               <Feather name="x-square" size={30} color="#f2f2f2" />
               <Descript style={styles.descriçao} > {'  '} Bloquer {'\n'} um horário</Descript>
            </Iconcontainer>
         </FootContainer>
      </>
   )
}

export default Agenda