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

export default class ChangePassword extends Component {
  constructor() {
    super();
    this.state = {
      oldPassword: '',
      newPassword: '',
      isLoading: false,
    };
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };
  confirmSignUp = async () => {
    if (this.state.newPassword === '' && this.state.oldPassword === '') {
      Alert.alert('Enter details to confirm signup!');
    } else {
      this.setState({
        isLoading: true,
      });

      try {
          const user = await Auth.currentAuthenticatedUser();
        await Auth.changePassword(user, this.state.oldPassword, this.state.newPassword);
        this.setState({
          isLoading: false,
        });
        RootNavigation.navigate('SignIn');
      } catch (error) {
        console.log('error confirming user:', error);
        Alert.alert(error);

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
          placeholder="Old Password"
          value={this.state.oldPassword}
          onChangeText={val => this.updateInputVal(val, 'oldPassword')}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="New Password"
          value={this.state.newPassword}
          onChangeText={val => this.updateInputVal(val, 'newPassword')}
        />

        <Button
          color="#3740FE"
          title="Confirm"
          onPress={() => this.confirmSignUp()}
        />
        <Text
          style={styles.loginText}
          onPress={() => RootNavigation.navigate('SignIn')}>
          Go back to login?
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
