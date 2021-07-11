import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DashBoard from "../pages/DashBoard";
import Profile from "../pages/Profile";
import Agenda from "../pages/Agenda";
import Serviço from "../pages/Serviço";
import UpdateService from "../pages/UpadeService";
import Bloqueio from "../pages/Bloqueio";

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
            <Drawer.Screen name="Bloqueio" component={Bloqueio} />
            {/* <Drawer.Screen name='Reserva de horários' component={Reserva} /> */}
         </Drawer.Navigator>
         {/* <Auth.Navigator tabBarOptions={{activeTintColor: '#37144b', adaptive: true}}
         >
            <Auth.Screen 
               name='DashBoard' 
               component={DashBoard}  
               options={{
                  tabBarIcon: (({size, color}) => (
                     <MaterialIcons 
                     name='bookmark-border'
                     size={size}
                     color={color}
                  />
                  )),
                  
               }}
            />
            <Auth.Screen name='Agenda' component={Agenda}  options={{
                  tabBarIcon: (({size, color}) => (
                     <MaterialIcons 
                     name='calendar-today'
                     size={size}
                     color={color}
                  />
                  )),
                  
               }} />
            <Auth.Screen name='Serviço' component={Serviço}  options={{
                  tabBarIcon: (({size, color}) => (
                     <MaterialIcons 
                     name='create'
                     size={size}
                     color={color}
                  />
                  )),
                  
               }} />
            <Auth.Screen name='Profile' component={Profile}  options={{
                  tabBarIcon: (({size, color}) => (
                     <MaterialIcons 
                     name='face'
                     size={size}
                     color={color}
                  />
                  )),
                  
               }} />
            <Auth.Screen name='Atualizar' component={UpdateService}  options={{
                  tabBarIcon: (({size, color}) => (
                     <MaterialIcons 
                     name='face'
                     size={size}
                     color={color}
                  />
                  )),
                  
               }} />

            <Auth.Screen name='Bloqueio' component={Bloqueio}  options={{
                  tabBarIcon: (({size, color}) => (
                     <MaterialIcons 
                     name='face'
                     size={size}
                     color={color}
                  />
                  )),
                  
               }} />
         </Auth.Navigator> */}
      </>
   );
};

export default AppRoutes;
