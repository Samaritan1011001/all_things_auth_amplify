import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {Auth} from 'aws-amplify';
import * as RootNavigation from './RootNavigation';

export default class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      isLoading: false,
    };
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };
  signIn = async () => {
    if (this.state.username === '' && this.state.password === '') {
      Alert.alert('Enter details to signin!');
    } else {
      this.setState({
        isLoading: true,
      });
      const signInParams = {
        username: this.state.username,
        password: this.state.password,
      };
      try {
        const user = await Auth.signIn(signInParams);
        // await Auth.setPreferredMFA(user, 'SMS');

        this.setState({
          isLoading: false,
        });
      } catch (error) {
        console.log('error signing in', error);
        this.setState({
          isLoading: false,
        });
      }
    }
  };
  amazonSignIn = async ()=>{
    try {
        await Auth.federatedSignIn({provider: 'LoginWithAmazon' })
        
      } catch (error) {
        console.log('error signing in', error);
        
      }
  }

  forgotPassword = async () =>{
    try {
      if (this.state.username === '') {
        Alert.alert('Enter username first');
      } else {
      await Auth.forgotPassword(this.state.username)
      RootNavigation.navigate('ForgotPassword')
      }
    } catch (error) {
      console.log('error reseting password', error);
      
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputStyle}
          placeholder="Username"
          value={this.state.username}
          onChangeText={val => this.updateInputVal(val, 'username')}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          value={this.state.password}
          onChangeText={val => this.updateInputVal(val, 'password')}
          maxLength={15}
          secureTextEntry={true}
        />
        <Button color="#3740FE" title="Signin" onPress={() => this.signIn()} />

        <Button color="#3740FE" title="Sign In with Amazon" onPress={() => this.amazonSignIn()} />

        <Text
          style={styles.SignInText}
          onPress={() => this.forgotPassword()}>
          Forgot Password?
        </Text>

        <Text
          style={styles.SignInText}
          onPress={() => RootNavigation.navigate('SignUp')}>
          Don't have account? Click here to signup
        </Text>
      
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 35,
    backgroundColor: '#fff',
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: 'center',
    borderColor: '#ccc',
    borderBottomWidth: 1,
  },
  SignInText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
