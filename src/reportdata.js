import {
    StyleSheet, Text, View, Button, ImageBackground, Image, TextInput
    , ScrollView, TouchableOpacity, Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
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
var temp2=[];
var temp3 = [];
const Home = ({ navigation }) => {

    const [fvalues, setfvalues] = useState(new Array(10));
    const [attributes, setattributes] = useState([]);
    const [values, setvalues] = useState([]);
    const[minvalue,setminvalues]=useState([]);
    
    const[maxvalue,setmaxvalue]=useState([]);
    const [units,setunits]=useState([]);
    const [show, setshow] = useState([0]);

    const signout = () => {
        global.lab = "";
        global.test = "";
        setattributes([]);
        setvalues([]);
        setunits([]);
        temp = [];
        temp1 = [];
        temp3 = [];
        global.login = false;
        navigation.navigate('Login')
    }


    const cancel = () => {
        setattributes([]);
        setvalues([]);
        setunits([]);
        temp = [];
        temp1 = [];
        temp3 = [];
        global.userreportid="";
        global.test="";
        global.lab="";
        navigation.navigate('labreports');
    }

    const showattribute = async () => {

        const response = await fetch("http://192.168.0.110/LRM/api/user/getattributesofreport?userreportid=" + global.userreportid);

        const stcode = response.status;
        const json = await response.json();
        if (stcode == 200) {
            const response1 = await fetch("http://192.168.0.110/LRM/api/user/getvaluesofreport?userreportid=" + global.userreportid);

            const stcode1 = response1.status;
            const json1 = await response1.json();
            
            const response2 = await fetch("http://192.168.0.110/LRM/api/user/getunitsofreport?labname="+global.lab+"&testname="+global.test);

            const stcode2 = response2.status;
            const json2 = await response2.json();
            var tempmin=[];
            var tempmax=[];
            for (let i = 0; i < json.length; i++) {
                temp3.push(i);
                //    data.push(<TouchableOpacity style={[styles.inputfields,{marginTop:20,marginLeft:10,height:"6%",}]} ><Text style={[styles.textmenu,{marginLeft:60}]}>
                //     {json[i]}</Text></TouchableOpacity>);

                temp.push({ label: json[i], value: i + 1 });
                if (stcode1 == 200) {
                    temp1.push({ label: json1[i], value: i + 1 })
                }

                else { alert("unable to connect to server" + stcode) }
                if(stcode2==200)
                {
                    temp2.push({ label: json2["unitnames"][i], value: i + 1 })
                    tempmin.push({ label: json2["minvalue"][i], value: i + 1 })
                    tempmax.push({ label: json2["maxvalue"][i], value: i + 1 })
                }
                else { alert("unable to connect to server" + stcode) }
            }


            setshow(temp3);
            setattributes(temp);
            setvalues(temp1);
            setunits(temp2);
            setminvalues(tempmin);
            setmaxvalue(tempmax);
        }
        else {
            alert("unable to connect to server" + stcode);
        }
    };
   const on=()=>{
    console.log(attributes[0].label);
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
                           
                        <TouchableOpacity style={[{ backgroundColor: '#68F8DE', marginBottom: 20 }]} onPress={()=>on()}>
                        <View style={{flexDirection:"row",marginBottom:10,}}>
                        <TouchableOpacity style={[styles.inputfields, {
                            marginTop: 10,
                            width: 40,
                            height: 40,
                            marginLeft: 15,
                        }

                        ]} onPress={() => cancel()} ><Icon name="arrow-left" size={30} color="#F9FFFF" /></TouchableOpacity>
                    <Text style={[styles.textmenu, { marginLeft: 90 }]}>{global.test}</Text>
                    </View> 
                            <View style={[styles.inputfields, {
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginLeft: 3,
                                marginTop: 5,
                                margin: 2, width: "100%", height: "40%"
                            }]} >
                                <Text style={[{ backgroundColor: '#68F8DE', fontSize: 20, fontFamily: 'Poppins-Medium', marginLeft: 15, width: "45%" }]}>
                                    Date:{global.reportdate}</Text>
                                <Text style={[{ backgroundColor: '#68F8DE', fontSize: 20, fontFamily: 'Poppins-Medium', marginLeft: 15, width: "40%" }]}>
                                    Lab:{global.lab}</Text>
                            </View>

                            <View style={[styles.inputfields, {
                                flexDirection: 'row',
                                justifyContent: 'space-between',

                                marginLeft: 0,
                                marginTop: 5,
                                margin: 2, width: "100%", height: "25%"
                            }]} >
                                <Text style={[{ backgroundColor: '#68F8DE', fontSize: 20, fontFamily: 'Poppins-Medium', marginLeft: 15, width: "40%" }]}>
                                    Attributes</Text>
                                <Text style={[{ fontSize: 20, fontFamily: 'Poppins-Medium', width: "35%", paddingRight: 50, }]}>
                                    Value</Text>
                                <Text style={[{ fontSize: 20, fontFamily: 'Poppins-Medium', width: "30%", paddingRight: 50, }]}>
                                    Unit</Text>

                            </View>

                        </TouchableOpacity>



                       {
                        show.map((item)=>{ 
                            if(minvalue.length>0&maxvalue.length>0&attributes.length>0&values.length>0&units.length>0)
                            { 
                               return(
                                   <View key={item}>
                                <View
                                 style={[ {
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
            
                                    marginLeft: 3,
                                    marginTop: 5,
                                    backgroundColor: '#F9FFFF',
                                     height: 30, width: 380
                                }]} >
                                <Text style={[{ paddingTop:10,height:50,backgroundColor: '#68F8DE', fontSize: 20, fontFamily: 'Poppins-Medium', marginLeft: 15, width: "40%" }]}>
                                    {attributes[item].label}</Text>
                                <Text style={[{color:(values[item].label>=minvalue[item].label&&values[item].label<=maxvalue[item].label)?"#030303":"#fb2604", fontSize: 20, fontFamily: 'Poppins-Medium', width: "25%", paddingRight: 50, }]}>
                                    {values[item].label}</Text>
                                
                                    <Text style={[{ fontSize: 20, fontFamily: 'Poppins-Medium', width: "35%", paddingRight: 50, }]}>
                                    {units[item].label}</Text>
            
                            </View>
                            <View flexDirection="row" marginLeft={170}>
                            <Text style={[{ fontSize: 12, fontFamily: 'Poppins-Medium', color:"#b5b9b3" }]}>
                                    {minvalue[item].label}-</Text>
                                    <Text style={[{ fontSize: 12, fontFamily: 'Poppins-Medium',color:"#b5b9b3"}]}>
                                    {maxvalue[item].label}</Text>
                                    </View>
                            </View>
                               )
                            }

                        })}
                         
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