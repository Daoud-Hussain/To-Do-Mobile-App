import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const App = () => {
    const [text, setText] = useState('');
    const [items, setItems] = useState([]);
    const [editId, setEditId] = useState(null); // To keep track of the item being edited

    const addItem = () => {
        if (text !== '') {
            if (editId !== null) {
                // If an item is being edited, update it
                const updatedItems = items.map((item) => {
                    if (item.id === editId) {
                        return { ...item, text };
                    }
                    return item;
                });
                setItems(updatedItems);
                setEditId(null); // Clear the edit state
            } else {
                setItems([...items, { text, id: Date.now() }]);
            }
            setText('');
        }
    };

    const deleteItem = (id) => {
        // Use filter to remove the item with the specified id
        const updatedItems = items.filter(item => item.id !== id);
        setItems(updatedItems);
        if (editId === id) {
            setEditId(null); // Clear the edit state if the edited item is deleted
        }
    };

    const editItem = (id) => {
        // Set the item's text in the input field for editing
        const itemToEdit = items.find((item) => item.id === id);
        if (itemToEdit) {
            setText(itemToEdit.text);
            setEditId(id);
        }
    };

    return (
        <View style={myStyles.header}>
            <Text style={myStyles.headerText}>Todo App</Text>

            <View style={myStyles.inputContainer}>
                <TextInput
                    placeholder="Enter the items"
                    style={myStyles.input}
                    value={text}
                    onChangeText={(text) => setText(text)}
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
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={myStyles.listItem}>
                        <Text>{item.text}</Text>
                        <TouchableOpacity style={myStyles.edit}  onPress={() => editItem(item.id)}>
                            <Text style={{ color: 'blue' }}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={myStyles.delete} onPress={() => deleteItem(item.id)}>
                            <Text style={{ color: 'red'}}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
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
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
    },

    input: {
        borderWidth: 1,
        width: '80%',
    },

    appButtonText: {
        padding: 10,
        fontWeight: 'bold',
    },

    appButtonContainer: {
        backgroundColor: 'lightblue',
        borderRadius: 50,
        marginLeft: 5,
    },

    listItem: {
        padding: 10,
        marginTop: 5,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between', // Add this line
    },
    delete: {
        width: '20%',
        borderWidth: 1,
        justifyContent: 'center', // Center content vertically
        alignItems: 'center',     // Center content horizontally
    },
    edit: {
        width: '20%',
        borderWidth: 1,
        justifyContent: 'center', // Center content vertically
        alignItems: 'center',     // Center content horizontally
    },
    todos: {
        width: '80%'
    }
});

export default App;