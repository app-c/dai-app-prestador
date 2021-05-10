import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import AppProvider from './hooks';
import Routes from './routes';



const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar style='dark' hidden={true} />
      <AppProvider>
        <View style={{ flex: 1}} >
            <Routes />
        </View>
      </AppProvider>

    </NavigationContainer>
  )
}

export default App;
