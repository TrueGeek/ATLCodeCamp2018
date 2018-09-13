import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import Auth from '@aws-amplify/auth';

export default class SignUpVerificationScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: this.props.navigation.state.params.email,
      verificationCode: '',
    };

  }

  handleSubmit = () => {
    
    const {
      email,
      verificationCode,
    } = this.state;

    Auth.confirmSignUp(email.toLowerCase(), verificationCode)
      .then(() => {

        this.props.navigation.navigate('Home');

      })
      .catch(() => {

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
        
        <Text>Sign Up Email Verification</Text>

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
