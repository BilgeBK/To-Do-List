import React, {useState} from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity, } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; 

export default TaskInput = (props) => {
    const [task, setTask] = useState();

    const touchableAddTask = (taskName,taskDate) => {
        props.addTask(taskName,taskDate);
        setTask(null);
    }
    return (
        <View style = {styles.container}>
        <TextInput style={styles.inputField} value={task} onChangeText={text => setTask(text)} placeholder={'Enter task'} placeholderTextColor={'black'}/>
        <TouchableOpacity onPress={() => touchableAddTask(task)}>
          <View style={styles.button}>
              <MaterialIcons name="add-circle" size={24} color="black" />
          </View>
        </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderColor: '#fff',
        backgroundColor: '#0099CC',
        borderWidth: 1,
        marginHorizontal: 20,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        position: 'absolute',
        bottom: 20,
    },
    inputField: {
        color: 'black',
        height: 50,
        flex: 1,
    },
    button: {
        height: 30,
        width: 30,
        borderRadius: 5,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
});
