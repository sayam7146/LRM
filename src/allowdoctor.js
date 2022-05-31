import {
    StyleSheet, Text, View, Button, ImageBackground, Image, TextInput
    , ScrollView, TouchableOpacity, Alert
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import { event } from 'react-native-reanimated';
import DateTimePicker from '@react-native-community/datetimepicker';
import { async } from 'validate.js';

import Icon from 'react-native-vector-icons/FontAwesome';

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
    const [dropdown, setDropdown] = useState("");
    const [data,setdata] =useState([]);   
    const [alloweddoctors,setalloweddoctors]=useState([]); 
    const[countlist,setcountlist]=useState([]);
    const signout = () => {
        global.login = false;
        navigation.navigate('Login')
    }
    const allowdoctor=async()=>{
        if(dropdown=="")
        {
            Alert.alert(
                "Error",
                "Select atleast one doctor",
                [
                    { text: "OK" },
                    {text:"cancel"}
                ]
            );   
        }
        else
        {

            const response = await fetch("http://192.168.0.110/LRM/api/user/allowdoctor?userid="+global.userid+"&doctorid="+dropdown );

            const stcode = response.status;
            const json = await response.json();
            
            if (stcode == 200) {
                
            Alert.alert(
                "Success",
                "Doctor Added Successfully",
                [
                    { text: "OK" },
                    {text:"cancel"}
                ]
            );   
            getdoctors();
            getalloweddoctor();
            }
            else {
                alert("unable to connect to server");
            }
        
            
        }
    }
    const getdoctors =async () => {

    const response = await fetch("http://192.168.0.110/LRM/api/user/getdoctors?userid=" + global.userid);

        const stcode = response.status;
        const json = await response.json();
        var tempdoc=[];
        if (stcode == 200) {
            for (let i = 0; i < json["doctorname"].length; i++) {
                console.log(json);
                tempdoc.push({ label: json["doctorname"][i], value: json["doctorid"][i] });

            }
            setdata(tempdoc);
        }
        else {
            //alert("unable to connect to server");
        }
    
        
    }
  
    const getalloweddoctor =async () => {

        const response = await fetch("http://192.168.0.110/LRM/api/user/showalloweddoctor?userid=" + global.userid);
    
            const stcode = response.status;
            const json = await response.json();
            var tempalloweddoc=[];
            var tempcount=[];
            if (stcode == 200) {
                for (let i = 0; i < json["doctorname"].length; i++) {
                    console.log(json);
                    tempalloweddoc.push({ label: json["doctorname"][i], value: json["doctorid"][i] });
                    tempcount.push(i);
                }
                setcountlist(tempcount);
                setalloweddoctors(tempalloweddoc);
            }
            else {
                //alert("unable to connect to server");
            }
        
            
        }
        const deletedoctor=async (index) =>{
        
        
            const response = await fetch('http://192.168.0.110/LRM/api/user/deletealloweddoctor?doctorid='+alloweddoctors[index].value);
                   
            const stcode = response.status;
            const json = await response.json();
            console.log(json);
            if (stcode == 200) {
                    if(json==1)
                    {
                        Alert.alert(
                            "Success",
                            "doctor "+alloweddoctors[index].label+ " deleted",
                            [
                                { text: "OK" },
                                {text:"cancel"}
                            ]
                        );              
                        getdoctors();
                               getalloweddoctor(); 

                    }
                    else
                    {
                        
                        Alert.alert(
                            "Error",
                            "Can't delete doctor "+alloweddoctors[index].label,
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
                    "Can't delete doctor "+alloweddoctors[index].label,
                    [
                        { text: "OK" },
                        {text:"cancel"}
                    ]
                );  
            }
        
    }
    const confirm=(index)=>{
        Alert.alert(
            "Alert",
            "Are you sure you want to delete your Doctor "+alloweddoctors[index].label,
            [
                { text: "OK", onPress: () => deletedoctor(index) },
                {text:"cancel"}
            ]
        );
    }
    if (global.login == true) {
        useEffect(() => {
            const unsubscribe = navigation.addListener('focus', () => {
                // The screen is focused
                // Call any action and update data
                getdoctors();
                getalloweddoctor();
            });

            // Return the function to unsubscribe from the event so it gets removed on unmount
            return unsubscribe;
        }, [navigation]);
 return (

            <View style={styles.container}>
                {/* <Text style={styles.welcometext}>Welcome to LRM</Text> */}
                <View style={styles.topsubcontainerimg}>

                    <Image source={require('../assets/pictures/top.jpg')} style={{ width: "100%", height: "100%", opacity: 0.6 }} />
                    <Image source={require('../assets/pictures/user.png')} style={{ width: "13%", height: "13%", resizeMode: 'stretch', position: 'absolute', marginTop: 130, marginLeft: 245 }} />

                    <Text style={[styles.welcometext, { fontFamily: 'Poppins-SemiBold', marginTop: 135, marginLeft: 280, fontSize: 20 }]}>

                        {global.username}
                    </Text>
                    <TouchableOpacity onPress={()=>navigation.navigate("Home")} style={[styles.welcometext, { marginTop: 125, fontSize: 20 }]}>
                    <Image source={require('../assets/pictures/home.png')} style={{ width: "50%", height: "100%", resizeMode: 'stretch', position: 'absolute' }} />
                    <Text style={[ {marginTop:10, fontFamily: 'Poppins-SemiBold', fontSize: 20 ,marginLeft: 60, }]}>
                        Home
                    </Text>
                    </TouchableOpacity>
                    <Text style={[styles.welcometext, { fontFamily: 'Poppins-SemiBold', marginTop: 10, marginLeft: 160 }]}>LRM</Text>
                </View>

                <ScrollView
                    stickyHeaderIndices={0}
                    style={styles.bottomsubcontainer} contentContainerStyle={{ height: "100%", flexGrow: 1 }}>
                    <View><View style={{flexDirection:"row",width:"100%",height:50}}>
                    <Dropdown
                        style={styles.dropdown}
                        containerStyle={styles.shadow}
                        data={data}
                        search
                        searchPlaceholder="Search"
                        labelField="label"
                        valueField="value"
                        label="Dropdown"
                        placeholder="Doctor"
                        value={dropdown}
                        onChange={item => {
                            setDropdown(item.value);
                        }}
                        textError="Error"
                    />
                    <TouchableOpacity style={[styles.inputfields, {
                        marginTop: 30,
                        borderRadius: 20,
                        marginLeft: 30,
                        paddingTop: 8,
                        height:"100%",width:"40%"
                    }]} onPress={() => allowdoctor()}><Text style={[styles.textmenu,{fontSize:18}]}>Allow Doctor</Text></TouchableOpacity>
                    </View>
                    <View
  style={{
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginTop:40,
  }}
/>
</View>
{countlist.map((item)=>{
    if(alloweddoctors.length==countlist.length)
    {return(
    
                                <View key={item}><TouchableOpacity  >
                                    <View style={{flexDirection:"row",marginBottom:10}} >
                                    <Text style={{fontWeight:'bold', fontSize: 25, fontFamily: 'Poppins-Medium',width:"90%"}}>{alloweddoctors[item].label}</Text>
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
                                )
    }})}
                </ScrollView>
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
        marginLeft: 30,
        width: "40%",
        height: "100%",
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
        height: "65%",
        backgroundColor: '#F9FFFF',
        borderTopLeftRadius:45,
        borderTopLeftRadius:45,
        marginTop: 190,
        overflow: 'hidden',
        position: 'absolute',

    },
    inputfields: {
        backgroundColor: '#68F8DE',

        position: 'relative',
        width: "70%",
        height: "10%",
        fontSize: 20,
        paddingLeft: 20,
        paddingTop: 15,

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