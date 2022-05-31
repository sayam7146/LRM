import {
    StyleSheet, Text, View, Button, ImageBackground, Image, TextInput
    , ScrollView, TouchableOpacity, Alert
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import { white } from 'react-native-paper/lib/typescript/styles/colors';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit"
import Icon from 'react-native-vector-icons/FontAwesome';
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
const Bp = ({ navigation }) => {

    const [uppervalue,setuppervalue]=useState([]);
    const [lowervalue,setlowervalue]=useState([]);
    const [dates,setdates]=useState([]);
    const [pulse,setpulse]=useState([]);
    const [time,settime]=useState([]);
    const [countlist,setcountlist]=useState([]);
    const[graph,setgraph]=useState(0);
    
    const [fromdate, setfromdate] = useState(new Date());
    const [todate, settodate] = useState(new Date());
    const [mode, setmode] = useState('date');
    const [show, setshow] = useState(false);
    const [dateindex,setdateindex]=useState('to');
    const signout = () => {
        
        global.login = false;
        navigation.navigate('Login')
    }

    const onchange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setshow(Platform.OS === 'Android');
        if(dateindex=='from')
        setfromdate(currentDate);
        if(dateindex=='to')
        settodate(currentDate);
        let tempdate = new Date(currentDate);
        let fdate = tempdate.getDate() + '/' + (tempdate.getMonth() + 1) + '/' + tempdate.getFullYear();
        
        console.log(fdate);
    }
    const showmode = (currentmode,index) => {
        setshow(true);
        setmode(currentmode);
        setdateindex(index);
        console.log(show+mode+dateindex);
    }
    const cancel = () => {
        
        navigation.navigate('previousreports')
    }
   
    const showreports = async () => {
        
            const response = await fetch('http:/192.168.0.110/LRM/api/user/getbp?userid='+global.userid);
                   
                const stcode = response.status;
                const json = await response.json();
                if (stcode == 200) {

                    var tempuppervalue=json["uppervalue"];
                    var templowervalue=json["lowervalue"];
                    var tempdates=[];
                    var temptime=[];
                    var temppulserate=json["pulse"];
                    setuppervalue(tempuppervalue);
                    setlowervalue(templowervalue);
                    setpulse(temppulserate);
                    var i=0;
                    var tempcount=[];
                    tempuppervalue.forEach(a => {
                        tempdates.push(json["date"][i].substring(10,0));
                        temptime.push(json["date"][i].substring(13,11))
                        tempcount.push(i);
                        i++;
                    });
                    setdates(tempdates);
                    settime(temptime);
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
                 console.log(graph);
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
                                margin: 2, width: "100%", height: "30%"
                            }]} >
                                     <TouchableOpacity style={[styles.inputfields, {
                            
                            width: 40,
                            height: 40,
                            marginLeft: 15,
                        }

                        ]} onPress={() => cancel()} ><Icon name="arrow-left" size={30} color="#F9FFFF" /></TouchableOpacity>
                   
                                <Text style={[{ backgroundColor: '#68F8DE', fontSize: 20, fontFamily: 'Poppins-Medium', marginRight:0 }]}>
                                   Blood Pressure</Text>
                                
                                <TouchableOpacity style={[styles.inputfields, {
                            
                            width: 30,
                            height: 40,
                            marginLeft: 0,
                        }

                        ]} onPress={() => setgraph(0)} ><Icon name="list" size={30} color="#F9FFFF" /></TouchableOpacity>
                                <TouchableOpacity style={[styles.inputfields, {
                            
                            width: 40,
                            height: 40,
                            marginLeft: 0,
                            marginRight:20,
                        }

                        ]} onPress={() =>setgraph(1)} ><Icon name="line-chart" size={30} color="#F9FFFF" /></TouchableOpacity>
                        
                        </View>    
                       
                        <View style={[{  marginLeft: 5, borderTopLeftRadius: 40, borderBottomRightRadius: 40, flexDirection: 'row', }]} >
                                    <Text style={[styles.textmenu, { marginLeft: 0, marginTop: 10 }]}>
                                        From:{fromdate.getDate() + '/' + (fromdate.getMonth() + 1) + '/' + fromdate.getFullYear()}
                                    </Text>
                                    <TouchableOpacity onPress={() => showmode('date','from')} style={[{ marginLeft: 0, borderTopLeftRadius: 40, borderBottomRightRadius: 40, flexDirection: 'row', }]} >
                                        <Image style={[{}]} source={require('../assets/pictures/calender.png')} />
                                    </TouchableOpacity>
                                    <Text style={[styles.textmenu, { marginLeft: 10, marginTop: 10 }]}>
                                        To:{todate.getDate() + '/' + (todate.getMonth() + 1) + '/' + todate.getFullYear()}
                                    </Text>
                                    <TouchableOpacity onPress={() => showmode('date','to')} style={[{ marginLeft: 0, borderTopLeftRadius: 40, borderBottomRightRadius: 40, flexDirection: 'row', }]} >
                                        <Image style={[{}]} source={require('../assets/pictures/calender.png')} />
                                    </TouchableOpacity>
                                </View> 
                                <TouchableOpacity style={[styles.inputfields, {
                            flexDirection:'row',
                            width: 100,
                            height: 40,
                            marginLeft: 10,
                            marginRight:20,
                        }

                        ]} onPress={() =>console.log("will call filter")} >
<Text style={[{fontSize: 20, fontFamily: 'Poppins-Medium',}]}>Filter</Text>
                            <Icon name="filter" size={30} color="#F9FFFF" />
                        </TouchableOpacity>
                         
                        
                        </TouchableOpacity>
                        {
                            show && (
                                    <DateTimePicker
                                    testID='datetimepicker'
                                    value={(dateindex=='to')?todate:fromdate}
                                    mode={mode}
                                    display='default'
                                    onChange={onchange} />
                                    

                            )
                        }
                        {(() => {
                        if (graph===0) {
return(
                                countlist.map((item)=>{return(
                                    <View key={item}><TouchableOpacity  >
                                        <Text style={{fontWeight:'bold', fontSize: 22, width:"65%",fontFamily: 'Poppins-Medium'}}>Upper Value:{uppervalue[item]}</Text>
                                        <Text style={{fontWeight:'bold', fontSize: 22, width:"65%",fontFamily: 'Poppins-Medium'}}>Lower Value:{lowervalue[item]}</Text>
                                        <Text style={{fontWeight:'bold', fontSize: 22, width:"65%",fontFamily: 'Poppins-Medium'}}>Pulse :{pulse[item]}</Text>
                                        <View style={{flexDirection:"row"}}>
                                            <Text style={{ fontSize: 20, fontFamily: 'Poppins-Medium',width:"65%"}}>Date:{dates[item]}</Text>
                                        
                                        
                                        <Text style={{ fontSize: 20, fontFamily: 'Poppins-Medium'}}>Time:{time[item]}:00</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <View
      style={{
        borderBottomColor: 'black',
        borderBottomWidth: 1,
      }}
    />
                                    </View>
                                    )})
)   
                        }
                    })()}
                        {(() => {
                        if (graph===1) {
return(
    <ScrollView horizontal={true}>
        <LineChart
    data={{
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          data: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100
          ]
        }
      ]
    }} // from react-native
    height={220}
    yAxisLabel="$"
    yAxisSuffix="k"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />

    </ScrollView>
)   
                        }
                    })()}
                        
                         
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
export default Bp