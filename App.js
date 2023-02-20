import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert, ScrollView, Pressable, Switch, } from 'react-native';
import NumericInput from 'react-native-numeric-input'
import RadioForm from 'react-native-simple-radio-button';
import { RadioButton } from 'react-native-paper';
import { useFonts } from 'expo-font';


export default function App() {
  const [weight,setWeight] = useState(0);
  const [bottle, setBottle] = useState(0);
  const [hours,setHours] = useState(0);
  const [gender,setGender] = useState('');
  const [result,setResult] = useState(0);
  const [message,setMessage] = useState(0);
  






  const [loaded] = useFonts({
    InterBold: require('./fonts/Inter-SemiBold.ttf'),
    InterMedium: require('./fonts/Inter-Medium.ttf'),
  });


 
  const counter = Array();
  for(let i=0;i<20;i++){
      counter.push({label:i.toString(),value:i})
  }

  const genders = [{label: 'Male',value: 'male'},
                   {label: 'Female',value: 'female'},
 ]

  const insertWeight = () =>
    Alert.alert(
      "Insert weight"
    );


//Counts bottles to liter
  function literCounter(){
    return bottle * 0.33
  }

//counts to grams
  function toGrams(){
    return literCounter() * 8 * 4.5
  }

//Counts the burning grams/ weight
function burning(){
  return weight / 10
}

//Counts how many grams left
function gramsLeft(){
  return toGrams() - (burning() * hours)
}
//Counts blood alcohol level for male
function forMale(){
  return (gramsLeft() / (weight * 0.7)).toFixed(2)
}

//Counts blood alcohol level for female
function forFemale(){
  return (gramsLeft() / (weight * 0.6)).toFixed(2)
}



const weightAlert = () =>
    Alert.alert(
      "Please insert weight.",
      " ",
      [
        { text: "OK",}
      ]
    );


function calculate(){
    let mes = "Set";


    if(weight == 0) {
      mes +=" weight";
      weightAlert();
    };
    if(bottle == 0) {mes +=" bottles"};
    if(hours == 0) {mes +=" time"};
    setMessage(mes);



    if(mes == "Set"){ 
      if(gender == 'female'){setResult(forFemale())}
      else{setResult(forMale())}
  }
}
  
const [isOn, setIsOn] = useState(false);
const myStyle = isOn ? darkStyle : lightStyle;

if (!loaded) {
  return null;
}




  return (
    
    <View style={myStyle.container}>
    
      <Text style={myStyle.heading}>Alcometer</Text>
   
      <Switch value={isOn} onValueChange={ newValue => setIsOn(newValue) }/>
      
      <Text style={myStyle.labels}>Weight</Text>
      <TextInput style={myStyle.inputs} placeholder='Enter weight'  onChangeText={text => setWeight(text)} />
      <Text style={myStyle.labels}>Bottles</Text>
      <NumericInput onChange={setBottle} />
      <Text style={myStyle.labels}>Hours</Text>
      <NumericInput onChange={setHours} />
      <View style={myStyle.radiobutton}>


    <RadioButton.Group onValueChange={newValue => setGender(newValue)} value={gender}>
     {genders.map(radio => 
      <View style={myStyle.radiobutton} key={radio.value}>
        <RadioButton value={radio.value}/>
        <Text style={myStyle.labels}>{radio.value}</Text>
      </View>
      )}
      </RadioButton.Group>
       

      </View>
      <Text style={myStyle.inputs}>{message == "Set"?(result>0?result:"No alcohol"):message}</Text>


      
      <Pressable style={myStyle.pressable} onPress={calculate}>
      <Text style={myStyle.buttontext}>Calculate</Text>
    </Pressable>

    </View>
  );
}

const lightStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef2e6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontFamily: 'InterBold',
    fontSize:40,
    paddingBottom:20,
  },
  labels: {
    fontFamily: 'InterMedium',
    fontSize:20,
    paddingBottom:5,
  },
  inputs: {
    fontFamily: 'InterMedium',
    fontSize:25,
    paddingBottom:5,
  },
  buttontext: {
    fontFamily: 'InterMedium',
    fontSize:25,
    paddingTop:10,
    paddingRight:7,
    paddingBottom:10,
    paddingLeft:7,
    borderWidth: 2,
    borderRadius:15,
    borderColor:'#151515',

  },
  pressable: {
    paddingTop:10,
  },
  radiobutton: {
    paddingTop:15,
    buttonColor: '#151515',
    fontSize:16,
    flexDirection:'row',
  },
 
});
const darkStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151515',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontFamily: 'InterBold',
    fontSize:40,
    paddingBottom:20,
    color: '#eef2e6',
  },
  labels: {
    fontFamily: 'InterMedium',
    fontSize:20,
    paddingBottom:5,
    color: '#eef2e6',
  },
  inputs: {
    fontFamily: 'InterMedium',
    fontSize:25,
    paddingBottom:5,
    color: '#eef2e6',
  },
  buttontext: {
    fontFamily: 'InterMedium',
    fontSize:25,
    paddingTop:10,
    paddingRight:7,
    paddingBottom:10,
    paddingLeft:7,
    borderWidth: 2,
    borderRadius:15,
    borderColor:'#eef2e6',
    color: '#eef2e6',

  },
  pressable: {
    paddingTop:10,
    color: '#eef2e6',
  },
  radiobutton: {
    paddingTop:15,
    buttonColor: '#eef2e6',
    fontSize:16,
    flexDirection:'row',
  },
 
});