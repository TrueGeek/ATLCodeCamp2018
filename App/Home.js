import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import { Auth } from 'aws-amplify';

export default class HomeScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      phone_number: '',
      MFA: '',
    };    

  }

  async componentWillMount() {

    const user = await Auth.currentAuthenticatedUser();

    const phone_number = user.attributes.phone_number === undefined ?  '' : user.attributes.phone_number;

    this.setState({
      email: user.attributes.email,
      phone_number: phone_number,
      MFA: user.preferredMFA,
    });

  }

  turnOnMFA = async () => {
    
    let user = await Auth.currentAuthenticatedUser();

    
    await Auth.updateUserAttributes(user, {
      'phone_number': this.state.phone_number,
    });

    Auth.setPreferredMFA(user, 'SMS')
      .then(result => {
        alert('MFA is now on');
      })
      .catch(error => {
        console.debug('turn on mfa error', error);
      });

  }

  turnOffMFA = async () => {
    let user = await Auth.currentAuthenticatedUser();
    Auth.setPreferredMFA(user, 'NOMFA')
      .then(result => {
        alert('MFA is now off');
      })
      .catch(error => {
        console.debug('turn off mfa error', error);
      });    
  }

  logOff = async () => {
    await Auth.signOut();
    this.props.navigation.navigate('Auth');
  }  

  render() {

    const {
      email,
      phone_number,
      MFA,
    } = this.state;

    return (
      <View style={styles.container}>
        
      <Text>Welcome {email}!</Text>

      <Image 
        source={{uri: 'https://loremflickr.com/320/240/puppy,cute/all'}}
        style={{width: 320, height: 240}} />

        <TextInput
          style={styles.textInput}
          keyboardType={"number-pad"}
          value={phone_number}
          placeholder="   phone number (+16785551212)"
          onChangeText={(text) => this.setState({ phone_number: text })}
        />          

        <Button title="Turn On MFA" onPress={this.turnOnMFA} />

        <Button title="Turn Off MFA" onPress={this.turnOffMFA} />

        <Button title="Log Off" onPress={this.logOff} />

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
