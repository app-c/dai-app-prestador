import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import AgendamentoCliente from "../pages/AgendamentoCliente";
import Bloqueio from "../pages/Bloqueio";
import Usuario from "../pages/Reservas";
import ReservaDiaria from "../pages/Reservas/ReservaDiaria";
import ReservaCliente from "../pages/Reservas/Usuario";
<<<<<<< HEAD
=======
import AgendamentoCliente from "../pages/AgendamentoCliente";
import ReservaMensal from "../pages/Reservas/ReservaMensal";
import Bloqueio from "../pages/Bloqueio";
>>>>>>> 8f1dc5ec56f9edce1d740e0a284a68b0545c3439

const Auth = createStackNavigator();

const AppService: React.FC = () => {
   return (
      <Auth.Navigator
         screenOptions={{
            headerShown: false,
         }}
      >
         <Auth.Screen name="reserva" component={Usuario} />
<<<<<<< HEAD
         <Auth.Screen name="reserva diaria" component={ReservaDiaria} />
         <Auth.Screen name="ReservaCliente" component={ReservaCliente} />
         <Auth.Screen name="agendar user" component={AgendamentoCliente} />
         <Auth.Screen name="Bloqueio" component={Bloqueio} />
=======
         <Auth.Screen name="Bloqueio" component={Bloqueio} />
         <Auth.Screen name="ReservaCliente" component={ReservaCliente} />
         <Auth.Screen name="agendar user" component={AgendamentoCliente} />
         <Auth.Screen name="Reserva mensal" component={ReservaMensal} />
>>>>>>> 8f1dc5ec56f9edce1d740e0a284a68b0545c3439
      </Auth.Navigator>
   );
};

export default AppService;
