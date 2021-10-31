import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { Mail } from "../components/Listas/Mails";
import Agenda from "../pages/Agenda";
import DashBoard from "../pages/DashBoard";
import { Message } from "../pages/Message";
import Profile from "../pages/Profile";
import Serviço from "../pages/Serviço";
import UpdateService from "../pages/UpadeService";
import AppService from "./AppServices.routes";

const Drawer = createDrawerNavigator();

const AppRoutes: React.FC = () => {
   return (
      <>
         <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={DashBoard} />
            <Drawer.Screen name="Agenda" component={Agenda} />
            <Drawer.Screen name="Profile" component={Profile} />
            <Drawer.Screen name="Serviço" component={Serviço} />
            <Drawer.Screen name="Atualizar serviço" component={UpdateService} />
            <Drawer.Screen name="Reserva de horários" component={AppService} />
            <Drawer.Screen name="message" component={Message} />
         </Drawer.Navigator>
      </>
   );
};

export default AppRoutes;
