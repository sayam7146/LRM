import { StyleSheet, Text, View, Button, ImageBackground, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { Dimensions } from 'react-native';


// function Login({ navigation }) {
//     return (
//         <Button
//             title="Signup"
//             onPress={() => navigation.navigate('Signup')} />
//     );
// }


const Login = ({ navigation }) => {
    const [usertext, setuserText] = useState('');
    const [passwordtext, setpasswordsText] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(true);
    const checksignin = async () => {
        console.log("pressed");
        const response = await fetch("http://192.168.0.110/LRM/api/user/checkdoctor?doctorname=" + usertext + "&password=" + passwordtext);

        const stcode = response.status;
        const json = await response.json();
        if (stcode == 200) {
            if (json[1] == 1) {
                console.log("ok")
                global.doctorname = usertext;
                global.login = true;
                global.doctorid = json[0];
                navigation.navigate('doctorhome')
            }
            if (json[1] == 0) {
                Alert.alert(
                    "Error",
                    "Incorrect username or password",
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
            }
        }
        else {
            console.log(response.body);
            alert("unable to connect to server");
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.welcometext}>Welcome to LRM</Text>
            <View style={styles.topsubcontainerimg}>

                <Image source={require('../assets/pictures/top.jpg')} style={{ width: "100%", height: "100%", opacity: 0.6 }} />
                <Image source={require('../assets/pictures/user.png')} style={{ width: "13%", height: "13%", resizeMode: 'stretch', position: 'absolute', marginTop: 210, marginLeft: 30 }} />
                <Text style={[styles.welcometext, { marginTop: 200, marginLeft: 80 }]}>Doctor Login</Text>
            </View>

            <View style={styles.bottomsubcontainer}>
                <TextInput placeholder='Enter Doctor name' style={styles.inputfields}
                    onChangeText={newText => setuserText(newText)}
                    defaultValue={usertext}
                ></TextInput>
                <TextInput secureTextEntry={true} placeholder='Enter password' password={true} style={[styles.inputfields, { marginTop: 120 }]}
                    onChangeText={newText => setpasswordsText(newText)}

                    defaultValue={passwordtext}
                ></TextInput>

                <TouchableOpacity style={styles.button} onPress={() => checksignin()}>
                    <Text style={{ fontSize: 25, color: "#FFFFFF", paddingTop: 10 }} >Login</Text>
                </TouchableOpacity>
                <Text style={styles.text}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('doctorsignup')}>
                    <Text style={[styles.text, { fontSize: 20, fontWeight: 'bold', }]}>Signup</Text>
                </TouchableOpacity>
                <View style={{flexDirection:"row"}}>
                    
                <Text style={styles.text}>User?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={[styles.text, { fontSize: 20, fontWeight: 'bold', }]}>Login</Text>
                </TouchableOpacity>
                </View>
            </View>



        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#16B8AE',
        alignItems: 'center',
        //justifyContent: 'center',
    },
    button: {
        width: "45%",
        height: "12%",
        marginTop: 200,
        backgroundColor: "#16B8AE",
        alignItems: 'center',
        borderRadius: 40,

    },
    text: {
        fontSize: 18,
        marginTop: 20,
    },
    topsubcontainerimg: {
        width: "100%",
        height: "40%",
        borderRadius: 45,
        marginTop: 5,
        overflow: 'hidden',
        position: 'absolute',
    },
    bottomsubcontainer: {
        width: "98%",
        height: "59%",
        backgroundColor: '#F9FFFF',
        borderRadius: 45,
        marginTop: 270,
        overflow: 'hidden',
        position: 'absolute',
        alignItems: 'center',
    },
    inputfields: {
        backgroundColor: '#68F8DE',
        borderRadius: 50,
        position: 'absolute',
        width: "89%",
        height: "14%",
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
export default Login