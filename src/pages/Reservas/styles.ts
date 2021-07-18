import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { cores } from "../../utils/ferramentas";

export const Container = styled.View`
   flex: 1;
   background-color: ${cores.rosa};
   padding: 30px;
`;

export const ContainerCards = styled.View`
   align-items: center;
   justify-content: flex-start;
   flex-direction: row;
   margin-top: 15px;
`;

export const Cards = styled(RectButton)`
   width: 50%;
   height: 100px;
   background-color: ${cores.roxo};
   margin-right: 15px;

   align-items: center;
   justify-content: center;
   padding: 10px;
   border-radius: 10px;
`;

export const TextTitle = styled.Text``;
