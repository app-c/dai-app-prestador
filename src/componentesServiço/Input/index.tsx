/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/prop-types */
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { TextInputProps } from 'react-native';

import { useField } from '@unform/core';
import { Container, InputText, Icon } from './styles';
import { cores } from '../../utils/ferramentas';

interface InputProps extends TextInputProps {
    name: string;
    icon: string;
    containerStyle?: {};
}

interface InputValueReference {
    value: string;
}

const Input: React.FC<InputProps> = ({
    name,
    icon,
    containerStyle = {},
    ...rest
}) => {
    const [isFocused, setsFocused] = useState(false);
    const [isFilled, setsFilled] = useState(false);

    const handleInput = useCallback(() => {
        setsFocused(true);
    }, []);

    const handleBlur = useCallback(() => {
        setsFocused(false);
        setsFilled(!!inpuValueRef.current.value);
    }, []);

    const inputElementRef = useRef<any>(null);

    const { registerField, defaultValue = '', fieldName, error } = useField(
        name,
    );
    const inpuValueRef = useRef<InputValueReference>({ value: defaultValue });

    useEffect(() => {
        registerField<string>({
            name: fieldName,
            ref: inpuValueRef.current,
            path: 'value',
            setValue(ref: any, value) {
                inpuValueRef.current.value = value;
                inputElementRef.current.setNativeProps({ text: value });
            },
            clearValue() {
                inpuValueRef.current.value = '';
                inputElementRef.current.clear();
            },
        });
    }, [fieldName, registerField]);

    return (
        <Container
            style={containerStyle}
            isFocused={isFocused}
            isErrored={!!error}
        >
            <Icon
                name={icon}
                size={20}
                color={isFocused || isFilled ? `${cores.roxo}` : '#6F6F6F'}
            />
            <InputText
               multiline
               name={name}
               ref={inputElementRef}
               keyboardAppearance="dark"
               placeholderTextColor="#6F6F6F"
               onFocus={handleInput}
               onBlur={handleBlur}
               defaultValue={defaultValue}
               onChangeText={value => {
                  inpuValueRef.current.value = value;
               }}
               {...rest}
            />
        </Container>
    );
};

export default Input;
