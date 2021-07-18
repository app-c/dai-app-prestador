import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import * as Updates from "expo-updates";
import AppLoading from "expo-app-loading";
import AppProvider from "./hooks";
import Routes from "./routes";
import { Fonts } from "./pages/utils";

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
