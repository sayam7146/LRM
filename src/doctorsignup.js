import { Alert, ScrollView, StyleSheet, Text, View, Button, ImageBackground, Image, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { useState } from 'react'
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'

// import RadioGroup from 'react-native-radio-buttons-group';

// function Login({ navigation }) {
//     return (
//         <Button
//             title="Signup"
//             onPress={() => navigation.navigate('Signup')} />
//     );
// }
function checkemail(email) {

    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!filter.test(email)) {
        alert('Please provide a valid email address');
        email.focus;
        return false;
    }
    else
        return true;
}

function Signup({ navigation }) {

    const [usertext, setuserText] = useState('');
    const [passwordtext, setpasswordText] = useState('');
    const [passwordchtext, setpasswordchText] = useState('');
    const [emailtext, setemailText] = useState('');
    const [agetext, setageText] = useState('');
    const [checked, setChecked] = React.useState('F');

    const checksignup = async () => {
        if (usertext == "" || passwordtext == "" || passwordchtext == "" || agetext == "")
            alert('Please Fill out all the fields');
        else if (passwordtext != passwordchtext)
            alert('Passwords does not match')
        else if (checkemail(emailtext)) {
            const response = await fetch('http://192.168.0.110/LRM/api/user/insertdoctor', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    doctor_name: usertext,
                    gender: checked,
                    email: emailtext,
                    age: agetext,
                    doctor_passwd: passwordtext
                })
            });
            const stcode = response.status;
            const json = await response.json();
            if (stcode == 200) {
                if (json != null) {
                    Alert.alert(
                        "Congrats  ",
                        json+"",
                        [
                            { text: "OK", onPress: () => console.log("OK Pressed") }
                        ]
                    );
                }
                else {
                    Alert.alert(
                        "Error",
                        "registration failed",
                        [
                            { text: "OK", onPress: () => console.log("OK Pressed") }
                        ]
                    );
                }
            }

            else {
                alert("unable to connect to server");
            }
        }

    };

    return (

        <View style={styles.container}>
            {/* <Text style={styles.welcometext}>Welcome to LRM</Text> */}
            <View style={styles.topsubcontainerimg}>

                <Image source={require('../assets/pictures/top.jpg')} style={{ width: "100%", height: "100%", opacity: 0.6 }} />
                <Image source={require('../assets/pictures/user.png')} style={{ width: "13%", height: "13%", resizeMode: 'stretch', position: 'absolute', marginTop: 20, marginLeft: 30 }} />
                <Text style={[styles.welcometext, { fontFamily: 'Poppins-SemiBold', marginTop: 12, marginLeft: 80 ,fontSize:35}]}>Doctor Signup</Text>
            </View>

            <ScrollView style={styles.bottomsubcontainer}
                contentContainerStyle={{ flexGrow: 1, alignItems: 'center', }}>
                <TextInput placeholder='Enter Doctor name' style={styles.inputfields}
                    onChangeText={newText => setuserText(newText)}
                    defaultValue={usertext}></TextInput>
                <TextInput placeholder='Enter your Email' password={true} style={[styles.inputfields, { marginTop: 120 }]}
                    onChangeText={newText => setemailText(newText)}
                    defaultValue={emailtext}></TextInput>
                <TextInput secureTextEntry={true} placeholder='Enter password' password={true} style={[styles.inputfields, { marginTop: 210 }]}
                    onChangeText={newText => setpasswordText(newText)}
                    defaultValue={passwordtext}></TextInput>
                <TextInput secureTextEntry={true} placeholder='Confirm password' password={true} style={[styles.inputfields, { marginTop: 300 }]}
                    onChangeText={newText => setpasswordchText(newText)}
                    defaultValue={passwordchtext}></TextInput>
                <TextInput placeholder='Enter Age' keyboardType='numeric' password={true} style={[styles.inputfields, { marginTop: 390 }]}
                    onChangeText={newText => setageText(newText)}
                    defaultValue={agetext}></TextInput>
                <Text style={[styles.welcometext, { position: 'absolute', marginTop: 470, paddingRight: 220, fontSize: 30 }]}>Gender</Text>

                <TouchableOpacity style={styles.radiobuttons}>

                    {/* <RadioGroup 
                radioButtons={radioButtons} 
                onPress={onPressRadioButton} 
                layout='row'
                
                /> */}
                    <RadioGroup
                        size={24}
                        thickness={2}
                        color='#9575b2'
                        selectedIndex={1}
                        style={{ flexDirection: "row" }}
                        onSelect={(index, value) => setChecked(value)}
                    >
                        <RadioButton value={'M'}
                        >
                            <Text>Male</Text>
                        </RadioButton>
                        <RadioButton value={'F'} >
                            <Text>Female</Text>
                        </RadioButton>
                    </RadioGroup>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => checksignup()}>
                    <Text style={{ fontSize: 25, color: "#FFFFFF", paddingTop: 10 }}>Signup</Text>
                </TouchableOpacity>
                <Text style={styles.text}>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('doctorlogin')}>
                    <Text style={[styles.text, { fontSize: 20, fontWeight: 'bold', }]}>Login</Text>
                </TouchableOpacity>
                
                <View style={{flexDirection:"row",paddingBottom:20,}}>
                    
                <Text style={styles.text}>User?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                    <Text style={[styles.text, { fontSize: 20, fontWeight: 'bold', }]}>Signup</Text>
                </TouchableOpacity>
                </View>
            </ScrollView>

        </View>

    );
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
        fontSize: 18,
        marginTop: 3,
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
        height: "83%",
        backgroundColor: '#F9FFFF',
        borderRadius: 45,
        marginTop: 110,
        overflow: 'hidden',
        position: 'absolute',
        
    },
    inputfields: {
        backgroundColor: '#68F8DE',
        borderRadius: 50,
        position: 'absolute',
        width: "89%",
        height: "10%",
        fontSize: 20,
        marginTop: 30,
        paddingLeft: 10,
    },
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
export default Signup