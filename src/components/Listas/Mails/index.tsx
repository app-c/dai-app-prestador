/* eslint-disable import/prefer-default-export */
import React from "react";

import { Text } from "../../../pages/Profile/styles";
import { Container, Recipient, TitleText } from "./styles";

interface Props {
   message: string;
}

export const Mail: React.FC<Props> = (message) => {
   return (
      <Container>
         <Recipient>
            <TitleText>
               Mensagem: {"\n"} {message}{" "}
            </TitleText>
         </Recipient>
      </Container>
   );
};
