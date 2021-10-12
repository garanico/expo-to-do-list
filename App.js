import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
} from "react-native";

export default function App() {
  
  const [items, setItems] = useState([]); //items is the name of the array that holds all of the to-do list tasks
  const [newItemText, setNewItemText] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [dialogResponse, setDialogResponse] = useState(false);

  const generateList = items.map((item, index) => (
    <View key={index} style={styles.listItemContainer}>
      <Text>{item.todo}</Text>
    </View>
  ));

  //it's changing variable text to the variable newItemText.
  const onChangeText = (text) => {
    newItemText = text;
  };
  const checkIfSame = () => {
    for (let i = 0; i < items.length; i++) {
      if (
        items[i].todo.toLocaleLowerCase() === newItemText.toLocaleLowerCase()
      ) {
        return true;
      } else {
        return false;
      }
    }
  };
  const checkIfValid = () => {
    if (newItemText.length > 0 && isNaN(newItemText)) {
      if (checkIfSame()) {
        setShowDialog(true);
      } else {
        addToList();
      }
    } else {
      console.log("Incorrect input");
    }
  };


  const dialogAction = (action) => {
    setDialogResponse(action?true:false);
    setShowDialog(false);
  }
  const addToList = () => {
    setItems([...items, { todo: newItemText }]);
    setNewItemText("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>To Do List</Text>

      {showDialog && (<View style={styles.displayContainer}>
          <Text>{`${newItemText} is already on the list.`}</Text>
          <Button
            title="OK"
            onPress={() => setShowDialog(!showDialog)}
          />
      </View>)}

      <TextInput
        placeholder="Add a task..."
        style={styles.textInputField}
        onChangeText={(text) => setNewItemText(text)}
        value={newItemText}
      />
      <Button title="Add to List" onPress={checkIfValid} />
      <Button title="Clear" onPress={() => setNewItemText("")} />
      <ScrollView style={styles.scrollView}>{generateList}</ScrollView>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  titleText: {
    fontSize: "20px",
  },
  textInputField: {
    display: "inline",
    border: "solid 1px #000",
    borderRadius: 5,
    width: "60%",
    height: "2em",
    lineHeight: "1em",
    padding: "0.5em",
    margin: "1em",
  },
  scrollView: {
    width: "100%",
  },
  listItemContainer: {
    alignItems: "flex-start",
    width: "100%",
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 30,
    paddingLeft: 30,
  },
  displayContainer: {
    flex: 1,
    backgroundColor: '#fff',
    border: 'red solid 2px',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 30,
  },
  dialogContainer : {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialog: {
    border: 'solid 1px #000',
    margin: '0 auto',
    borderRadius: 5,
    padding: 30,
    backgroundColor: '#FFF',
  },
  buttonActions : {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 30,
  },
  responseValue: {
    border: 'solid 1px #000',
    padding: 20,
    borderRadius: 5,
    marginTop: 30,
  },
});
