/* eslint-disable import/prefer-default-export */
import { FlatList } from "react-native";

import styled from "styled-components/native";

import { cores } from "../../utils/ferramentas";
import { Response } from "./index";

export const Container = styled.View`
   flex: 1;
   background-color: ${cores.rosa};
   align-items: center;
`;

export const Flat = styled(FlatList as new () => FlatList<Response>)``;

export const ContainerText = styled.View``;

export const TextElemenst = styled.Text``;
