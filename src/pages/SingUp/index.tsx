import React, { useCallback, useRef, useState } from 'react'
import { BackContainer, BackText, Boto, Container, Linear, Title } from './styles'
import AppLoading from 'expo-app-loading'
import {AntDesign as Icon} from '@expo/vector-icons'

import { Alert, Image, ScrollView, StyleSheet } from 'react-native'

import Logo from '../../assets/Logo.png'
import { Fonts } from '../utils'
import Button from '../../components/Button'
import Input from '../../components/Input'
import {api} from '../../services/api'
import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import getValidationErrors from '../../utils/getValidationsErrors'

interface SignUpFormDatea {
   name: string;
   email: string;
   telefone: string;
   password: string;
}


const SingUp: React.FC = () => {
   const formRef = useRef<FormHandles>(null);
   const {goBack} = useNavigation()


    const navigate = useNavigation()



    const handleSigUp = useCallback(
      async (data: SignUpFormDatea) => {
         try {
            formRef.current?.setErrors({});

            const shema = Yup.object().shape({
               name: Yup.string().required('Nome obrigatorio'),
               email: Yup.string()
                  .required('E-mail Obrigatorio')
                  .email('Digite um email valido'),
               telefone: Yup.number()
                  .min(11, 'telefone invalido')
                  .required('telefone obrigatorio'),
               password: Yup.string()
                  .required('Senha obrigatoria')
                  .min(6, 'No minimo 6 digitos'),
            });

            await shema.validate(data, {
               abortEarly: false,
            });

            await api.post('/user', {
               name: data.name,
               email: data.email,
               telefone: data.telefone,
               password: data.password,
               prestador: true,
            });

            Alert.alert(
               'Cadastro realizado com sucesso!',
               'Você ja pode fazer login na aplicação',
            );

            goBack();
         } catch (err) {
            if (err instanceof Yup.ValidationError) {
               const errors = getValidationErrors(err);
               formRef.current?.setErrors(errors);

               return;
            }
            Alert.alert(
               'Erro no cadastro',
               'Ocorreu um erro ao tentar fazer o cadastro',
            );
         }
      },
      [goBack],
   );
    

    const fonstsLoadd = Fonts()
    if (!fonstsLoadd){
        return <AppLoading />
    }

    const styles = StyleSheet.create({
       input: {
          fontFamily: 'MontBold'
       }
    })

    return (
        <Linear 
        colors={['#E4C6D5', '#EAEAEA']}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
       >
         
                <Container behavior='padding' >
                    <Image source={Logo} />
                    <Title style={{fontFamily: 'MontBold'}} >Criar uma conta</Title>  
                    <Form ref={formRef} onSubmit={handleSigUp}>
                  <Input name="name" icon="user" placeholder="Nome" />

                  <Input
                     name="email"
                     icon="mail"
                     placeholder="E-mail"
                     keyboardType="email-address"
                     autoCapitalize="none"
                  />

                  <Input
                     name="telefone"
                     icon="phone"
                     placeholder="telefone"
                     keyboardType="number-pad"
                  />

                  <Input
                     name="password"
                     icon="lock"
                     placeholder="Senha"
                     keyboardType="visible-password"
                     secureTextEntry
                  />

                  <Button
                     onPress={() => {
                        formRef.current?.submitForm();
                     }}
                  >
                     Criar
                  </Button>
               </Form>
                        <Boto />
                </Container>
            <BackContainer onPress={() => navigate.goBack()}>
                <Icon name='back' color='#999999' size={20} />
                <BackText>Voltar para login</BackText>
            </BackContainer>
        </Linear>
    )
   
}

export default SingUp