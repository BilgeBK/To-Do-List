import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';



export default TaskCard = (props) => {
    return (  
            <View style={styles.taskContainer}>
                <Text style={styles.task}>{props.task}</Text>
                <TouchableOpacity onPress={() => props.updateTask(props.Id)}>
                    <MaterialIcons style={styles.update} name="edit" size={18} color='black' />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.deleteTask(props.taskId)}>
                    <MaterialIcons style={styles.delete} name="delete" size={18} color='black' />
                </TouchableOpacity>
            </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 20,
    },
    taskContainer: {
        backgroundColor: '#0099CC',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 5,
        minHeight: 50,
    },
    task: {
        color: 'black',
        width: '90%',
        fontSize: 16,
    },
    delete: {
        marginLeft: 7,
    },
    update: {
        marginRight:2 ,
    },
});