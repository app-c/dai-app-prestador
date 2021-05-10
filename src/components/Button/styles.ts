import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { cores } from '../../utils/ferramentas';

export const Container = styled(RectButton)`
    height: 48px;
    background: ${cores.roxo};
    border-radius: 15px;

    align-items: center;
    justify-content: center;
    margin-top: 20px;
`;

export const ButtonText = styled.Text`
    font-size: 26px;
    color: #f2f2f2;
`;
