import React, { useState } from 'react';
import { View,TextInput,onPressLearnMore,  Button, Text, TouchableOpacity, StyleSheet } from 'react-native';


const App = () => {
    return (
        <View style={myStyles.header}>
            <Text style={myStyles.headerText}> Todo App</Text>

            <View style = {myStyles.inputContainer}>
                <TextInput placeholder="Enter the items" style={myStyles.input}>
                </TextInput>
             
                <TouchableOpacity  style={myStyles.appButtonContainer} >
                <Text style={myStyles.appButtonText}>Add Item</Text>

                </TouchableOpacity>
                
            </View>
        </View>

    )
}

const myStyles = StyleSheet.create({
    header: {
       width: '100%',
    },
    headerText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        backgroundColor: 'lightblue',
        padding: 10,
    },

    inputContainer: {
        width: '80%', 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,    
    } ,

    input: {
        borderWidth: 1,
        width: '80%'

    }, 

    appButtonText: {
        padding: 10,
    },

    appButtonContainer: {
        backgroundColor: "lightblue",
        borderRadius: 50,
    }
   
});
export default App;