import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView} from 'react-native';

export default function App() {


//items is the name of the array that holds  all of the to-do list tasks
const [items, setItems] = useState([
  //{todo: 'first item'},
  //{todo: 'second item'},
]);

const generateList = items.map((item, index) => (
  <View key={index} style={styles.listItemContainer}>
    <Text>{item.todo}</Text>
  </View>

));

let newItemText = '';

const onChangeText = (text) => {
  newItemText = text;
}

const addToList = () => {
  console.log({todo:newItemText});
  console.log([...items, {todo: newItemText}]);
  setItems([...items, {todo: newItemText}])
}


  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>To Do List</Text>
      <TextInput 
      placeholder="Add a task..." 
      style={styles.textInputField} 
      onChangeText={text => onChangeText(text)}
      />
      <Button 
      title="Add to List" 
      onPress={addToList}
      />
      <ScrollView style={styles.scrollView}>
        {generateList}
      </ScrollView>
        
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  titleText: {
    fontSize: '20px',
  },
  textInputField: {
    display: 'inline',
    border: 'solid 1px #000',
    borderRadius: 5,
    width: '60%',
    height: '2em',
    lineHeight: '1em',
    padding: '0.5em',
    margin: '1em',
  },
  scrollView: {
    width: '100%'
  },
  listItemContainer: {
    alignItems: 'flex-start',
    width: '100%',
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 30,
    paddingLeft: 30,
  }
});
