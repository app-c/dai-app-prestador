import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { cores } from '../../utils/ferramentas';

interface ContainerProps {
    isFocused: boolean;
    isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
    width: 100%;
    height: 48px;
    padding: 0 16px;
    background: ${cores.branco};
    border-radius: 15px;
    border-width: 2px;
    margin-bottom: 10px;

    border-color: ${cores.branco};

    flex-direction: row;
    align-items: center;

    ${props =>
        props.isErrored &&
        css`
            border-color: #c53030;
            border-width: 2px;
        `}

    ${props =>
        props.isFocused &&
        css`
            border-color: ${cores.roxo};
            border-width: 2px;
        `}
`;

export const InputText = styled.TextInput`
    flex: 1;
    color: #363636;
    font-size: 20px;
`;

export const Icon = styled(Feather)`
    margin-right: 14px;
`;
