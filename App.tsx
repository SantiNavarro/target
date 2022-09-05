// import { createAppContainer } from "react-navigation";
// import { createStackNavigator } from "react-navigation-stack";
// import { QueryClient, QueryClientProvider } from "react-query";

// import HomeScreen from "./src/screens/HomeScreen";
// import LoginScreen from "./src/screens/LoginScreen";

// const navigator = createStackNavigator(
//   {
//     Home: HomeScreen,
//     Login: LoginScreen,
//   },
//   {
//     initialRouteName: "Login",
//     defaultNavigationOptions: {
//       title: "Target",
//     },
//   }
// );

// const App = createAppContainer(navigator);
// const queryClient = new QueryClient(); 
// export default (
//   <QueryClientProvider client={queryClient}>
//     <App />
//   </QueryClientProvider>
// );

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from 'react-query'
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';


const queryClient = new QueryClient()

const Stack = createNativeStackNavigator();

const AuthStack = createNativeStackNavigator();

const HomeStack = createNativeStackNavigator();


function Auth() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      {/* <AuthStack.Screen name="Register" component={RegisterScreen} /> */}
    </AuthStack.Navigator>
  )
}

function App() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      {/* <HomeStack.Screen name="Details" component={DetailsScreen} /> */}
    </HomeStack.Navigator>
  )
}

function Root() {
  return (
    <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Auth" component={Auth} />
            <Stack.Screen name="App" component={App} />
          </Stack.Navigator>
        </NavigationContainer>
    </QueryClientProvider>
  );
}

export default Root;