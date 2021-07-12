import { FlatList } from "react-native";
import styled from "styled-components/native";
import { IResposta } from "./index";
import { cores } from "../../utils/ferramentas";

export const Container = styled.View`
   align-items: center;
   justify-content: center;
   background-color: ${cores.rosa};
   flex: 1;
   padding: 25px;
`;

export const TextTitle = styled.Text`
   margin-left: 20px;
`;

export const ContainerInput = styled(FlatList as new () => FlatList<IResposta>)`
   background-color: ${cores.roxo};
   height: 250px;
`;

export const ContainerFlatList = styled.View`
   height: 90px;
   margin-bottom: 50px;
`;

export const ContainerUser = styled.View`
   flex-direction: row;
   align-items: center;
   padding: 10px;
`;

export const ContainerAvatar = styled.View``;

export const ImageAvatar = styled.Image`
   width: 70px;
   height: 70px;
   background-color: ${cores.branco};
   border-radius: 20px;
`;
