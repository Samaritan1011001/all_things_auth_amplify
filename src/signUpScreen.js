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

export default class Signup extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      phone:'',
      isLoading: false,
    };
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };
  signUp = async () => {
    if (
      this.state.email === '' &&
      this.state.password === '' &&
      this.state.username === ''
    ) {
      Alert.alert('Enter details to signup!');
    } else {
      this.setState({
        isLoading: true,
      });

      const signUpParams = {
        username: this.state.username,
        password: this.state.password,
        attributes: {
          email: this.state.email,
          phone_number: this.state.phone
        },
      };
      try {
        const {user} = await Auth.signUp(signUpParams);

        console.log(user);
        this.setState({
          isLoading: false,
        });
      } catch (error) {
        console.log('error signing up:', error);

        this.setState({
          isLoading: false,
        });
      }
    }
  };
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
          placeholder="Email"
          value={this.state.email}
          onChangeText={val => this.updateInputVal(val, 'email')}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          value={this.state.password}
          onChangeText={val => this.updateInputVal(val, 'password')}
          maxLength={15}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Phone Number"
          value={this.state.phone}
          onChangeText={val => this.updateInputVal(val, 'phone')}
          maxLength={15}
        />
        <Button color="#3740FE" title="Signup" onPress={() => this.signUp()} />
        <Text
          style={styles.loginText}
          onPress={() => RootNavigation.navigate('SignIn')}>
          Already Registered? Click here to login
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
  loginText: {
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
