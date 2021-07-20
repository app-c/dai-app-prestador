import { RectButton } from "react-native-gesture-handler";

import styled from "styled-components/native";

import { cores } from "../../../utils/ferramentas";

export const Container = styled.View`
   padding: 25px;
   background-color: ${cores.rosa};

   flex: 1;
`;

export const Title = styled.Text`
   font-size: 20px;
`;

export const ContainerForm = styled.View`
   margin-top: 20px;
   width: 100%;
   background-color: ${cores.roxo};
   border-radius: 15px;

   opacity: 0.8;
   padding: 10px;
`;

export const ContainerInput = styled.View`
   background-color: ${cores.branco};
   margin-top: 19px;
   border-radius: 10px;
   padding-left: 20px;
`;

export const Inputs = styled.TextInput``;

export const ContainerText = styled.View`
   background-color: ${cores.roxo};
   border-radius: 10px;
   top: -10px;
`;

export const Text = styled.Text`
   color: ${cores.branco};
   margin-bottom: 5px;
   margin-left: 10px;
`;

export const ContainerButton = styled(RectButton)`
   background: ${cores.roxo};
   width: 150px;
   height: 50px;
   align-items: center;
   justify-content: center;

   margin-top: 30px;
   border-radius: 10px;
   align-self: center;
`;

export const TextButton = styled.Text``;
