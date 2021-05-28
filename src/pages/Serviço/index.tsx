import AppLoading from 'expo-app-loading'
import React, { useCallback, useRef } from 'react'
import { Alert, Image, } from 'react-native'
import {api} from '../../services/api'
import { Fonts } from '../utils'
import { Container, TextTitle } from './styles'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core'
import Logo from '../../assets/Logo.png'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
import Input from '../../componentesServiço/Input'
import Button from '../../componentesServiço/Button'
import getValidationErrors from '../../utils/getValidationsErrors'
import * as Yup from 'yup'

interface IData {
    provider_id: string
    service: string
    description: string
    time: string
    value: string
}
export const Serviço:React.FC = () => {
   const formRef = useRef<FormHandles>(null)
   const fontsL = Fonts()
   const {goBack} = useNavigation()


   const handleSigUp = useCallback(
      async (data: IData) => {
         try {
            formRef.current?.setErrors({});

            const shema = Yup.object().shape({
               service: Yup.string().required('Nome obrigatorio'),
               description: Yup.string().required('E-mail Obrigatorio'),
               time: Yup.string().required(),
               value: Yup.string().required()
                 
            });

            await shema.validate(data, {
               abortEarly: false,
            });

            await api.post('/service', {
               service: data.service,
               description: data.description,
               time: data.time,
               value: data.value
            });

            Alert.alert(
               'Serviço realizado com sucesso!',
            );

            goBack();
         } catch (err) {
            if (err instanceof Yup.ValidationError) {
               const errors = getValidationErrors(err);
               formRef.current?.setErrors(errors);

               return;
            }
            Alert.alert(
               'Erro ao cadastrar um novo serviço', err.message
            );
         }
      },
      [goBack],
   );
    

   if(!fontsL) {
      return ( <AppLoading />)
   }

   return (
      <>
         <Container behavior='padding' >
               <Image source={Logo} />
               <TextTitle style={{ fontFamily: 'MontBold'}} >Criar um Serviço</TextTitle>
            <Form ref={formRef} onSubmit={handleSigUp} >
               <Input 
                  name='service' 
                  icon='' 
                  placeholder='Nome do serivço' 
               />
               <Input 
                  name='description' 
                  icon='' 
                  placeholder='Descrição do serviço' 
               />
               <Input 
                  name='time' 
                  icon='' 
                  placeholder='Duraçao do service exp: 01:00' 
               />
               <Input 
                  name='value' 
                  icon='' 
                  placeholder='Valor do serviço' 
                  />

               <Button onPress={() => {
                  formRef.current?.submitForm()
               }} >Criar</Button>
               </Form>
         </Container>
      </>
   )
}
