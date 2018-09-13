import React, {Component} from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import Amplify from '@aws-amplify/core';
import { Auth } from 'aws-amplify';

export default class SignUpScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

  }

  handleSubmit = () => {

    const {
      email,
      password,
    } = this.state;

    Auth.signUp(email.toLowerCase(), password)
      .then(() => {
        
        this.props.navigation.navigate('SignUpVerification', { email });

      })
      .catch(() => {
        alert('something went wrong');
      })
    
  }

  goToLogon = () => {
    this.props.navigation.navigate('Logon');
  }

  render() {

    const {
      email,
      password,
    } = this.state;

    return (
      <View style={styles.container}>

        <Text>Sign Up</Text>

        <TextInput
          style={styles.textInput}
          value={email}
          autoCapitalize='none'
          placeholder="    email"
          onChangeText={(text) => this.setState({ email: text})}
        />

        <TextInput
          style={styles.textInput}
          value={password}
          secureTextEntry
          placeholder="    password"
          onChangeText={(text) => this.setState({ password: text})}
        />        

        <Button
          title="Submit"
          onPress={this.handleSubmit}
        />

        <View style={styles.logonButton}>
          <Button
            title="logon to an account here"
            onPress={this.goToLogon}
          />          
        </View>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '95%',
    margin: 10,
  },
  socialLogonButtons: {
    paddingTop: 100,
  },
  socialLogonButtonsTextHeader: {
    textAlign: 'center',
  }, 
  logonButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
  },
});
