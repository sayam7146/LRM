/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import login from './src/login'
import signup from './src/signup'
import home from './src/home'
import addreport from './src/addreport'
import addmanuallreport from './src/addmanuallreport'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import sugar from './src/sugar';
import bp from './src/bp';
import prevoiusreports from './src/previousreports'
import labreports from './src/labreports'
import reportdata from './src/reportdata'
import doctorhome from './src/doctorhome'
import doctorsignup from './src/doctorsignup'
import doctorlogin from './src/doctorlogin'
import userpreviousreport from './src/userpreviousreport'
import userlabreports from './src/userlabreports'
import userlabreportdata from './src/userlabreportdata'
import allowdoctor from './src/allowdoctor'
import showbp from './src/showbp'
import showsugar from './src/showsugar'
import doctorshowbp from './src/doctorshowbp'
import doctorshowsugar from './src/doctorshowsugar'
const Stack = createNativeStackNavigator();
global.login = false;
global.userid = 0;
global.lab = "";
global.test = "";
global.reportdate="";
global.date = new Date();
global.list=[];
global.userreportid=0;
global.date1=new Date();

const App = () => {
  // let [fontsLoaded] = useFonts({
  //   'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
  //   'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
  //   'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
  // });

  return (
    <NavigationContainer>
      {
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}>
            
          <Stack.Screen
            name="Login"
            component={login}
            options={{ title: 'Login' }}
          />
          
          <Stack.Screen name="Home"
            component={home} op
            tions={{ title: 'Home' }} />
          <Stack.Screen name="Signup"
            component={signup} op
            tions={{ title: 'Signup' }} />
         

<Stack.Screen name="AddReport"
            component={addreport} op
            tions={{ title: 'AddReport' }} />
          <Stack.Screen name="AddReportManually"
            component={addmanuallreport} op
            tions={{ title: 'AddReportManually' }} />
          <Stack.Screen name="Sugar"
            component={sugar} op
            tions={{ title: 'Sugar' }} />
          <Stack.Screen name="BP"
            component={bp} op
            tions={{ title: 'BP' }} />
          <Stack.Screen name="previousreports"
            component={prevoiusreports} op
            tions={{ title: 'previousreports' }} />
<Stack.Screen name="allowdoctor"
            component={allowdoctor} op
            tions={{ title: 'allowdoctor' }} />
<Stack.Screen name="showbp"
            component={showbp} op
            tions={{ title: 'showbp' }} />
<Stack.Screen name="showsugar"
            component={showsugar} op
            tions={{ title: 'showsugar' }} />

<Stack.Screen name="doctorlogin"
            component={doctorlogin} op
            tions={{ title: 'doctorlogin' }} />

<Stack.Screen name="doctorhome"
            component={doctorhome} op
            tions={{ title: 'doctorhome' }} />

<Stack.Screen name="doctorsignup"
            component={doctorsignup} op
            tions={{ title: 'doctorsignup' }} />

<Stack.Screen name="userpreviousreport"
            component={userpreviousreport} op
            tions={{ title: 'userpreviousreport' }} />

<Stack.Screen name="userlabreports"
            component={userlabreports} op
            tions={{ title: 'userlabreports' }} />


<Stack.Screen name="userlabreportdata"
            component={userlabreportdata} op
            tions={{ title: 'userlabreportdata' }} />

<Stack.Screen name="labreports"
            component={labreports} op
            tions={{ title: 'labreports' }} />

<Stack.Screen name="reportdata"
            component={reportdata} op
            tions={{ title: 'reportdata' }} />


<Stack.Screen name="doctorshowbp"
            component={doctorshowbp} op
            tions={{ title: 'doctorshowbp' }} />


<Stack.Screen name="doctorshowsugar"
            component={doctorshowsugar} op
            tions={{ title: 'doctoshowsugar' }} />



        </Stack.Navigator>
      }
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default App;
