/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';

import Signup from './src/signUpScreen';
import {Hub} from 'aws-amplify';
import SignIn from './src/signInScreen';
import ConfirmSignUp from './src/confirmSignUp';
import Home from './src/home';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from './src/RootNavigation';
import * as RootNavigation from './src/RootNavigation';
import ConfirmSignIn from './src/confirmSignIn';
import ChangePassword from './src/changePassword';
import ForgotPassword from './src/forgotPassword';

const Stack = createNativeStackNavigator();
Hub.listen('auth', data => {
  switch (data.payload.event) {
    case 'signUp':
      console.log('user signed up');
      RootNavigation.navigate('ConfirmSignUp');
      break;
    case 'signIn':
      console.log('user signed in');
      RootNavigation.navigate('Home');
      // RootNavigation.navigate('ConfirmSignIn');
      break;
    case 'cognitoHostedUI':
      console.log('user signed in with hosted UI');
      RootNavigation.navigate('Home');
      break;
    case 'cognitoHostedUI_failure':
      console.log("hosted ui failed")  
    break;
    case 'signOut':
      console.log('user signed out');
      RootNavigation.navigate('SignIn');
      break;
    case 'signIn_failure':
      console.log('user sign in failed');
      break;
    case 'configured':
      console.log('the Auth module is configured');
      RootNavigation.navigate('SignIn');
  }
});


const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ConfirmSignIn" component={ConfirmSignIn} />
        <Stack.Screen name="SignUp" component={Signup} />
        <Stack.Screen name="ConfirmSignUp" component={ConfirmSignUp} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
