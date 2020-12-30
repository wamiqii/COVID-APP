import React, { useState, useEffect } from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { EvilIcons } from '@expo/vector-icons';

const countrylist = ({ navigation }) => {
    const [reportcountry, setreportcountry] = useState([]);
    const [searchdata, setsearchdata] = useState([]);

    const fetchdata = () => {
        fetch("https://world-population.p.rapidapi.com/allcountriesname", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "00e81f8079mshc217bfb30d3bca0p193345jsn13cb1d9b7d6a",
                "x-rapidapi-host": "world-population.p.rapidapi.com"
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {setreportcountry(responseJson.body.countries)})
        .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchdata();
    }, []);

    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerLeft: () => (
            <View style={{paddingLeft: 10}}>
              <Ionicons name="arrow-back" size={30} color="white" onPress={() => navigation.navigate('WorldStats')} />
            </View>
          ),
          headerRight: () => (
            <View style={{paddingRight: 10}}>
              <AntDesign name="star" size={30} color="white" onPress={() => navigation.navigate('CountryFav')} />
            </View>
          )
        });
      });

    const handlesearch = (e) => {
        setsearchdata(() => reportcountry.filter((i) => i.match(e)));
    };


    const searchquery = (item) => {
        if(searchdata.includes(item) || searchdata.length == 0){
            return (
                <View key={Math.random()} style={{alignItems: "center", flexDirection: "row"}}>
                    <TouchableOpacity>
                        <AntDesign name="staro" size={24} color="black" style={{marginTop: 10, marginLeft: 30}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Cdetails', {name: item})}>
                        <Text style={{fontSize: 25, fontWeight: "bold", borderBottomWidth: 3, borderBottomColor: "darkblue", borderRadius: 5, marginTop: 10, marginLeft: 50}}>
                            {item}
                        </Text>
                    </TouchableOpacity>
                </View>
            ) 
        }
    };

  return (
    <View>
        <Text style={{fontSize: 30, alignSelf: "center", padding: 10, fontWeight: "bold"}}>COUNTRIES LIST</Text>
        <TextInput placeholder="Search Country" onChangeText={handlesearch} style={{
            alignSelf: "center", alignItems: "center" , fontSize: 22, borderBottomWidth: 3, borderBottomColor: "darkblue", borderRadius: 5}}/>
        <FlatList 
            keyExtractor={(item, pass) => "Key" + pass}
            data={reportcountry}
            renderItem={({ item }) => (
                searchquery(item)
            )}
        />
    </View>
  );
}

const fcountry = ({navigation}) => {

    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerLeft: () => (
            <View style={{paddingLeft: 10}}>
              <Ionicons name="arrow-back" size={30} color="white" onPress={() => navigation.goBack()} />
            </View>
          ),
        });
      });

    return(
        <View>
            <Text style={{fontSize: 30, alignSelf: "center", padding: 10, fontWeight: "bold"}}>FAVOURITE COUNTRIES</Text>
            <TouchableOpacity onPress={() => navigation.openDrawer()} style={{flexDirection: "row" ,padding: 8, borderWidth: 3, borderColor: "gray", borderRadius: 7, width: 180, alignSelf: "center", alignItems: "center"}}>
                <Ionicons name="menu" size={30} color="grey" style={{marginRight: 20}}/>
                <Text style={{fontSize: 20}}>Open Drawer</Text> 
            </TouchableOpacity>
        </View>
    );
}

const dcountry = ({ navigation, route }) => {

    const [pname, setPname] = useState(route.params.name)

    const [detailscountry, setdetailscountry] = useState('');
    // const [countrypop, setcountrypop] = useState('');
    const [curl, setcurl] = useState(`https://covid-19-data.p.rapidapi.com/country?name=${pname}`)

    const fetchdata = () => {
        fetch(curl, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "00e81f8079mshc217bfb30d3bca0p193345jsn13cb1d9b7d6a",
                "x-rapidapi-host": "covid-19-data.p.rapidapi.com"
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {setdetailscountry(responseJson)})
            .catch(err => console.error(err));
    };

    // const fetchcpop = () => {
    //     fetch(curl, {
    //         "method": "GET",
    //         "headers": {
    //             "x-rapidapi-key": "00e81f8079mshc217bfb30d3bca0p193345jsn13cb1d9b7d6a",
    //             "x-rapidapi-host": "world-population.p.rapidapi.com"
    //         }
    //     })
    //     .then((result) => result.json())
    //     .then((resultJson) => {setcountrypop(resultJson.body.population)})
    //     .catch(err => console.error(err));
    // };

    useEffect(() => {
        fetchdata();
        // fetchcpop();
    }, []);
    
    

    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerLeft: () => (
            <View style={{paddingLeft: 10}}>
              <Ionicons name="arrow-back" size={30} color="white" onPress={() => navigation.navigate('CountryList')} />
            </View>
          ),
        });
    });

    return(
        <View>
            <Text style={{fontSize: 30, alignSelf: "center", padding: 10, fontWeight: "bold"}}>COUNTRY DETAILS</Text>
            {/* <View style={{flexDirection: "row", padding: 8, marginTop: 20, justifyContent: "center", alignSelf: "center"}}>
                <Text style={{fontSize: 25, fontWeight: "bold", fontStyle: "italic", marginRight: 65}}>Country: </Text>
                <Text style={{fontSize: 25, fontWeight: "bold", marginLeft: 20, borderBottomColor: "black", borderBottomWidth: 2}}>{countrypop}</Text>
            </View> */}
            <FlatList
            keyExtractor={(item, pass) => "Key" + pass}
                data={detailscountry}
                renderItem={({ item }) => (
                    <View key={item.code}>
                        <View style={{flexDirection: "row", padding: 8, marginTop: 20, justifyContent: "center", alignSelf: "center"}}>
                            <Text style={{fontSize: 25, fontWeight: "bold", fontStyle: "italic", marginRight: 65}}>Country: </Text>
                            <Text style={{fontSize: 25, fontWeight: "bold", marginLeft: 20, borderBottomColor: "black", borderBottomWidth: 2}}>{item.country}</Text>
                        </View>
                        <View style={{flexDirection: "row", padding: 8, justifyContent: "center", alignSelf: "center"}}>
                            <Text style={{fontSize: 25, fontWeight: "bold", fontStyle: "italic", marginRight: 160}}>Code: </Text>
                            <Text style={{fontSize: 25, fontWeight: "bold", marginLeft: 20, borderBottomColor: "black", borderBottomWidth: 2}}>{item.code}</Text>
                        </View>
                        <View style={{flexDirection: "row", padding: 8, justifyContent: "center", alignSelf: "center"}}>
                            <Text style={{fontSize: 25, fontWeight: "bold", fontStyle: "italic"}}>Confirmed Cases: </Text>
                            <Text style={{fontSize: 25, fontWeight: "bold", marginLeft: 20, borderBottomColor: "black", borderBottomWidth: 2}}>{item.confirmed}</Text>
                        </View>
                        <View style={{flexDirection: "row", padding: 8, justifyContent: "center", alignSelf: "center"}}>
                            <Text style={{fontSize: 25, fontWeight: "bold", fontStyle: "italic", marginRight: 5}}>Recovered Cases: </Text>
                            <Text style={{fontSize: 25, fontWeight: "bold", marginLeft: 20, borderBottomColor: "black", borderBottomWidth: 2}}>{item.recovered}</Text>
                        </View>
                        <View style={{flexDirection: "row", padding: 8, justifyContent: "center", alignSelf: "center"}}>
                            <Text style={{fontSize: 25, fontWeight: "bold", fontStyle: "italic", marginRight: 10}}>Critical Cases: </Text>
                            <Text style={{fontSize: 25, fontWeight: "bold", marginLeft: 70, borderBottomColor: "black", borderBottomWidth: 2}}>{item.critical}</Text>
                        </View>
                        <View style={{flexDirection: "row", padding: 8, justifyContent: "center", alignSelf: "center"}}>
                            <Text style={{fontSize: 25, fontWeight: "bold", fontStyle: "italic", marginRight: 15}}>Deaths: </Text>
                            <Text style={{fontSize: 25, fontWeight: "bold", marginLeft: 120, borderBottomColor: "black", borderBottomWidth: 2}}>{item.deaths}</Text>
                        </View>
                        <View style={{flexDirection: "row", padding: 8, justifyContent: "center", alignSelf: "center", borderBottomColor: "black", borderBottomWidth: 2, marginBottom: 10, backgroundColor: ""}}>
                            <Text style={{fontSize: 20, fontWeight: "bold", fontStyle: "italic"}}>Last Updated: </Text>
                            <Text style={{fontSize: 20, fontWeight: "bold"}}>{item.lastUpdate}</Text>
                        </View>
                    </View>
                )}
            />
            <TouchableOpacity onPress={() => navigation.openDrawer()} style={{flexDirection: "row" ,padding: 8, borderWidth: 3, borderColor: "gray", borderRadius: 7, width: 180, alignSelf: "center", alignItems: "center"}}>
                    <Ionicons name="menu" size={30} color="grey" style={{marginRight: 20}}/>
                    <Text style={{fontSize: 20}}>Open Drawer</Text> 
            </TouchableOpacity>
        </View>
    );  
};

const Home = ({navigation}) => {

    const [report, setreport] = useState([]);
    const [worldpop, setworldpop] = useState([]);

    const fetchdata = () => {
        fetch("https://covid-19-data.p.rapidapi.com/totals", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "00e81f8079mshc217bfb30d3bca0p193345jsn13cb1d9b7d6a",
            "x-rapidapi-host": "covid-19-data.p.rapidapi.com"
        }
        })
        .then((result) => result.json())
        .then((resultJson) => {setreport(resultJson[0])})
        .catch(err => console.error(err));
    };

    const fetchpop = () => {
        fetch("https://world-population.p.rapidapi.com/worldpopulation", {
        "method": "GET",
        "headers": {
		"x-rapidapi-key": "00e81f8079mshc217bfb30d3bca0p193345jsn13cb1d9b7d6a",
		"x-rapidapi-host": "world-population.p.rapidapi.com"
	    }
        })
        .then((response) => response.json())
        .then((responseJson) => {setworldpop(responseJson.body.world_population)})
        .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchdata();
        fetchpop();
    },[]);

    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerLeft: () => (
            <View style={{paddingLeft: 10}}>
              <Ionicons name="menu" size={30} color="white" onPress={() => navigation.openDrawer()} />
            </View>
          ),
        });
      });

    return(
        <View>
            <Text style={{fontSize: 30, alignSelf: "center", padding: 10, fontWeight: "bold"}}>WORLD STATISTICS</Text>
                    <View>
                        <View style={{flexDirection: "row", padding: 8, marginTop: 20, justifyContent: "center", alignSelf: "center", borderColor: "black", borderWidth: 3, borderRadius: 7}}>
                            <Text style={{fontSize: 25, fontWeight: "bold", fontStyle: "italic"}}>World Population: </Text>
                            <Text style={{fontSize: 25, fontWeight: "bold", marginLeft: 10, borderBottomColor: "black", borderBottomWidth: 2}}>{JSON.stringify(worldpop)}</Text>
                        </View>
                        <View style={{flexDirection: "row", padding: 8, marginTop: 20, justifyContent: "center", alignSelf: "center"}}>
                            <Text style={{fontSize: 25, fontWeight: "bold", fontStyle: "italic"}}>Confirmed Cases: </Text>
                            <Text style={{fontSize: 25, fontWeight: "bold", marginLeft: 10, borderBottomColor: "black", borderBottomWidth: 2}}>{JSON.stringify(report.confirmed)}</Text>
                        </View>
                        <View style={{flexDirection: "row", padding: 8, justifyContent: "center", alignSelf: "center"}}>
                            <Text style={{fontSize: 25, fontWeight: "bold", fontStyle: "italic"}}>Recovered Cases: </Text>
                            <Text style={{fontSize: 25, fontWeight: "bold", marginLeft: 10, borderBottomColor: "black", borderBottomWidth: 2}}>{JSON.stringify(report.recovered)}</Text>
                        </View>
                        <View style={{flexDirection: "row", padding: 8, justifyContent: "center", alignSelf: "center"}}>
                            <Text style={{fontSize: 25, fontWeight: "bold", fontStyle: "italic"}}>Critical Cases: </Text>
                            <Text style={{fontSize: 25, fontWeight: "bold", marginLeft: 70, borderBottomColor: "black", borderBottomWidth: 2}}>{JSON.stringify(report.critical)}</Text>
                        </View>
                        <View style={{flexDirection: "row", padding: 8, justifyContent: "center", alignSelf: "center"}}>
                            <Text style={{fontSize: 25, fontWeight: "bold", fontStyle: "italic"}}>Deaths: </Text>
                            <Text style={{fontSize: 25, fontWeight: "bold", marginLeft: 120, borderBottomColor: "black", borderBottomWidth: 2}}>{JSON.stringify(report.deaths)}</Text>
                        </View>
                        <View style={{flexDirection: "row", padding: 8, justifyContent: "center", alignSelf: "center", borderBottomColor: "black", borderBottomWidth: 2, marginBottom: 10, backgroundColor: ""}}>
                            <Text style={{fontSize: 20, fontWeight: "bold", fontStyle: "italic"}}>Last Updated: </Text>
                            <Text style={{fontSize: 20, fontWeight: "bold"}}>{JSON.stringify(report.lastUpdate)}</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('CountryList')} style={{flexDirection: "row" ,padding: 8, borderWidth: 3, borderColor: "gray", borderRadius: 7, width: 170, alignSelf: "center", alignItems: "center"}}>
                        <Text style={{fontSize: 20}}>Countries List</Text> 
                        <EvilIcons name="arrow-right" size={24} color="black" style={{marginLeft: 20}}/>
                    </TouchableOpacity>
        </View>
    );
}

const MyDrawer = () => {
    return(
        <Drawer.Navigator initialRouteName="Home" drawerType="slide" 
            drawerStyle={{
                backgroundColor: "white",
                width: 220
            }}>
            <Drawer.Screen name="WorldStats" component={MyStack} 
                options={{drawerIcon: () => <Ionicons name="earth" size={24} color="black" />, drawerLabel: "World Statistics"}}/>
            <Drawer.Screen name="CountryList" component={MyStack2} 
                options={{drawerIcon: () => <MaterialIcons name="place" size={24} color="black" />, drawerLabel: "Country List"}}/>
            <Drawer.Screen name="CountryFav" component={MyStack3} 
                options={{drawerIcon: () => <AntDesign name="staro" size={24} color="black" />, drawerLabel: "Favourites List"}}/>
        </Drawer.Navigator>
    );
}

const MyStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeS" component={Home} options={{title: 'COVID Statistics', headerTitleAlign: "center", headerStyle: {backgroundColor: "darkred"},
                headerTitleStyle: {color: "white"}}} />
            <Stack.Screen name="Cdetails" component={dcountry} options={{title: 'COVID Statistics', headerTitleAlign: "center", headerStyle: {backgroundColor: "darkred"},
                headerTitleStyle: {color: "white"}}} />
        </Stack.Navigator>
    );
  }

const MyStack2 = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="CL" component={countrylist} options={{title: 'COVID Statistics', headerTitleAlign: "center", headerStyle: {backgroundColor: "darkred"},
                headerTitleStyle: {color: "white"}}} />
        </Stack.Navigator>
    );
}

const MyStack3 = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="FL" component={fcountry} options={{title: 'COVID Statistics', headerTitleAlign: "center", headerStyle: {backgroundColor: "darkred"},
                headerTitleStyle: {color: "white"}}} />
        </Stack.Navigator>
    );
}

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
        <MyDrawer />
    </NavigationContainer>
  );
}

export default App;