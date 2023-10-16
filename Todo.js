import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const App = () => {
    const [text, setText] = useState('');
    const [items, setItems] = useState([]);

    const addItem = () => {
        if (text !== '') {
            setItems([...items, { text, id: Date.now() }]);
            setText('');
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
                    <Text style={myStyles.appButtonText}>Add Item</Text>
                </TouchableOpacity>
            </View>

            <FlatList style = {myStyles.todos}
                data={items}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={myStyles.listItem}>
                        <Text>{item.text}</Text>
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
    },
    todos: {
        width: '80%'
    }
});

export default App;