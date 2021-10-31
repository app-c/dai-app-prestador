import styled from "styled-components/native";

import { cores } from "../../../utils/ferramentas";

export const Container = styled.View`
   background-color: ${cores.rosa};
   flex: 1;
   padding: 30px;
`;

export const Recipient = styled.View`
   width: 100%;
   height: 150px;
   background: ${cores.roxo};
   padding: 10px;

   border-radius: 15px;
   opacity: 0.9;
`;

export const TitleText = styled.Text`
   color: ${cores.branco};
   font-size: 18px;
`;
