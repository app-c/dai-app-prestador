/* eslint-disable react/style-prop-object */
import "react-native-gesture-handler";

import React, { useEffect } from "react";
import { View } from "react-native";

import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import * as Updates from "expo-updates";

import { NavigationContainer } from "@react-navigation/native";

import AppProvider from "./hooks";
import { Fonts } from "./pages/utils";
import Routes from "./routes";

const App: React.FC = () => {
   // useEffect(() => {
   //    async function updateApp() {
   //       const { isAvailable } = await Updates.checkForUpdateAsync();
   //       if (isAvailable) {
   //          await Updates.fetchUpdateAsync();
   //          await Updates.reloadAsync(); // depende da sua estratégia
   //       }
   //    }
   //    updateApp();
   // }, []);

   const fonstsLoadd = Fonts();
   if (!fonstsLoadd) {
      return <AppLoading />;
   }

   return (
      <NavigationContainer>
         <StatusBar style="dark" hidden />
         <AppProvider>
            <View style={{ flex: 1 }}>
               <Routes />
            </View>
         </AppProvider>
      </NavigationContainer>
   );
};

export default App;
