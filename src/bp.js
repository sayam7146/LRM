import {
    StyleSheet, Text, View, Button, ImageBackground, Image, TextInput
    , ScrollView, TouchableOpacity, Alert
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import { event } from 'react-native-reanimated';
import DateTimePicker from '@react-native-community/datetimepicker';
import NumericInput from 'react-native-numeric-input'
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
var data = 
    [{ label: 'AM', value: '1' },
                                    { label: 'PM', value: '2' },]
;
var temp=[];
const Home = ({ navigation }) => {
    var date1=new Date();
    var tempdate=[];
    const [date, setdate] = useState([new Date()]);
    const [dateindex,setdateindex]=useState(0);
    const [uppervalues,setuppervalues]=useState([""]);
    const [lowervalues,setlowervalues]=useState([""]);
    const [pulsevalues,setpulsevalues]=useState([""]);
    const [mode, setmode] = useState('date');
    const [show, setshow] = useState(false);
    const [text, settext] = useState('Empty');
    var [count,setcount]=useState(0) ;
    const [time,settimearr]=useState([1]);
    const [list,setlist]=useState([0]
    );
    const [dropdown,setDropdown]=useState(["AM"]);

    const onchange = (event, selectedDate) => {
        const currentDate = selectedDate || date[dateindex];
        setshow(Platform.OS === 'Android');
        tempdate=date;
        tempdate[dateindex]=currentDate;
        setdate(tempdate);
        let tempdate1 = new Date(currentDate);
        let fdate = tempdate1.getDate() + '/' + (tempdate1.getMonth() + 1) + '/' + tempdate1.getFullYear();
        settext(fdate);
    }
    const showmode = (currentmode,index) => {
        
        setshow(true);
        setmode(currentmode);
        setdateindex(index);
        
    }
    const signout = () => {
        global.login = false;
        navigation.navigate('Login')
    }
    const addlist=()=>{

       setcount(++count);
       tempdate=date;
       tempdate.push(new Date());
       var temp1=time;
       temp1.push(1);
       settimearr(temp1);
       temp1=dropdown;
       temp1.push("AM");
       setDropdown(temp1);
        temp=list;
        temp.push(count);
        setlist(temp);
setdate(tempdate);
var tempvalues=uppervalues;
tempvalues.push("");
setuppervalues(tempvalues);
tempvalues=lowervalues;
tempvalues.push("");
setlowervalues(tempvalues);
tempvalues=pulsevalues;
tempvalues.push("");
setpulsevalues(tempvalues);
    }
    const settimeam=(value,item)=>{
        var temp1=dropdown;
        temp1[item]=value;
        setDropdown(temp1);
    }
    const updateuppertext=(text,index)=>{
        var tempvalues=uppervalues;
        tempvalues[index]=text;
        setuppervalues(tempvalues);
        

    }
    const updatelowertext=(text,index)=>{
        var tempvalues=lowervalues;
        tempvalues[index]=text;
        setlowervalues(tempvalues);
        

    }
    const updatepulsetext=(text,index)=>{
        var tempvalues=pulsevalues;
        tempvalues[index]=text;
        setpulsevalues(tempvalues);
        

    }
    const remove=()=>{
        if(count>0)
        {
        var temp1=list;
        var temp2=date;
        var temp3=[];
        var temp4=[];
        var temp5=[];
        var temp6=[];
        var temp7=[];
        tempdate=[];
        temp=[];

        for(let i=0;i<temp1.length-1;i++)
        {   temp.push(temp1[i]);
            tempdate.push(temp2[i]);
            temp3.push(time[i]);
            temp4.push(dropdown[i]);
            temp5.push(uppervalues[i]);
            temp6.push(lowervalues[i]);
            temp7.push(pulsevalues[i]);
        }
        setuppervalues(temp5);
        setlowervalues(temp6);
        setpulsevalues(temp7);
        setdate(tempdate);
                setlist(temp);
        setcount(--count);
        settimearr(temp3);
        setDropdown(temp4);
        }
    }
    const addreport = async() => {
        var flag=true;
         for(let i=0;i<uppervalues.length;i++)
            if(uppervalues[i]==""||lowervalues[i]==""||pulsevalues[i]=="")
                flag=false;
        if(flag==false)
        {
            Alert.alert(
                "Error",
                "Please Fill out all the fields",
                [
                    { text: "OK" }
                ]
            );
        }
        if(flag==true)
        {
            console.log(date+"----------------"+date.length);
            var datetimeforapi=[];
            for(let i=0;i<date.length;i++)
            {
                if(dropdown[i]=="PM")
                {
                    datetimeforapi.push(date[i].getFullYear() + '-' + (date[i].getMonth() + 1) + '-' + date[i].getDate() + "T"+(time[i]+12)+":00:00")
                    
                }
                
                    else
                {
                    if(time[i]==10||time[i]==11||time[i]==12)
                    datetimeforapi.push(date[i].getFullYear() + '-' + (date[i].getMonth() + 1) + '-' + date[i].getDate() + "T"+time[i]+":00:00")
                    else
                    datetimeforapi.push(date[i].getFullYear() + '-' + (date[i].getMonth() + 1) + '-' + date[i].getDate() + "T0"+time[i]+":00:00")

                }
            }
            var body = JSON.stringify(
                {
                    "uppervalues":uppervalues,
                    "lowervalues":lowervalues,
                    "pulsevalues":pulsevalues,
                    "date_time":datetimeforapi,
                    "user_id":global.userid
                }
            )
            console.log(body);
            const response = await fetch('http:/192.168.0.110/LRM/api/user/addbp', {
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
                        { text: "OK" }
                    ]
                );
            }
            
        }
        
    }
    const cancel=()=>{
        
        navigation.navigate("AddReport")
    }
    const settime=(value,index)=>{
        var temp1=time;
        temp1[index]=value;
        settimearr(temp1);
    }
    if (global.login == true) {
        
       useEffect(()=>{
           
       });
        return (

            <View style={styles.container}>
                {/* <Text style={styles.welcometext}>Welcome to LRM</Text> */}
                <View style={styles.topsubcontainerimg}>

                    <Image source={require('../assets/pictures/top.jpg')} style={{ width: "100%", height: "100%", opacity: 0.6 }} />
                    <Image source={require('../assets/pictures/user.png')} style={{ width: "13%", height: "13%", resizeMode: 'stretch', position: 'absolute', marginTop: 120, marginLeft: 243 }} />

                    <Text style={[styles.welcometext, { fontFamily: 'Poppins-SemiBold', marginTop: 125, marginLeft: 280, fontSize: 20 }]}>

                        {global.username}
                    </Text>
                    <Text style={[styles.welcometext, { fontFamily: 'Poppins-SemiBold', marginTop: 10, marginLeft: 160 }]}>LRM</Text>
                </View>
                <View style={styles.bottomsubcontainer}>
                <ScrollView
                        scrollEnabled={true}

                        stickyHeaderIndices={[0]}
                        style={{}}
                        contentContainerStyle={{flexGrow:1 }} >
                            
                        <TouchableOpacity style={[{ backgroundColor: '#68F8DE', marginBottom: 20 }]} >
                            <Text style={[styles.textmenu, { marginLeft: 110 }]}>Blood Pressure</Text>
                            
                                
                            

                            <View style={[styles.inputfields, {
                                flexDirection: 'row',
                                justifyContent: 'space-between',

                                marginLeft: 0,
                                marginTop: 5,
                                margin: 2, width: "100%", height: "80%"
                            }]} >
                                <Text style={[{ backgroundColor: '#68F8DE', fontSize: 20, fontFamily: 'Poppins-Medium', marginLeft: 0, width: "35%" }]}>
                                    Upper Value</Text>
                                <Text style={[{ fontSize: 20, fontFamily: 'Poppins-Medium', width: "35%", paddingRight: 0, marginRight:5}]}>
                                    Lower Value</Text>
                                <Text style={[{ fontSize: 20, fontFamily: 'Poppins-Medium', width: "20%", paddingRight: 0, }]}>
                                    Pulse</Text>

                            </View>

                        </TouchableOpacity>

{list.map((item)=>{
    
return(
    <View key={item}>
    <View
     style={[ {
        flexDirection: 'row',
        marginLeft: 3,
        height:45,
        backgroundColor: '#F9FFFF',
          width: "95%",paddingBottom:10,paddingLeft:10,
    }]} >
        <TextInput keyboardType='numeric' placeholder='Upper Value' style={[{ marginLeft:10,padding:3,backgroundColor: "white",  fontSize: 16, width: "30%",height:"100%" }]}
        onChangeText={newText => updateuppertext(newText, item)
        }
    ></TextInput>
    
    <TextInput keyboardType='numeric' placeholder='Lower Value' style={[{ marginLeft:20,padding:3,backgroundColor: "white",  fontSize: 16, width: "30%",height:"100%" }]}
        onChangeText={newText => updatelowertext(newText, item)
        }
    ></TextInput>
    
    <TextInput keyboardType='numeric' placeholder='Pulse Value' style={[{ marginLeft:20,padding:3,backgroundColor: "white",  fontSize: 16, width: "30%",height:"100%" }]}
        onChangeText={newText => updatepulsetext(newText, item)
        }
    ></TextInput>
</View>
<View
style={[ {
    flexDirection: 'row',
    marginLeft: 25,
    height:45,
    backgroundColor: '#F9FFFF',
      width: "95%",paddingBottom:10,paddingLeft:10,
}]}
>
    
<Text style={[{ padding:5,fontSize: 20, fontFamily: 'Poppins-Medium'}]}>
    {date[item].getDate() + '/' + (date[item].getMonth() + 1) + '/' + date[item].getFullYear()}</Text>
    <TouchableOpacity onPress={() => showmode('date',item)} style={[{ marginLeft: 10,marginRight:10, borderTopLeftRadius: 40, borderBottomRightRadius: 40, flexDirection: 'row', }]} >
                    <Image style={[{}]} source={require('../assets/pictures/calender.png')} />
                </TouchableOpacity>
    
        <NumericInput
        style={[{fontSize: 20, fontFamily: 'Poppins-Medium',  paddingLeft: 50 }]} 
        totalWidth={50} 
        totalHeight={40}
            onChange={value => settime(value,item)} 
            onLimitReached={(isMax,msg) => console.log(isMax,msg)}
            minValue={1}
            maxValue={12}
            type='up-down'
            iconSize={25}
            step={1}
            valueType='real'
              value={time[item]}
            rightButtonBackgroundColor='#EA3788' 
            leftButtonBackgroundColor='#E56B70'/>
    <Dropdown
                                    style={styles.dropdown}
                                    containerStyle={styles.shadow}
                                    data={data}
                                    value={dropdown[item].label}
                                    labelField="label"
                                    valueField="value"
                                    label="Dropdown"
                                    placeholder="AM"
                                    onChange={value => {
                                        settimeam(value.label,item);

                                    }}

                                    textError="Error"
                                />


</View>
<View
  style={{
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  }}
/>
</View>
)
})
}
<View style={{flexDirection:"row",marginLeft:260,width:300,marginTop:10}}>
<TouchableOpacity style={{width:"15%",height:"30%"}} 
                            onPress={()=>remove()}>
                                <Image source={require("../assets/pictures/minus.png")} style={{resizeMode:"stretch",width:40,height:40}}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={{width:"15%",height:"30%"}} 
                            onPress={()=>addlist()}>
                                <Image source={require("../assets/pictures/plus.png")} style={{resizeMode:"stretch",width:40,height:40}}/>
                                </TouchableOpacity>
                                
                                </View> 
                        {
                            show && (
                                <DateTimePicker
                                    testID='datetimepicker'
                                    value={date[dateindex]}
                                    mode={mode}
                                    display='default'
                                    onChange={onchange} />
                            )
                        }
                    
                    <View style={{flexDirection:"row",marginBottom:10,}}>
                        <TouchableOpacity style={[styles.inputfields, {
                            marginTop: 10,
                            borderRadius: 20,
                            width: 160,
                            height: 40,
                            marginLeft: 10,
                            
                            paddingLeft: 65,
                            paddingTop: 8,
                        }
                        ]} onPress={() => addreport()}><Text style={styles.textmenu}>Add </Text></TouchableOpacity>
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
                </ScrollView></View>
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
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        marginLeft:10,
        fontSize:10,
        width: "18%",
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