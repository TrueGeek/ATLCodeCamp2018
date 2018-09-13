import React, {Component} from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import Amplify from '@aws-amplify/core';
import { Auth } from 'aws-amplify';

export default class LogonScreen extends Component {

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

    Auth.signIn(email.toLowerCase(), password)
      .then((response) => {
        
        if (response.challengeName === 'SMS_MFA') {
        
          this.props.navigation.navigate(
            'LogonVerification',
            { user: response },
          );
        
        } else {
          
          this.props.navigation.navigate('App');
        
        }   
        
      })
      .catch(() => {
        alert('nope - not the right password');
      })
        
  }

  goToSignUp = () => {
    this.props.navigation.navigate('SignUp');
  }

  render() {

    const {
      email,
      password,
    } = this.state;

    return (
      <View style={styles.container}>

        <Text>Logon</Text>

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
            title="sign up for an account here"
            onPress={this.goToSignUp}
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
