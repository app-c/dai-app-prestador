import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { FlatList } from "react-native";
import { IData } from "./index";

export const Container = styled.KeyboardAvoidingView`
   align-items: center;
   justify-content: center;
   flex: 1;
   padding: 25px;
`;

export const Scroll = styled.ScrollView`
   width: 100%;
`;

export const TextTitle = styled.Text`
   font-size: 20px;
   color: black;
   margin-top: 30px;
`;

export const TextElementos = styled.Text`
   font-size: 20px;
   margin-top: 10px;
`;
export const TextDescription = styled.Text`
   font-size: 16px;
`;

export const ContainerService = styled.View`
   margin-top: 20px;
`;
export const List = styled(FlatList as new () => FlatList<IData>)``;

export const Box = styled.View`
   padding: 20px;
   width: 100%;
   border-width: 2px;
   border-color: black;
   margin-top: 10px;
`;

export const BoxEdit = styled.View`
   border-width: 2px;
   border-color: black;
   padding-left: 8px;
`;

export const BoxEditTouth = styled(RectButton)`
   width: 100px;
   height: 30px;
   margin-top: 10px;
   justify-content: center;
`;

export const BoxEditToutB = styled(RectButton)`
   width: 100px;
   height: 30px;
   margin-top: 10px;
   justify-content: center;
`;

export const ContainerUpdate = styled.View`
   align-items: center;
   justify-content: center;
   flex: 1;

   padding: 25px;
`;

export const ContainerTexInpu = styled.View`
   width: 100%;
   height: 100px;
   border-width: 2px;
   border-color: #909090;

   margin-top: 10px;

   background: #f2f2f2;
   border-radius: 12px;
   padding: 0 15px;
`;

export const ContainerEdid = styled.View`
   justify-content: space-between;
   flex-direction: row;
   width: 100%;
`;

export const Caixa = styled(RectButton)`
   background-color: red;
   width: 200px;
   height: 30px;
`;
