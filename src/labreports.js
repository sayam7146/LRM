import {
    StyleSheet, Text, View, Button, ImageBackground, Image, TextInput
    , ScrollView, TouchableOpacity, Alert
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import { white } from 'react-native-paper/lib/typescript/styles/colors';

import Icon from 'react-native-vector-icons/FontAwesome';
import { DateTimePicker } from '@react-native-community/datetimepicker';

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

    const [testnames,settestname]=useState([]);
    const [labnames,setlabnames]=useState([]);
    const [dates,setdates]=useState([]);
    const [userreportsid,setuserreportsid]=useState([]);
    const [countlist,setcountlist]=useState([]);
    const signout = () => {
        
        global.login = false;
        navigation.navigate('Login')
    }


    const cancel = () => {
        
        navigation.navigate('previousreports')
    }
    const showreport=(index)=>{
        global.userreportid=userreportsid[index];
        global.lab=labnames[index];
        global.test=testnames[index];
        global.reportdate=dates[index];
        navigation.navigate("reportdata");
    }
    const showreports = async () => {
        
            const response = await fetch('http:/192.168.0.110/LRM/api/user/viewreport?userid='+global.userid);
                   
                const stcode = response.status;
                const json = await response.json();
                if (stcode == 200) {

                    var temptestname=json["testnames"];
                    var templabnames=json["labnames"];
                    var tempdates=[];
                    var tempuserreportid=json["userreportid"];
                    settestname(temptestname);
                    setlabnames(templabnames);
                    setuserreportsid(tempuserreportid);
                    var i=0;
                    var tempcount=[];
                    tempuserreportid.forEach(a => {
                        tempdates.push(json["dates"][i].substring(10,0));
                        tempcount.push(i);
                        i++;
                    });
                    setdates(tempdates);
                    setcountlist(tempcount);
                }
                else
                {
                    console.log(response.body);
                Alert.alert(
                    "Error",
                    response.body,
                    [
                        { text: "OK", onPress: () => cancel() }
                    ]
                );
                }
                

            

        }
       
    if (global.login == true) {
        useEffect(() => {
            const unsubscribe = navigation.addListener('focus', () => {
                // The screen is focused
                // Call any action and update data
                 showreports();   
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

                        {global.username}
                    </Text>

                    <Text style={[styles.welcometext, { fontFamily: 'Poppins-SemiBold', marginTop: 10, marginLeft: 160 }]}>LRM</Text>
                </View>
                <View style={[styles.bottomsubcontainer]}>
                    <ScrollView
                        scrollEnabled={true}

                        stickyHeaderIndices={[0]}
                        contentContainerStyle={{}} >
                        <TouchableOpacity style={[{ backgroundColor: '#68F8DE', marginBottom: 20 }]} >
                            <View style={[styles.inputfields, {
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginLeft: 3,
                                marginTop: 5,
                                margin: 2, width: "100%", height: "60%"
                            }]} >
                                     <TouchableOpacity style={[styles.inputfields, {
                            
                            width: 40,
                            height: 40,
                            marginLeft: 15,
                        }

                        ]} onPress={() => cancel()} ><Icon name="arrow-left" size={30} color="#F9FFFF" /></TouchableOpacity>
                   
                                <Text style={[{ backgroundColor: '#68F8DE', fontSize: 20, fontFamily: 'Poppins-Medium', marginRight:130 }]}>
                                    Lab Reports</Text>
                                </View>

                                
                        </TouchableOpacity>
                        {countlist.map((item)=>{return(
                                <View key={item}><TouchableOpacity onPress={()=>showreport(item)} >
                                    <View style={{flexDirection:"row",marginBottom:10,}}>
                                    <Text style={{fontWeight:'bold', fontSize: 22, width:"65%",fontFamily: 'Poppins-Medium'}}>{testnames[item]}</Text>
                                    <Text style={{ fontSize: 20, fontFamily: 'Poppins-Medium'}}>{dates[item]}</Text>
                                    
                                    </View>
                                    <Text style={{ fontSize: 20, fontFamily: 'Poppins-Medium'}}>{labnames[item]}</Text>
                                
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

                <TouchableOpacity style={[styles.text,{marginTop:730}]} onPress={() => signout()}>
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
        borderTopRightRadius:45,
        borderTopLeftRadius:45,
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