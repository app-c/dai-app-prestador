import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { cores } from '../../utils/ferramentas';

export const Container = styled.View`
   flex: 1;
   justify-content: center;
   background: ${cores.rosa}

   padding: 0 30px ${Platform.OS === 'android' ? 120 : 40}px;
`;

export const Text = styled.Text`
   font-size: 20px;
   color: #508373;
   margin: 64px 0 24px;
`;

export const BackButton = styled.TouchableOpacity``;

export const OffContainer = styled.View`
   flex-direction: row;
   padding: 25px;
   justify-content: space-between;
   align-items: center;
`;

export const Off = styled.TouchableOpacity``;

export const UserAvatarButtom = styled.TouchableOpacity`
   margin-top: 20px;
`;

export const UserAvatar = styled.Image`
   width: 186px;
   background: #508373;
   height: 186px;
   border-radius: 98px;
   margin-top: 64px;
   align-self: center;
`;
