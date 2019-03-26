import React from 'react';
import { Image,
         StyleSheet,
         Text,
         View,
         Button,
         Alert,
         TouchableHighlight,
         TouchableOpacity,
         createStackNavigator,
         FlatList,
         ImageBackground,
         LinkingIOS,
         Linking } from 'react-native';
         import { List, ListItem } from 'react-native-elements'

var Dimensions = require('Dimensions');
var window = Dimensions.get('window');

var curr_goal = "maintain";// TODO 
const API_ID = "3e242e15";
const API_KEY = "b2a53c7ca8c5eab94580cf107e6eb146";
const temp_cal = 2000;// TODO
var refresh = false;


export class FoodSuggestions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {list: [], total_cal: 0};
        this.refreshFoods = this.refreshFoods.bind(this);
        this.refreshFoods();
    }

    async refreshFoods() {
        if(refresh) {
            Alert.alert("Only one search!");
        }
        else {
            var total_cal = 0;
            var cal = split_cal(temp_cal);
            //Alert.alert("Searching for foods...");
            var rand0 = breakfast[Math.floor(Math.random() * breakfast.length)];
            var rand1 = lunch_dinner[Math.floor(Math.random() * lunch_dinner.length)];
            var rand2 = lunch_dinner[Math.floor(Math.random() * lunch_dinner.length)];
            var res0;
            var res1;
            var res2;

            try {   
                let response = await fetch(
                  "https://api.edamam.com/search?q=" + rand0 + "&app_id=" + API_ID + "&app_key=" + API_KEY + "&from=0&to=5&calories="+ (cal[0] - offset) + "-" + (cal[0] + offset),
                );

                let responseJson = await response.json();
                var index = Math.floor(Math.random() * 5);
                res0 = {
                            food: responseJson.hits[index].recipe.label,
                            cal: Math.round(responseJson.hits[index].recipe.calories / responseJson.hits[index].recipe.yield),
                            img: responseJson.hits[index].recipe.image,
                            url: responseJson.hits[index].recipe.url
                        }
            } catch (error) {
                console.log("HERE");
                console.error(error);
            }
            try {
                let response = await fetch(
                  "https://api.edamam.com/search?q=" + rand1 + "&app_id=" + API_ID + "&app_key=" + API_KEY + "&from=0&to=5&calories="+ (cal[1] - offset) + "-" + (cal[1] + offset),
                );
                let responseJson = await response.json();
                var index = Math.floor(Math.random() * 5);
                res1 = {
                            food: responseJson.hits[index].recipe.label,
                            cal: Math.round(responseJson.hits[index].recipe.calories / responseJson.hits[index].recipe.yield),
                            img: responseJson.hits[index].recipe.image,
                            url: responseJson.hits[index].recipe.url
                        }
            } catch (error) {
                console.log("HERE1");
                console.error(error);
            }
            try {
                let response = await fetch(
                  "https://api.edamam.com/search?q=" + rand2 + "&app_id=" + API_ID + "&app_key=" + API_KEY + "&from=0&to=5&calories="+ (cal[2] - offset) + "-" + (cal[2] + offset),
                );
                let responseJson = await response.json();
                var index = Math.floor(Math.random() * 5);
                res2 = {
                            food: responseJson.hits[index].recipe.label,
                            cal: Math.round(responseJson.hits[index].recipe.calories / responseJson.hits[index].recipe.yield),
                            img: responseJson.hits[index].recipe.image,
                            url: responseJson.hits[index].recipe.url
                        }
            } catch (error) {
                console.log("HERE2");
                Alert.alert("Please wait for suggestions to load"); 
                setTimeout(async function() {
                    let response = await fetch(
                      "https://api.edamam.com/search?q=" + rand2 + "&app_id=" + API_ID + "&app_key=" + API_KEY + "&from=0&to=5&calories="+ (cal[2] - offset) + "-" + (cal[2] + offset),
                    );
                    let responseJson = await response.json();
                    var index = Math.floor(Math.random() * 5);
                    res2 = {
                                food: responseJson.hits[index].recipe.label,
                                cal: Math.round(responseJson.hits[index].recipe.calories / responseJson.hits[index].recipe.yield),
                                img: responseJson.hits[index].recipe.image,
                                url: responseJson.hits[index].recipe.url
                            }
                        }, 60000);
            }
            total_cal += res0.cal + res1.cal + res2.cal;   
            this.setState({
                    list: 
                        [res0, res1, res2],
                    total_cal: total_cal}); 
            refresh = true;
            
        }
    }

    renderRow ({ item }) {
        return ( 
            <ListItem style={{color: 'white'}}
                title={item.food}
                subtitle={item.cal} 
                img={item.img}
            />
        )
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.innerContainer}>
                    <Text style={{position: "absolute",
                                  fontSize: 20,
                                  color: "#969696",
                                  top: '5%',
                                  alignItems: 'center'}}> Food Suggestions: {curr_goal} 
                    </Text>
                    <Text style={{position: "absolute",
                                  fontSize: 15,
                                  color: "#969696",
                                  top: "10%",
                                  alignItems: 'center'}}
                            title="Search">Total Cal: {this.state.total_cal}</Text>

                    <View style={styles.listContainer}>
                        <List> 
                            <FlatList
                                extraData={this.state}
                                data={this.state.list}
                                renderItem={({ item }) => (
                                    <ImageBackground source={{uri: item.img}} style={{width: '100%', height: 155,flex: 1 }}>
                                        <View style={{height: "100%", width: "100%", backgroundColor:"rgba(0,0,0,0.3)"}}>
                                            <Text style={styles.foodHeader}
                                                onPress={() => Linking.openURL(item.url).catch(err => console.error('An error occurred', err))}>
                                                    {item.food}
                                            </Text>
                                            <Text style={{fontSize: 10,
                                                                position: "absolute",
                                                                top: "50%",
                                                                left: "10%",
                                                                color: "white",
                                                                zIndex: 5}}>Cal: {item.cal}</Text>
                                        </View>
                                       
                                    </ImageBackground>
                                    
                                )}
                                keyExtractor={item => item.url}
                            />
                        </List>
                    </View>

                    <Text> {this.Suggestions} </Text>
                </View>
            </View>
        );
    }
}




const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        color: "white",
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerContainer: {
        //backgroundColor: "#89cff0",
        backgroundColor: "rgba(234,234,234,.5)",
        width: '90%',
        height: 600,
        borderRadius:10,
        alignItems: 'center',
        justifyContent: 'center',
        position: "absolute",
        top: 100
    },
    listContainer: {
        position: 'absolute',
        top: '15%',
        width: '90%',
        height: '95%',
        borderWidth: 0
    },

    foodHeader: {
        borderWidth: 0,
        fontSize: 20,
        height: "100%",
        width: "100%",
        paddingTop: 15,
        paddingLeft: 15,
        color: "white",
        zIndex: 2
    }
}); 

const offset = 100;

function split_cal(calories) {
    var thirds = Math.round(calories / 3);
    if(thirds - 200 < 150) {
        return [thirds, thirds, thirds];
    } else {
        return [thirds - 100, thirds, thirds + 100];
    }
}

const breakfast = [
    "Bagel",
    "Breakfast+Burrito",
    "Cereal",
    "Eggs",
    "French Toast",
    "Fruit",
    "Ham",
    "Muffin",
    "Oatmeal",
    "Omlette",
    "Pancake",
    "Toast",
    "Yogurt"
]

const lunch_dinner = [
    "Beef",
    "Potato",
    "Cajun",
    "Chicken",
    "Corn",
    "Fried",
    "Hamburger",
    "Italian",
    "French",
    "Macaroni",
    "Meatloaf",
    "Onion",
    "Pizza",
    "Pasta",
    "Mexican",
    "Asian",
    "Fish",
    "Sandwich",
    "Steak"
]

// <Button style={{position: "absolute",
                    //               fontSize: 10,
                    //               color: "#969696",
                                
                    //               alignItems: 'center'}}
                    //         onPress={this.refreshFoods}
//                     //         title="Search"/>
// <Text style={{position: "absolute",
//                                   fontSize: 15,
//                                   color: "#969696",
//                                   top: "10%",
//                                   alignItems: 'center'}}
//                             onPress={this.refreshFoods}
//                             title="Search">Search</Text>



// Dependent on calories burned
function foodSuggestions() {
    var test = true;
    if (false) {
        return <Text> Maintaining! </Text>
    }
    else if (false) {
        return <Text> Bulking! </Text>
    }

    else if (false) {
        return <Text> Losing Weight! </Text>
    }
    else {
        return <Text> ERROR with foodSug! </Text>
    }
}

export default FoodSuggestions;
