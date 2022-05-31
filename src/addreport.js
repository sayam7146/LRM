import {
    StyleSheet, Text, View, Button, ImageBackground, Image, TextInput
    , ScrollView, TouchableOpacity, Alert
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import { event } from 'react-native-reanimated';
import DateTimePicker from '@react-native-community/datetimepicker';


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
var data = [
    { label: 'Lab Reports', value: '1' },
    { label: 'Blood Pressure', value: '2' },
    { label: 'Sugar', value: '3' },

];
var data1 = [];
var data2 = [];
const Home = ({ navigation }) => {
    const [dropdown, setDropdown] = useState();
    const [dropdown1, setDropdown1] = useState();
    const [dropdown2, setDropdown2] = useState();
    const [date, setdate] = useState(new Date());
    const [mode, setmode] = useState('date');
    const [show, setshow] = useState(false);
    const [text, settext] = useState('Empty');
    const onchange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setshow(Platform.OS === 'Android');
        setdate(currentDate);
        let tempdate = new Date(currentDate);
        let fdate = tempdate.getDate() + '/' + (tempdate.getMonth() + 1) + '/' + tempdate.getFullYear();
        settext(fdate);
        global.date = currentDate;
        console.log(fdate);
    }
    const showmode = (currentmode) => {
        setshow(true);
        setmode(currentmode);

    }
    const signout = () => {
        global.login = false;
        navigation.navigate('Login')
    }
    const check = () => {



    }
    const clearlist2 = () => {
        data2 = [];
    }
    const clearlist1 = () => {
        data1 = [];
    }
    async function showlabnames() {
        if (data1.length != 0) { data1 = []; global.lab = ""; }
        const response = await fetch("http://192.168.0.110/LRM/api/user/getlabs");

        const stcode = response.status;
        const json = await response.json();
        if (stcode == 200) {

            for (let i = 0; i < json.length; i++) {
                data1.push({ label: json[i], value: i + 1 });


            }

        }
        else {
            //alert("unable to connect to server");
        }
        console.log(data1);
    }
    const addreport = () => {
        if(dropdown == "2")
        {
           navigation.navigate("BP");
        }
        else if(dropdown=="3")
        {
            navigation.navigate("Sugar");
        }
        else if(dropdown=="1")
        {if (global.lab == "" || global.test == "")
        Alert.alert(
            "Error",
            "PLease Select Lab and Test  ",

            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );
    else {
        global.date = date;
        
        navigation.navigate('AddReportManually');
    }}
        
    }
    async function showtest() {
        if (data2.length != 0) {
            data2 = [];
            global.test = "";
        }
        const response = await fetch("http://192.168.0.110/LRM/api/user/gettestnames?labname=" + global.lab);

        const stcode = response.status;
        const json = await response.json();
        if (stcode == 200) {
            for (let i = 0; i < json.length; i++) {
                console.log(json[i]);
                data2.push({ label: json[i], value: i + 1 });


            }

        }
        else {
            //alert("unable to connect to server");
        }

    }
    const setlab = (lab, value) => {
        setDropdown1(value);
        global.lab = lab;
    }
    const settest = (test, value) => {
        setDropdown2(value);
        global.test = test;
    }

    if (global.login == true) {
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

                    style={styles.bottomsubcontainer} contentContainerStyle={{ height: "100%", flexGrow: 1 }}>
                    <TouchableOpacity style={[styles.inputfields, { marginLeft: 60, borderTopLeftRadius: 40, borderBottomRightRadius: 40 }]} onPress={() => navigation.navigate('AddReport')}><Text style={[styles.textmenu, { marginLeft: 40 }]}>Add new Report</Text></TouchableOpacity>

                        {
                            show && (
                                <DateTimePicker
                                    testID='datetimepicker'
                                    value={date}
                                    mode={mode}
                                    display='default'
                                    onChange={onchange} />
                            )
                        }
                    <Dropdown
                        style={styles.dropdown}
                        containerStyle={styles.shadow}
                        data={data}
                        search
                        searchPlaceholder="Search"
                        labelField="label"
                        valueField="value"
                        label="Dropdown"
                        placeholder="Select Report"
                        value={dropdown}
                        onChange={item => {
                            setDropdown(item.value);

                            showlabnames();
                        }}
                        textError="Error"
                    />
                    {(() => {
                        if (dropdown == "1") {
                            return (
                                <View style={[{ marginTop: 10, marginLeft: 60, borderTopLeftRadius: 40, borderBottomRightRadius: 40, flexDirection: 'row', }]} >
                                    <Text style={[styles.textmenu, { marginLeft: 40, marginTop: 10 }]}>
                                        Date:{date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()}
                                    </Text>
                                    <TouchableOpacity onPress={() => showmode('date')} style={[{ marginLeft: 10, borderTopLeftRadius: 40, borderBottomRightRadius: 40, flexDirection: 'row', }]} >
                                        <Image style={[{}]} source={require('../assets/pictures/calender.png')} />
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                    })()}
                    {(() => {
                        if (dropdown == "1") {

                            return (
                                <Dropdown
                                    style={styles.dropdown}
                                    containerStyle={styles.shadow}
                                    data={data1}
                                    value={dropdown1}
                                    search
                                    searchPlaceholder="Search"
                                    labelField="label"
                                    valueField="value"
                                    label="Dropdown"
                                    placeholder="Select Lab"
                                    onChange={item => {
                                        setlab(item.label, item.value);
                                        showtest();
                                    }}

                                    textError="Error"
                                />

                            )
                        }

                        return null;
                    })()}
                    {(() => {
                        if (dropdown == "1") {

                            return (
                                <Dropdown
                                    style={styles.dropdown}
                                    containerStyle={styles.shadow}
                                    data={data2}
                                    search
                                    value={dropdown2}
                                    searchPlaceholder="Search"
                                    labelField="label"
                                    valueField="value"
                                    label="Dropdown"
                                    placeholder="Select Test"
                                    onChange={item => {
                                        settest(item.label, item.value);

                                    }}

                                    textError="Error"
                                />

                            )
                        }
                        return null;
                    })()}
                    <TouchableOpacity style={[styles.inputfields, {
                        marginTop: 30,
                        borderRadius: 20,
                        marginLeft: 60,
                        paddingLeft: 80,
                        paddingTop: 8,
                    }]} onPress={() => addreport()}><Text style={styles.textmenu}>Add Manully</Text></TouchableOpacity>
                </ScrollView>
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
        height: "65%",
        backgroundColor: '#F9FFFF',
        borderTopRightRadius:45,
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