import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View ,ImageBackground, FlatList, ScrollView, Keyboard,TextInput} from 'react-native';
import { Calendar } from 'react-native-calendars';
import connection from './database/connection'
import TaskCard from './TaskCard'
import TaskInput from './TaskInput';
import Dialog,{
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
} from 'react-native-popup-dialog';
 const AddTaskScreen=() => {
  const image = { uri: "https://img.freepik.com/free-photo/grunge-paint-background_1409-1337.jpg?size=626&ext=jpg" };
  const [myTasks,setMyTasks] = useState([])
  const [s_date,setS_Date] = useState('');
  const [v_id, setId] = useState(-1);
  const [defaultAnimationDialog, setDefaultAnimationDialog] = useState(false);
  const [animationDialog,setAnimationDialog] = useState(false)
  const[select_task,setSelectTask] = useState([]);
  const [select_taskName,setSelectTaskName] = useState('');
  const [select_taskDate, setSelectTaskDate] = useState(''); 
  const [select_id,setSelectId] = useState(-1);
  const[mark_date,setMarkDate] = useState([]);
  const addTask=(taskName)=>{
  connection.createTable({});
    const task = {
      id : v_id-999999,
      taskName : taskName,
      taskDate: s_date,
    }
    
   myTasks.push(task);
   connection.create(task);
   Keyboard.dismiss();
   console.log(myTasks);
  }
  const getAllDate = async ()=>{
    const option = {
      columns: 'taskDate',
      page: 1,
      limit: 30,
      order: 'taskDate ASC'
    }
    var getDate = await connection.query(option) 
  
    for (let index = 0; index < getDate.length; index++) {
      const element = getDate[index];
      if(mark_date[index] != element.taskDate){
        mark_date.push(element.taskDate);  
      }      
    }
  }
  let newDaysObject = {};
  mark_date.forEach((day) => {
    newDaysObject[day] = {
        selected: true,
        marked: true
    };
  });
  const openDeleteDialog= async(taskId)=>{
    setAnimationDialog(true);
    var task = await connection.find(taskId);
    setSelectTaskName(task.taskName);
    setSelectTaskDate(task.taskDate);
    setSelectId(task.id);
  }
  const deleteTask=(taskId,index)=>{
    setMyTasks(myTasks.filter((value, index) => index != index));
    connection.destroy(taskId)
    console.log(taskId)
    console.log("delete")
  }
  const getUpdateTask= async (taskId,taskName)=>{
    setDefaultAnimationDialog(true);
    var task = await connection.find(taskId);
    select_task.push(task);

    setSelectTaskName(task.taskName);
    setSelectTaskDate(task.taskDate);
  }
  const updateTask =  async (taskName,taskDate)=>{
    console.log('update');
   const props = {
      id : select_task[0].id,
      taskName : taskName,
      taskDate : taskDate
   } 
   var check = await connection.update(props);
   console.log(check);

   setSelectTaskDate('');
   setSelectTaskName('');
  
  }  
  return (
    getAllDate(),
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image} >
      <Calendar
        style={{margin:30,marginTop:20}}
          onDayPress={day=>{
            console.log('selected day',day.dateString)
            setId(-1);
            setS_Date('');
            setId(v_id+day.timestamp);
            setS_Date( day.dateString);     
                
          }
          
        }
        markedDates={newDaysObject}
      ></Calendar>
       <Dialog
          onDismiss={() => {
            setDefaultAnimationDialog(false);
            setSelectTaskName('');
            setSelectTaskDate('');
            setSelectTask([]);
            
          }}
          width={0.9}
          visible={defaultAnimationDialog}
          rounded
          actionsBordered
          dialogTitle={
            <DialogTitle
              title="Task Details"
              style={{
                backgroundColor: '#F7F7F8',
              }}
              hasTitleBar={false}
              align="left"
            />
          }
          footer={
            <DialogFooter>
              <DialogButton
                text="CANCEL"
                bordered
                onPress={() => {
                  setDefaultAnimationDialog(false);
                  setSelectTaskName('');
                  setSelectTaskDate('');
                  setSelectTask([]);
                  
                }}
                key="button-1"
              />
              <DialogButton
                text="SAVE"
                bordered
                onPress={() => {
                  setDefaultAnimationDialog(false);
                  console.log(select_taskName);
                  updateTask(select_taskName,select_taskDate);
                }}
                key="button-2"
              />
            </DialogFooter>
          }>
          <DialogContent
            style={{
              backgroundColor: '#F7F7F8',
            }}>
            <Text style = {{fontWeight:'bold'}}>
              Task Name :  
            </Text>
            <TextInput  
            onChangeText={
              (newText) =>{
                console.log(newText.length)  
                setSelectTaskName(newText)
            }
        }
             value = {select_taskName}></TextInput>
            <Text style={{fontWeight:'bold'}}>Task Date : </Text>  
            <TextInput    
            onChangeText={
            (newText) =>{
                console.log(newText.length)
                setSelectTaskDate(newText)
            }
        }
        value = {select_taskDate}></TextInput>       
          </DialogContent>
        </Dialog>
       <Dialog
          onDismiss={() => {
            setAnimationDialog(false);
            setSelectTaskName('');
            setSelectTaskDate('');
            setSelectTask([]);
            
          }}
          width={0.9}
          visible={animationDialog}
          rounded
          actionsBordered
          dialogTitle={
            <DialogTitle
              title="Do you want to delete this task?"
              style={{
                backgroundColor: '#F7F7F8',
              }}
              hasTitleBar={false}
              align="left"
            />
          }
          footer={
            <DialogFooter>
              <DialogButton
                text="CANCEL"
                bordered
                onPress={() => {
                  setAnimationDialog(false);
                  setSelectTaskName('');
                  setSelectTaskDate('');
                  setSelectTask([]);
                  
                }}
                key="button-1"
              />
              <DialogButton
                text="YES"
                bordered
                onPress={() => {
                  setAnimationDialog(false);
                  console.log(select_taskName);
                  deleteTask(select_id);
                }}
                key="button-2"
              />
            </DialogFooter>
          }>
          <DialogContent
            style={{
              backgroundColor: '#F7F7F8',
            }}>
            <Text style = {{fontWeight:'bold'}}>
              Task Name :  {select_taskName}
            </Text>
            <Text style={{fontWeight:'bold'}}>Task Date : {select_taskDate} </Text>      
          </DialogContent>
        </Dialog>
      <ScrollView style={styles.scrollView}>   
       {
        myTasks.map((object) => {
          console.log(object.taskName)
          return (
            <View key={object.id} style={styles.taskContainer}>
              <TaskCard taskId={object.id} task={object.taskName} updateTask={()=>getUpdateTask(object.id)} deleteTask={() => openDeleteDialog(object.id)}/>
            </View>
          );})} 
          
      </ScrollView>
      <StatusBar style="auto" />
      <TaskInput addTask = {addTask} />
      </ImageBackground>
    </View>
  );
}
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
    marginTop:20,
    fontSize:20,
    fontWeight:'bold',
    fontStyle:'italic',
    alignSelf:'center',
  },
  scrollView: {
    marginBottom: 70,
  },
});

export default AddTaskScreen;