import React, {Component} from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import Amplify from '@aws-amplify/core';
import { Auth } from 'aws-amplify';

export default class LoadingScreen extends Component {

  async componentDidMount() {

    Amplify.configure({
      Auth: {
        region: 'us-east-1',
        userPoolId: 'us-east-1_XXXXXXXXX',
        userPoolWebClientId: 'XXXXXXXXXXXXXXXXXXXXXXXXX',
      },
    });
    
    const user = await Auth.currentAuthenticatedUser()
      .catch(() => {});

    if (user === undefined) {
      this.props.navigation.navigate('Auth');
    } else {
      this.props.navigation.navigate('App');
    }

  }

  render() {

    return (
      <View style={styles.container}>
        
        <Text style={styles.loadingText}>loading . . .</Text>

        <ActivityIndicator />

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
  loadingText: {
    padding: 40,
  },  
});
