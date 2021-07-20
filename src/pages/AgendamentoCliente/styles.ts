import { FlatList } from "react-native";
import { RectButton } from "react-native-gesture-handler";

import styled from "styled-components/native";

import { cores } from "../../utils/ferramentas";

interface HourProps {
   available?: boolean;
   select: boolean;
}

export const Container = styled.View`
   background-color: ${cores.rosa};
   flex: 1;
   padding: 25px;
`;

export const Title = styled.Text`
   font-size: 16px;
`;

export const ContainerHorariso = styled.View``;

export const ContainerCalendario = styled.View`
   margin-bottom: 30px;
   width: 40%;
`;

export const SectionContente = styled.ScrollView.attrs({
   contentContainerStyle: { paddingHorizontal: 24 },
   horizontal: true,
})`
   margin-top: 30px;
`;

export const HourContainer = styled(RectButton)``;

export const Hour = styled.View<HourProps>`
   background: ${(props) => (props.select ? `${cores.roxo}` : "#fff")};
   padding: 6px 30px;
   margin-right: 8px;
   border-radius: 15px;
   border-width: 1px;
   border-color: ${cores.roxo};

   opacity: ${(props) => (props.available ? 1 : 0.3)};
`;

export const HourText = styled.Text<HourProps>`
   font-family: "MontBold";
   font-size: 16px;
   color: ${(props) => (props.select ? `${cores.branco}` : `${cores.roxo}`)};
`;
