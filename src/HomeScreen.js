import { MaterialIcons,Foundation } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { View,Text, StyleSheet, Button, ImageBackground, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
const HomeScreen = (props) => {
  return (
    <View style={styles.container}>
        <StatusBar backgroundColor="#0099CC"></StatusBar>
        <ImageBackground source={require('../assets/viis_calendar_app_2.png')} resizeMode="cover" style={styles.image} >
          <View style={{marginTop:260,flexDirection:'row',alignSelf:'center'}}>
          <TouchableOpacity onPress={() => props.navigation.navigate('AllTaskScreen')} style={{marginRight:100}}>       
            <Foundation name="calendar"  style={styles.icon}/> 
            <Text style={{alignSelf:"center"}}>My Calendar</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => props.navigation.navigate('AddTaskScreen')}> 
            <MaterialIcons name="add-circle"  style={styles.icon}/> 
            <Text style={{alignSelf:"center"}}>Add New Task</Text>
    </TouchableOpacity>
    </View>
    </ImageBackground>
    </View>
  )    
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      image: {
        flex: 1,
        justifyContent: "center"
      },
      taskContainer: {
        marginTop: 15,
      },
      heading:{
        marginBottom:90,
        fontSize:20,
        fontWeight:'bold',
        fontStyle:'italic',
        alignSelf:'center',
      },
      icon:{
          fontSize:50,
          color:'#0099CC',
          margin:10,
          alignSelf:'center'
      }
});

export default HomeScreen;
