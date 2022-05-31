import {
    StyleSheet, Text, View, Button, ImageBackground, Image, TextInput
    , ScrollView, TouchableOpacity, Alert
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import { white } from 'react-native-paper/lib/typescript/styles/colors';

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

var temp = [];
var temp1 = [];
var temp3 = [];

const Home = ({ navigation }) => {

    var values;
    const [fvalues, setfvalues] = useState([]);
    const [data, setdata] = useState([]);
    const [data1, setdata1] = useState([]);
    const [minvalues,setminvalues]=useState([]);
    const [maxvalues,setmaxvalues]=useState([]);
    const [show, setshow] = useState([]);

    const signout = () => {
        global.lab = "";
        global.test = "";
        setdata([]);
        setdata1([]);
        setshow([]);
        setminvalues([]);
        setmaxvalues([]);
        temp = [];
        temp1 = [];
        temp3 = [];
        global.login = false;
        navigation.navigate('Login')
    }


    const cancel = () => {
        setdata([]);
        setdata1([]);
        setshow([]);
        
        setminvalues([]);
        setmaxvalues([]);
        temp = [];
        temp1 = [];
        temp3 = [];
        navigation.navigate('AddReport')
    }

    const showattribute = async () => {

        const response = await fetch("http://192.168.0.110/LRM/api/user/getattributes?test=" + global.test);

        const stcode = response.status;
        const json = await response.json();
        
        const response1 = await fetch("http://192.168.0.110/LRM/api/user/getunitsofreport?labname=" + global.lab+"&testname="+global.test);

        const stcode1 = response1.status;
        const json1 = await response1.json();
        var tempmin=[];
        var tempmax=[];
        console.log(json1["minvalue"][0]);
        console.log(json1["unitnames"][0]);
        console.log(json1["minvalue"][0]);
        if (stcode == 200) {
            var t = new Array(json.length);

            for (let i = 0; i < json.length; i++) {

                //    data.push(<TouchableOpacity style={[styles.inputfields,{marginTop:20,marginLeft:10,height:"6%",}]} ><Text style={[styles.textmenu,{marginLeft:60}]}>
                //     {json[i]}</Text></TouchableOpacity>);

                t[i] = 0;
                temp.push({ label: json[i], value: i + 1 });
                if (stcode1 == 200) {
                    temp1.push({ label: json1["unitnames"][i], value: i + 1 })
                    tempmin.push({ label: json1["minvalue"][i], value: i + 1 })
                    tempmax.push({ label: json1["maxvalue"][i], value: i + 1 })
                }
                else { alert("unable to connect to server" + stcode) }
            }

            values = t;
            setfvalues(values);
            for (let i = 0; i < temp.length; i++) {
                temp3.push(
                    <View 
                    key={i}>
                    <View style={[ {
                            flexDirection: 'row',
                            justifyContent: 'space-between',

                            marginLeft: 3,
                            marginTop: 5,
                            backgroundColor: '#F9FFFF',
                            margin: 2, height: 50, width: 380
                        }]} >
                        <Text style={[{ textAlignVertical:'center',height:40,backgroundColor: '#68F8DE', fontSize: 20, fontFamily: 'Poppins-Medium', marginLeft: 10, width: "40%" }]}>
                            {temp[i].label}</Text>
                        <Text style={[{ fontSize: 18, fontFamily: 'Poppins-Medium', width: "30%", paddingRight: 50, }]}>
                            {temp1[i].label}</Text>
                        <TextInput keyboardType='numeric' placeholder='Value' style={[{backgroundColor: "white", marginRight: 0, fontSize: 20, width: "30%" }]}
                            onChangeText={newText => updatetext(newText, i)
                            }
                        ></TextInput>

                    </View>
                    
                    <View flexDirection="row" marginLeft={300} >
                            <Text style={[{ fontSize: 12, fontFamily: 'Poppins-Medium', color:"#b5b9b3" }]}>
                                    {tempmin[i].label}-</Text>
                                    <Text style={[{ fontSize: 12, fontFamily: 'Poppins-Medium',color:"#b5b9b3"}]}>
                                    {tempmax[i].label}</Text>
                                    </View>
                    </View>

                )

            }

            setshow(temp3);
            setdata1(temp);
            setdata(temp1);
            setminvalues(tempmin);
            setmaxvalues(tempmax);
        }
        else {
            alert("unable to connect to server" + stcode);
        }
    };
    function updatetext(text, index) {
        values[index] = text;
        setfvalues(values);

    }
    const addreport = async () => {
        var f = true;
        for (let i = 0; i < fvalues.length; i++) {
            if (fvalues[i] == "" || fvalues[i] == undefined)
                f = false;
        }
        if (f) {
            const responsetest = await fetch("http://192.168.0.110/LRM/api/user/testid?testname=" + global.test);
            
            const stcodetest = responsetest.status;
            const jsontest = await responsetest.json();
            const responselab = await fetch("http://192.168.0.110/LRM/api/user/labid?labname=" + global.lab);

            const stcodelab = responselab.status;
            const jsonlab = await responselab.json();
            if (stcodelab == 200 & stcodetest == 200) {
                var attributelist = [];
                for (let i = 0; i < data1.length; i++)
                    attributelist.push(data1[i].label);

                var body = JSON.stringify(
                    {

                        "report": {
                            "date": global.date.getFullYear() + '-' + (global.date.getMonth() + 1) + '-' + global.date.getDate() + "T00:00:00",
                            "u_id": global.userid,
                            "test_id": jsontest[0],
                            "lab_id": jsonlab[0]
                        },
                        "values": fvalues,
                        "attributes": attributelist
                    }
                )
                console.log(body);
                const response = await fetch('http:/192.168.0.110/LRM/api/user/addreport', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: body,
                });
                const stcode = response.status;
                const json = await response.json();
                if (stcode == 200) {
                    console.log("added");
                    Alert.alert(
                        "Success",
                        "Report Added",
                        [
                            { text: "OK", onPress: () => cancel() }
                        ]
                    );
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

        }
        else
            Alert.alert(
                "Error",
                "Please fill out all the values",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );

    }
    if (global.login == true) {
        useEffect(() => {
            const unsubscribe = navigation.addListener('focus', () => {
                // The screen is focused
                // Call any action and update data
                showattribute();
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
                            <Text style={[styles.textmenu, { marginLeft: 150 }]}>{global.test}</Text>
                            <View style={[styles.inputfields, {
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginLeft: 3,
                                marginTop: 5,
                                margin: 2, width: "100%", height: "40%"
                            }]} >
                                <Text style={[{ backgroundColor: '#68F8DE', fontSize: 20, fontFamily: 'Poppins-Medium', marginLeft: 15, width: "40%" }]}>
                                    Date:{global.date.getDate() + '/' + (global.date.getMonth() + 1) + '/' + global.date.getFullYear()}</Text>
                                <Text style={[{ backgroundColor: '#68F8DE', fontSize: 20, fontFamily: 'Poppins-Medium', marginLeft: 15, width: "40%" }]}>
                                    Lab:{global.lab}</Text>
                            </View>

                            <View style={[styles.inputfields, {
                                flexDirection: 'row',
                                justifyContent: 'space-between',

                                marginLeft: 0,
                                marginTop: 5,
                                margin: 2, width: "100%", height: "40%"
                            }]} >
                                <Text style={[{ backgroundColor: '#68F8DE', fontSize: 20, fontFamily: 'Poppins-Medium', marginLeft: 15, width: "40%" }]}>
                                    Attributes</Text>
                                <Text style={[{ fontSize: 20, fontFamily: 'Poppins-Medium', width: "30%", paddingRight: 50, }]}>
                                    Unit</Text>
                                <Text style={[{ fontSize: 20, fontFamily: 'Poppins-Medium', width: "35%", paddingRight: 50, }]}>
                                    Value</Text>

                            </View>

                        </TouchableOpacity>



                        {show}
                        <View style={{flexDirection:"row",marginBottom:10,}}>
                        <TouchableOpacity style={[styles.inputfields, {
                            marginTop: 10,
                            borderRadius: 20,
                            width: 160,
                            height: 40,
                            marginLeft: 10,
                            
                            paddingLeft: 28,
                            paddingTop: 8,
                        }
                        ]} onPress={() => addreport()}><Text style={styles.textmenu}>Add Report</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.inputfields, {
                            marginTop: 10,
                            borderRadius: 20,
                            width: 160,
                            height: 40,
                            marginLeft: 15,
                            paddingLeft: 45,
                            paddingTop: 8,
                        }

                        ]} onPress={() => cancel()} ><Text style={styles.textmenu}>Cancel</Text></TouchableOpacity>
                    </View>
                    </ScrollView>
                </View>

                <TouchableOpacity style={[styles.text,{marginTop:659}]} onPress={() => signout()}>
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