import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import AgendamentoCliente from "../pages/AgendamentoCliente";
import Bloqueio from "../pages/Bloqueio";
import Usuario from "../pages/Reservas";
import ReservaDiaria from "../pages/Reservas/ReservaDiaria";
import ReservaCliente from "../pages/Reservas/Usuario";

const Auth = createStackNavigator();

const AppService: React.FC = () => {
   return (
      <Auth.Navigator
         screenOptions={{
            headerShown: false,
         }}
      >
         <Auth.Screen name="reserva" component={Usuario} />
         <Auth.Screen name="reserva diaria" component={ReservaDiaria} />
         <Auth.Screen name="ReservaCliente" component={ReservaCliente} />
         <Auth.Screen name="agendar user" component={AgendamentoCliente} />
         <Auth.Screen name="Bloqueio" component={Bloqueio} />
      </Auth.Navigator>
   );
};

export default AppService;
