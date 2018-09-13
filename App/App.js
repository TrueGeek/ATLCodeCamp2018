import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import LoadingScreen from './Loading';
import HomeScreen from './Home';
import SignUpScreen from './SignUp';
import SignUpVerificationScreen from './SignUpVerification';
import LogonScreen from './Logon';
import LogonVerificationScreen from './LogonVerification';

const AuthStack = createStackNavigator({
  Logon: LogonScreen,
  LogonVerification: LogonVerificationScreen,
  SignUp: SignUpScreen,
  SignUpVerification: SignUpVerificationScreen,
}, {
  headerMode: 'none',
  initialRouteName: 'Logon'
});

const AppStack = createStackNavigator({
  Home: HomeScreen,
});

export default createSwitchNavigator(
  {
    Loading: LoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Loading',
  }
);
