import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Usuario from "../pages/Reservas";
import ReservaCliente from "../pages/Reservas/Usuario";
import AgendamentoCliente from "../pages/AgendamentoCliente";

const Auth = createStackNavigator();

const AppService: React.FC = () => {
   return (
      <Auth.Navigator
         screenOptions={{
            headerShown: false,
         }}
      >
         <Auth.Screen name="reserva" component={Usuario} />
         <Auth.Screen name="ReservaCliente" component={ReservaCliente} />
         <Auth.Screen name="agendar user" component={AgendamentoCliente} />
      </Auth.Navigator>
   );
};

export default AppService;
