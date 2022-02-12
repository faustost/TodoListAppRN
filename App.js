import React, {useState, useRef} from 'react';
import { Keyboard, ScrollView, StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function App() {

  // makes statusbar look better
  StatusBar.setBarStyle('light-content', true);

  // states
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState();
  const [editing, setEditing] = useState();

  // reference to TextInput (for editing)
  const refInput = useRef(null);

  // textInput focus
  const getFocusInput = () => {
    refInput.current.focus();
  };

  // CRUD functions - add
  const addTask = (task) => {
    if (task == null) return;
    setTasks([...tasks, task]);
    setTask(null);
    Keyboard.dismiss();
  }

  // CRUD functions - delete (done)
  const deleteTask = (deleteIndex) => {
    setTask(null);
    setTasks(tasks.filter((value, index) => index != deleteIndex));
  }

  // CRUD functions - update (edit)
  const editTask = (editIndex, task) => {
    setEditing(editIndex + 1);
    setTask(task);
    getFocusInput();
  }

  // // CRUD functions - add/edit handler
  const handleTask = (task, editing) => {
    if (!editing) {
      addTask(task);
    }
    else {
      tasks[editing - 1] = task
      setEditing(null);
      setTask(null);
      Keyboard.dismiss();
    }
  };

  // renderer
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>MY TODO LIST</Text> 
      <ScrollView style={styles.scrollView}>
        {
          tasks.map((task, index) => {
            return (
              <View key={index} style={styles.container}>
                <View style={styles.rowContainer}>
                  <View style={styles.indexContainer}>
                    <Text style={styles.index}>{index+1}</Text>
                  </View>
                  <View style={styles.taskContainer}>
                    <Text style={styles.task}>{task}</Text>
                    <TouchableOpacity onPress={() => editTask(index, task)}>
                      <MaterialIcons style={styles.edit} name="edit" color='#fff' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteTask(index)}>
                      <MaterialIcons style={styles.delete} name="check" color='#fff' />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })
        }
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inputContainer}
      >
        <TextInput style={styles.inputField} ref={refInput} value={task} onChangeText={text => setTask(text)} placeholder={'Write your task'} placeholderTextColor={'#fff'} />
        <TouchableOpacity onPress={() => handleTask(task, editing)}>
          <View style={styles.button}>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

//styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001a2e',
    marginBottom: 5,
    borderWidth: 2,
  },
  heading: {
    color: '#fff',
    fontSize: 25,
    fontWeight: '600',
    marginTop: 70,
    marginBottom: 30,
    marginLeft: 20,
    textAlign: 'center'
  },
  scrollView: {
    marginBottom: 70,
  },
  inputContainer: {
    borderColor: '#fff',
    backgroundColor: '#2d3440',
    borderWidth: 1,
    marginHorizontal: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 30,
  },
  inputField: {
    color: '#fff',
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
  rowContainer: {
    flexDirection: 'row',
    marginHorizontal: 15,
    alignItems: 'center',
  },
  indexContainer: {
    backgroundColor: '#2d3440',
    borderRadius: 10,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderColor: '#fff',
  },
  index: {
    color: '#fff',
    fontSize: 20,
  },
  taskContainer: {
    backgroundColor: '#2d3440',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    minHeight: 50,
  },
  task: {
    color: '#fff',
    width: '90%',
    fontSize: 16,
    borderRightWidth: 35,
  },
  edit: {
    marginLeft: -30,
    fontSize: 22,
  },
  delete: {
    marginLeft: -10,
    fontSize: 25,
  },
});