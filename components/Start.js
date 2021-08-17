import React from 'react';
import { View, Text, TextInput, Button, ImageBackground, StyleSheet, TouchableOpacity  } from 'react-native';

export default class Screen1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
             name: "",
             changeColor: '',
            };

    }
    render() {
        return(
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center', fontFamily: 'Roboto'}}>
                <ImageBackground
                    style={styles.imgBKG}
                    source={require('../assets/Background_Image.png')}
                > 
                <View style={styles.mainTitle}>
                    <Text style={styles.title}>Welcome!</Text>
                </View>
                <TextInput style={styles.nameBox}
                    placeholder='Type Your Name Here'
                    onChangeText={(name) => this.setState({ name })}
                    value={this.state.name}
                />
                 <View>
                    <Text style={styles.backText}>Please Choose a Background Color:</Text>
                    <View style={styles.colorsBack}>
                        <TouchableOpacity
                            style={styles.colorOne}
                            onPress={() => this.setState({ changeColor: '#090C08'})}
                        />
                        <TouchableOpacity
                            style={styles.colorTwo}
                            onPress={() => this.setState({ changeColor: '#474056'})}
                        />
                        <TouchableOpacity
                            style={styles.colorThree}
                            onPress={() => this.setState({ changeColor: '#8A95A5'})}
                        />
                        <TouchableOpacity
                            style={styles.colorFour}
                            onPress={() => this.setState({ changeColor: '#B9C6AE'})}
                        />
                         <TouchableOpacity
                            style={styles.colorFive}
                            onPress={() => this.setState({ changeColor: '#FFFFFF'})}
                        />
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.chatButtn}
                    onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name, changeColor: this.state.changeColor })}>
                        <Text style={styles.text}>Let's Chat</Text>
                </TouchableOpacity>
                
                </ImageBackground>      
            </View>
        )
    }
}

const styles = StyleSheet.create({
    imgBKG: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    
    },

    nameBox: {
        height:40,
        borderWidth: 2,
        borderColor: 'gray',
        borderRadius: 2,
        fontSize: 16,
        fontWeight: "300",
        color: '#757083',
        paddingLeft: 15,
        backgroundColor:'white'
    },

    title: {
        flex: 0.5,
        fontSize: 46,
        textAlign: 'right',
        color: '#FFFFFF',
    },

    container: {
        flex:1,
    },

    chatButtn: {
        width: '50%',
        height: 40,
        backgroundColor: '#757083',
        color: '#FFFFFF',
        alignItems: 'center',
        fontWeight: 'bold',
        justifyContent: 'space-evenly',  
    },

    backText: { 
        textAlign: 'center',
        marginBottom: 5,
    },

    text: {
        color: '#FFFFFF',
        fontSize: 16,
    },

    colorsBack: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,

    },

    colorOne: {
        backgroundColor: '#090C08',
        width:25,
        height:25,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'black',
        opacity: 2,
      },

      colorTwo: {
        backgroundColor: '#474056',
        width:25,
        height:25,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'black',
        opacity: 2,
      },

      colorThree: {
        backgroundColor: '#8A95A5',
        width:25,
        height:25,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'black',
        opacity: 2,
      },

      colorFour: {
        backgroundColor: '#B9C6AE',
        width:25,
        height:25,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'black',
        opacity: 2,
      },

      colorFive: {
        backgroundColor: '#FFFFFF',
        width:25,
        height:25,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'black',
        opacity: 2,

      },
})