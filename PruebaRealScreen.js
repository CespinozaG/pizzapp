import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { database } from './firebaseConfig';
import { ref, onValue, push, remove } from 'firebase/database';

export default function PruebaRealScreen() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const tasksRef = ref(database, 'tasks');
    onValue(tasksRef, (snapshot) => {
      const data = snapshot.val();
      let taskList = [];
  
      if (data) {
        
        Object.keys(data).forEach((key) => {
          const task = data[key];
          taskList.push({
            key: key,
            title: task.title,

          });
        });
      }
  
      setTasks(taskList);
    });
  }, []);

  const addTask = () => {
    if (newTask.trim()) {
      push(ref(database, 'tasks'), { title: newTask });
      setNewTask('');
    }
  };

  const deleteTask = (key) => {
    remove(ref(database, `tasks/${key}`));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Tareas</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newTask}
          onChangeText={setNewTask}
          placeholder="Nueva tarea"
        />
        <Button title="Añadir" onPress={addTask} />
      </View>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text>{item.title}</Text>
            <Button title="Eliminar" onPress={() => deleteTask(item.key)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginRight: 10,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});
