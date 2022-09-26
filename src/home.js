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

export default class Home extends Component {
  render() {
    async function signOut() {
      try {
        await Auth.signOut();
      } catch (error) {
        console.log('error signing out: ', error);
      }
    }
    return (
      <View style={styles.container}>
        <Button
          color="#3740FE"
          title="Get current authenticated user info"
          onPress={() => {
            Auth.currentAuthenticatedUser()
              .then(user => console.log(user))
              .catch(err => console.log(err));
          }}
        />

        <Button color="#3740FE" title="Sign Out" onPress={signOut} />
        <Button color="#3740FE" title="Change Password" onPress={()=>{
                RootNavigation.navigate('ChangePassword');

        }} />

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
