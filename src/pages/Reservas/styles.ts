import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { cores } from "../../utils/ferramentas";

export const Container = styled.View`
   flex: 1;
   background-color: ${cores.rosa};
   padding: 30px;
   flex-direction: row;
   justify-content: space-between;
`;

export const Cards = styled(RectButton)`
   width: 150px;
   height: 100px;
   background-color: ${cores.roxo};

   align-items: center;
   justify-content: center;
   padding: 10px;
   border-radius: 10px;
`;

export const TextTitle = styled.Text``;
