import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import Auth from '@aws-amplify/auth';

export default class LogonVerificationScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: this.props.navigation.state.params.user,
      username: this.props.navigation.state.params.user.username,
      phone_number: this.props.navigation.state.params.user.challengeParam.CODE_DELIVERY_DESTINATION,
      verificationCode: '',
    };

  }

  handleSubmit = () => {
    
    const {
      user,
      verificationCode,
    } = this.state;

    Auth.confirmSignIn(user, verificationCode, 'SMS_MFA')
      .then((result) => {

        this.props.navigation.navigate('App');

      })
      .catch((error) => {

        alert('That was not the correct code.');

      });

  }

  render() {

    const {
      email,
      verificationCode,
    } = this.state;

    return (
      <View style={styles.container}>
        
        <Text>Logon Verification</Text>

        <TextInput
          style={styles.textInput}
          value={verificationCode}
          autoCapitalize='none'
          placeholder="   verification code"
          onChangeText={(text) => this.setState({ verificationCode: text })}
        />

        <Button 
          title="Submit"
          onPress={this.handleSubmit}
        />

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
});
