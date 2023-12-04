import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';

const App = () => {
  const [text, setText] = useState('');
  const [items, setItems] = useState([]);
  const [editId, setEditId] = useState(null);
  const scheme = useColorScheme();

  const selectedTheme = scheme === 'light' ? DarkTheme : DefaultTheme;

  const saveItemsToStorage = async (items) => {
    try {
      await AsyncStorage.setItem('todoItems', JSON.stringify(items));
    } catch (error) {
      console.error('Error saving items to AsyncStorage:', error.message);
    }
  };

  const getItemsFromStorage = async () => {
    try {
      const storedItems = await AsyncStorage.getItem('todoItems');
      return storedItems ? JSON.parse(storedItems) : [];
    } catch (error) {
      console.error('Error retrieving items from AsyncStorage:', error.message);
      return [];
    }
  };

  const addItem = async () => {
    if (text !== '') {
      try {
        const updatedItems = editId !== null
          ? items.map((item) => (item.id === editId ? { ...item, text } : item))
          : [...items, { text, id: Date.now() }];

        setItems(updatedItems);
        setEditId(null);
        setText('');

        // Save the updated items to AsyncStorage
        await saveItemsToStorage(updatedItems);
      } catch (error) {
        console.error('Error adding item:', error.message);
      }
    }
  };

  const deleteItem = async (id) => {
    try {
      const updatedItems = items.filter((item) => item.id !== id);
      setItems(updatedItems);
      if (editId === id) {
        setEditId(null);
      }

      // Save the updated items to AsyncStorage
      await saveItemsToStorage(updatedItems);
    } catch (error) {
      console.error('Error deleting item:', error.message);
    }
  };

  const editItem = async (id) => {
    try {
      const itemToEdit = items.find((item) => item.id === id);
      if (itemToEdit) {
        setText(itemToEdit.text);
        setEditId(id);
      }
    } catch (error) {
      console.error('Error editing item:', error.message);
    }
  };

  // Load items from AsyncStorage on component mount
  useEffect(() => {
    const loadItems = async () => {
      try {
        const storedItems = await getItemsFromStorage();
        setItems(storedItems);
      } catch (error) {
        console.error('Error loading items:', error.message);
      }
    };

    loadItems();
  }, []);

  return (
<NavigationContainer theme={selectedTheme}>
    <View style={myStyles.header}>
      <Text style={myStyles.headerText}>Todo App</Text>

      <View style={myStyles.inputContainer}>
        <TextInput
          placeholder="Enter the items"
          style={myStyles.input}
          value={text}
          onChangeText={text => setText(text)}
        />
        <TouchableOpacity style={myStyles.appButtonContainer} onPress={addItem}>
          <Text style={myStyles.appButtonText}>
            {editId !== null ? 'Update' : 'Add Item'}
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={myStyles.todos}
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={myStyles.listItem}>
            <View style={myStyles.itemText}>
              <Text style={{color: 'black'}}>{item.text}</Text>
            </View>
            <View style={myStyles.buttons}>
              <TouchableOpacity
                style={myStyles.edit}
                onPress={() => editItem(item.id)}>
               <Text style={{ color: 'white'}}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={myStyles.delete}
                onPress={() => deleteItem(item.id)}>
               <Text style={{ color: 'white'}}>Delete</Text>           
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
    </NavigationContainer>
  );
};

const myStyles = StyleSheet.create({
  header: {
    width: '100%',
    alignItems: 'center',
  },
  headerText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    backgroundColor: 'lightblue',
    padding: 10,
    width: '100%',
  },

  inputContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },

  input: {
    borderWidth: 1,
    width: '75%',
    paddingLeft: 15
  },

  appButtonText: {
    padding: 10,
    fontWeight: 'bold',
  },

  appButtonContainer: {
    backgroundColor: 'lightblue',
    borderRadius: 40,
    marginLeft: 5,
    borderWidth: 1,
    borderColor: 'black'
  },

  itemText: {
    width: '60%'
  },

  buttons: {
    flexDirection: 'row',
    width: '30%',
  },
  listItem: {
    padding: 10,
    marginTop: 7,
    borderWidth: 1,
    borderColor: 'black',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'lightblue'
  },
  delete: {
    width: '45%',
    backgroundColor: '#373f51',
    color: 'white',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10
  },
  edit: {
    width: '45%',
    backgroundColor: '#463730',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white'

  },
  todos: {
    width: '90%',
  },
});

export default App;