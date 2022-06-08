import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import AddTaskScreen from "./src/AddTaskScreen";
import AllTaskScreen from "./src/AlllTaskScreen";
import HomeScreen from "./src/HomeScreen";
const navigator = createStackNavigator(
  {
    Home : HomeScreen,
    AllTaskScreen : AllTaskScreen,
    AddTaskScreen : AddTaskScreen, 
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "Viis Calendar App",
    },
  }
);
export default createAppContainer(navigator);


