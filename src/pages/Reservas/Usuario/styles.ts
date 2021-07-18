import { FlatList } from "react-native";
import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { IResposta, Response } from "./index";
import { cores } from "../../../utils/ferramentas";

interface Props {
   pres: boolean;
}

export const Container = styled.View`
   background-color: ${cores.rosa};
   flex: 1;
   padding: 25px;
`;

export const TextTitle = styled.Text`
   margin-left: 20px;
`;

export const ContainerInput = styled(
   FlatList as new () => FlatList<IResposta>
)``;

export const ContainerFlatList = styled.View`
   height: 250px;
   margin-top: 30px;
   margin-bottom: 30px;
`;

export const ContainerUser = styled.TouchableOpacity<Props>`
   flex-direction: row;
   align-items: center;
   padding: 10px;
   border-radius: 10px;
   background-color: ${(props) => (props.pres ? `${cores.roxo}` : "#fff")};
   opacity: 0.8;
   margin-top: 10px;
`;

export const ContainerAvatar = styled.View``;

export const ImageAvatar = styled.Image`
   width: 70px;
   height: 70px;
   background-color: ${cores.branco};
   border-radius: 20px;
`;

export const InputContainer = styled.View`
   background-color: ${cores.roxo};
   opacity: 0.9;
   width: 100%;
   height: 60px;
   padding: 3px 10px;

   justify-content: center;

   border-radius: 10px;
   margin-top: 30px;
`;

export const InpuTextPesquisa = styled.TextInput`
   flex: 1;
   color: ${cores.branco};
`;

export const ContainerService = styled.View``;

export const ServiceContainer = styled(
   FlatList as new () => FlatList<Response>
)``;

export const BoxContainer = styled(RectButton)<Props>`
   margin-left: 10px;
   background-color: ${(prop) =>
      prop.pres ? `${cores.roxo}` : `${cores.branco}`};
   border-radius: 15px;
   align-items: center;
   justify-content: center;
   padding: 5px;
`;

export const ServiceText = styled.Text`
   font-size: 16px;
   color: ${cores.rosa};
`;
