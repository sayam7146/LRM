import { StyleSheet, Text, View, Button, ImageBackground, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';

import { ReloadInstructions } from 'react-native/Libraries/NewAppScreen';


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
    const signout = () => {
        global.login = false;
        navigation.navigate('doctorlogin')
    }

    if (global.login == true) {
        return (

            <View style={styles.container}>
                {/* <Text style={styles.welcometext}>Welcome to LRM</Text> */}
                <View style={styles.topsubcontainerimg}>

                    <Image source={require('../assets/pictures/top.jpg')} style={{ width: "100%", height: "100%", opacity: 0.6 }} />
                    <Image source={require('../assets/pictures/user.png')} style={{ width: "13%", height: "13%", resizeMode: 'stretch', position: 'absolute', marginTop: 120, marginLeft: 245 }} />
<TouchableOpacity onPress={()=>navigation.navigate("doctorhome")} style={[styles.welcometext, { marginTop: 125, fontSize: 20 }]}>
                    <Image source={require('../assets/pictures/home.png')} style={{ width: "50%", height: "100%", resizeMode: 'stretch', position: 'absolute' }} />
                    <Text style={[ {marginTop:10, fontFamily: 'Poppins-SemiBold', fontSize: 20 ,marginLeft: 60, }]}>
                        Home
                    </Text>
                    </TouchableOpacity>
                    <Text style={[styles.welcometext, { fontFamily: 'Poppins-SemiBold', marginTop: 125, marginLeft: 280, fontSize: 20 }]}>

                        {global.doctorname}
                    </Text>
                    <Text style={[styles.welcometext, { fontFamily: 'Poppins-SemiBold', marginTop: 10, marginLeft: 160 }]}>LRM</Text>
                </View>

                <View style={styles.bottomsubcontainer}>
                    <View style={{width:"100%",height:"10%", backgroundColor: '#68F8DE',justifyContent:'center',flexDirection:'row',alignItems:'center'}} >
                    <Text style={styles.textmenu}>{global.username}</Text>
                    </View>
                    <View style={{height:"90%"}}>
                    <Image source={require('../assets/pictures/Addreport.png')} style={{ width: "18%", height: "11%", marginLeft: 20, marginTop: 45, resizeMode: 'stretch' }} />
                    <TouchableOpacity style={[styles.inputfields,{height:"14%"}]} onPress={() => navigation.navigate('userlabreports')}><Text style={[styles.textmenu]}>Lab Reports</Text></TouchableOpacity>
                    <Image source={require('../assets/pictures/bp.png')} style={{ width: "15%", height: "11%", marginLeft: 25, marginTop: 60, resizeMode: 'stretch' }} />
                    <TouchableOpacity style={[styles.inputfields, { marginTop: 150,height:"14%" }]} onPress={() => navigation.navigate('doctorshowbp')}><Text style={styles.textmenu}>BP</Text></TouchableOpacity>
                    <Image source={require('../assets/pictures/sugar.png')} style={{ width: "15%", height: "10%", marginLeft: 25, marginTop: 66, resizeMode: 'stretch' }} />
                    <TouchableOpacity style={[styles.inputfields, { marginTop: 260,height:"14%" }]} onPress={() => navigation.navigate('doctorshowsugar')}><Text style={styles.textmenu}>Sugar</Text></TouchableOpacity>
                    
                    </View>
                </View>
                <TouchableOpacity style={[styles.text,{marginTop:650}]} onPress={() => signout()}>
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
        marginTop: 450,
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
        height: "65%",
        backgroundColor: '#F9FFFF',
        borderTopLeftRadius:45,
        borderTopRightRadius:45,
        marginTop: 190,
        overflow: 'hidden',
        position: 'absolute',
    },
    inputfields: {
        backgroundColor: '#68F8DE',
        borderBottomRightRadius: 45,
        borderTopRightRadius: 45,
        position: 'absolute',
        width: "70%",
        height: "10%",
        fontSize: 20,
        marginTop: 40,
        paddingLeft: 20,
        paddingTop: 15,
        marginLeft: 100,

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