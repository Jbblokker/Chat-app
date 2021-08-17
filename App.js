import React, { Component } from 'react';
import { View, Text, StyleSheet  } from 'react-native';
//import { StyleSheetProperties, View, Text, TextInput, Button, Alert } from 'react-native';
//import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import react native gesture handler
import 'react-native-gesture-handler';
//import the screens 
import Start from './components/Start';
import Chat from './components/Chat';
// create the navigator
const Stack = createStackNavigator();
 
export default class App extends React.Component { 
  
  
  render() {
    return (
        
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Start"
          >
            <Stack.Screen
              name="Chat-app"
              component={Start}
            />
            <Stack.Screen
              name="Chat"
              component={Chat}
            />

          </Stack.Navigator>
        </NavigationContainer>
      
    );
  }
}