import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React, { Component }from 'react';
import LandingScreen from './components/auth/LandingScreen';
import Register from './components/auth/Register';
import { initializeApp } from '@react-native-firebase/app';
import { View, Text } from 'react-native';
import auth from '@react-native-firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBpJ71Rfv_AwYQDSqI9po0KUumcXiRp9So",
  authDomain: "bookchew-6810c.firebaseapp.com",
  projectId: "bookchew-6810c",
  storageBucket: "bookchew-6810c.appspot.com",
  messagingSenderId: "996897445405",
  appId: "1:996897445405:web:98ae5eedc93204649fd8f4",
  measurementId: "G-P1XG4DM93R"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


const Stack = createStackNavigator();




export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
    }
  }

  componentDidMount(){
   auth().onAuthStateChanged((user) => {
      if (!user){
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else this.setState({
        loggedIn: true,
        loaded: true,
      })
    })
  }

  render() {
    const { loggedIn, loaded} = this.state;
    if (!loaded){
      return( 
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text> Loading</Text>
        </View>
      )
    }

    if (!loggedIn) {
    return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer> 
    );
  }
  return( 
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text> User is logged</Text>
    </View>
  )
}
}


export default App




