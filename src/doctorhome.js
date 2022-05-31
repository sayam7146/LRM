import {
    StyleSheet, Text, View, Button, ImageBackground, Image, TextInput
    , ScrollView, TouchableOpacity, Alert
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import { white } from 'react-native-paper/lib/typescript/styles/colors';

import Icon from 'react-native-vector-icons/FontAwesome';
import { DateTimePicker } from '@react-native-community/datetimepicker';
import { async } from 'validate.js';

// function Login({ navigation }) {
//     return (
//         <Button
//             title="Signup"
//             onPress={() => navigation.navigate('Signup')} />
//     );
// }
// const radioButtonsData = [{
//     id: '1', // acts as primary key, should be unique and non-empty string
//     label: 'Male',
//     value: 'male'
// }, {
//     id: '2',
//     label: 'Female',
//     value: 'female'
// }]
const Home = ({ navigation }) => {

    const [userid,setuserid]=useState([]);
    const [username,setusername]=useState([]);
    const [countlist,setcountlist]=useState([]);
    const signout = () => {
        
        global.login = false;
        navigation.navigate('doctorlogin')
    }


    const cancel = () => {
        
        navigation.navigate('previousreports')
    }
    const showuserreport=(index)=>{
        global.userid=userid[index];
        global.username=username[index];
        // global.userreportid=userreportsid[index];
        // global.lab=labnames[index];
        // global.test=testnames[index];
        // global.reportdate=dates[index];
        navigation.navigate("userpreviousreport");
    }
    const confirm=(index)=>{
        Alert.alert(
            "Alert",
            "Are you sure you want to delete your patient "+username[index],
            [
                { text: "OK", onPress: () => deleteuser(index) },
                {text:"cancel"}
            ]
        );
    }
    const deleteuser=async (index) =>{
        
        
            const response = await fetch('http://192.168.0.110/LRM/api/user/deletealloweduser?userid='+userid[index]);
                   
            const stcode = response.status;
            const json = await response.json();
            console.log(json);
            if (stcode == 200) {
                    if(json==1)
                    {
                        Alert.alert(
                            "Success",
                            "Patient "+username[index]+ " deleted",
                            [
                                { text: "OK" },
                                {text:"cancel"}
                            ]
                        );              
                               showusers(); 

                    }
                    else
                    {
                        
                        Alert.alert(
                            "Error",
                            "Can't delete Patient "+username[index]+ "deleted",
                            [
                                { text: "OK" },
                                {text:"cancel"}
                            ]
                        );              
                    }
            }
            else
            {
                Alert.alert(
                    "Error"+json,
                    "Can't delete Patient "+username[index]+ "deleted",
                    [
                        { text: "OK" },
                        {text:"cancel"}
                    ]
                );  
            }
        
    }
    const showusers = async () => {
        console.log(global.doctorid);
            const response = await fetch('http://192.168.0.110/LRM/api/user/showusers?doctorid='+global.doctorid);
                   
                const stcode = response.status;
                const json = await response.json();
                if (stcode == 200) {

                    var tempuserid=json["usersid"];
                    var tempusername=json["usersname"];
                    setuserid(tempuserid);
                    setusername(tempusername);
                    var i=0;
                    var tempcount=[];
                    tempuserid.forEach(a => {
                        tempcount.push(i);
                        i++;
                    });
                    setcountlist(tempcount);
                }
                else
                {
                    console.log(json);
                Alert.alert(
                    "Error",
                    response.body,
                    [
                        { text: "OK", onPress: () => console.log("eroor in calling api") }
                    ]
                );
                }
                

            

        }
       
    if (global.login == true) {
        useEffect(() => {
            const unsubscribe = navigation.addListener('focus', () => {
                // The screen is focused
                // Call any action and update data
                 showusers();   
            });

            // Return the function to unsubscribe from the event so it gets removed on unmount
            return unsubscribe;
        }, [navigation]);
        return (

            <View style={styles.container}>
                {/* <Text style={styles.welcometext}>Welcome to LRM</Text> */}
                <View style={styles.topsubcontainerimg} >

                    <Image source={require('../assets/pictures/top.jpg')} style={{ width: "100%", height: "100%", opacity: 0.6 }} />
                    <Image source={require('../assets/pictures/user.png')} style={{ width: "13%", height: "13%", resizeMode: 'stretch', position: 'absolute', marginTop: 60, marginLeft: 220 }} />

                    <Text style={[styles.welcometext, { fontFamily: 'Poppins-SemiBold', marginTop: 65, marginLeft: 270, fontSize: 20 }]}>

                        {global.doctorname}
                    </Text>

                    <Text style={[styles.welcometext, { fontFamily: 'Poppins-SemiBold', marginTop: 10, marginLeft: 160 }]}>LRM</Text>
                </View>
                <View style={[styles.bottomsubcontainer]}>
                    <ScrollView
                        scrollEnabled={true}

                        stickyHeaderIndices={[0]}
                        contentContainerStyle={{}} >
                        <TouchableOpacity style={[{ backgroundColor: '#68F8DE' }]} >
                            <Text style={[styles.textmenu, { marginLeft: 135,fontSize:25 }]}>Patients</Text>

                                
                        </TouchableOpacity>
                        {countlist.map((item)=>{return(
                                <View key={item}><TouchableOpacity onPress={()=>showuserreport(item)} >
                                    <View style={{flexDirection:"row",marginBottom:10}} >
                                    <Text style={{fontWeight:'bold', fontSize: 25, fontFamily: 'Poppins-Medium',width:"90%"}}>{username[item]}</Text>
                                    <TouchableOpacity style={[ {
                                        
                            height: 40,
                            
                        }

                        ]} onPress={() => confirm(item)} ><Icon name="close" size={30} color="#f72e03" /></TouchableOpacity>
                   
                                    </View>
                                
                                </TouchableOpacity>
                                <View
  style={{
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  }}
/>
                                </View>
                                )})}
 
                    </ScrollView>
                </View>

                <TouchableOpacity style={[styles.text,{marginTop:660}]} onPress={() => signout()}>
                    <Text style={{ fontSize: 22, fontFamily: 'Poppins-Medium', }}>Signout</Text>
                </TouchableOpacity>

            </View>


        );
    }
    else {
        return (
            <View>
                {Alert.alert(
                    "Warning",
                    "You are not signed in ",
                    [
                        {
                            text: "ok",
                            onPress: () => signout(),
                            style: "ok"
                        },
                    ]
                )
                }
            </View>
        );
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#16B8AE',
        alignItems: 'center',
        //justifyContent: 'center',
    },

    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    dropdown: {
        backgroundColor: '#68F8DE',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        marginTop: 30,
        borderRadius: 20,
        marginLeft: 60,
        width: "70%",
        height: "10%",
        position: 'relative',
    },
    radiobuttons: {
        marginTop: 520,
        position: 'absolute',

    },
    button: {
        width: "45%",
        height: "8%",
        marginTop: 570,
        backgroundColor: "#16B8AE",
        alignItems: 'center',
        borderRadius: 40,

    },
    text: {
        position: 'absolute',
        marginTop: 640,
        marginLeft: 150,

    },
    topsubcontainerimg: {
        width: "100%",
        height: "45%",
        borderRadius: 45,
        marginTop: 15,
        overflow: 'hidden',
        position: 'absolute',
    },
    bottomsubcontainer: {
        width: "98%",
        height: "76%",
        backgroundColor: '#F9FFFF',
        borderRadius: 45,
        marginTop: 120,
        position: 'absolute',
        overflow: 'hidden',


    },
    inputfields: {
        backgroundColor: '#68F8DE',

        position: 'relative',
        width: "70%",
        height: "10%",


    },
    textmenu: { fontSize: 20, fontFamily: 'Poppins-Medium', },
    welcometext: {

        fontSize: 40,
        position: 'absolute',
        color: '#000000',
        position: 'absolute',
        marginTop: 60,
        fontFamily: 'Poppins-Medium',
        zIndex: 2,
    },
});
export default Home