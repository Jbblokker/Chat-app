import React from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
//gifted chat library
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

//firebase 
const firebase = require('firebase/app').default;
require ('firebase/firestore');

export default class Screen2 extends React.Component {
    constructor() {
        super();
        // firebase configuration code
        const firebaseConfig = {
            apiKey: "AIzaSyB7A_zlpotJmHqPJrfHxcnEjcMyf3i7J-4",
            authDomain: "chat-app-4d3c3.firebaseapp.com",
            projectId: "chat-app-4d3c3",
            storageBucket: "chat-app-4d3c3.appspot.com",
            messagingSenderId: "632205781707",
            appId: "1:632205781707:web:1773a5ddb7353954d5c94e",
            measurementId: "G-5BHLFJCSQ0"
        };
        
        if (!firebase.apps.length){
            firebase.initializeApp(firebaseConfig)
        };
        this.referenceChatMessages = firebase.firestore().collection("messages");
        this.state = {
            messages: [],
            user: {
                _id:"",
                name:"",
                avatar:"",
            }

        };
    }
// adding component for making message from state
    componentDidMount = () => {
       const { name } = this.props.route.params
       this.props.navigation.setOptions({ title: name});
       this.referenceMessages = firebase.firestore().collection('messages');
       this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          firebase.auth().signInAnonymously();
        }
       this.unsubscribe = this. referenceMessages.onSnapshot(this.onCollectionUpdated) 
        this.setState({
                    _id: 1,
                    text:`Hello ${name}`,
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                    messages: [],
        });
        this.unsubscribe = this.referenceChatMessages
        .orderBy("createdAt", "desc")
        .onSnapshot(this.onCollectionUpdate);
    });
    };

    componentWillUnmount() {
        this.unsubscribe();
    }

    addMessage() {
        const message = this.state.messages[0];
        this.referenceChatMessages.add({
          _id: message._id,
          createdAt: message.createdAt,
          text: message.text || null,
          user: message.user,
          image: message.image || null,
          location: message.location || null
        });
      }

    onCollectionUpdate = (querySnapshot) => {
        const messages = [];
        // go through each document
        querySnapshot.forEach((doc) => {
          // get the QueryDocumentSnapshot's data
          const data = doc.data();
          lists.push({
            _id: data._id,
            text: data.text || null,
            CreatedAt: Data.createdAt.toDate(),
            user: {
                _id: data._id,
                name: data.user.name,
                avatar: data.user.avatar,
            },
            image: data.image || '',
            location: data.location || null,
          });
        });
        this.setState({
          messages,
        });
      };   
  
// allowing user to send messages 
    onSend(messages = []) {
        this.setState((previousState) => ({
            messages: GiftedChat.append
            (previousState.messages, messages),
        }));
    }
// this allows us to change color of the chat bubble
    renderBubble(props) { 
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#000'
                    }
                }}
            />
        )

    }

    
    render() {
         const { changeColor } = this.props.route.params
        return (
           <View style={{ flex:1, backgroundColor: changeColor, }}>
            <GiftedChat
                renderBubble={this.renderBubble.bind(this)}
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                user={{
                    _id:1,
                }}
            />
            { Platform.OS ==='android' ? <KeyboardAvoidingView behavior="height" /> : null}
           </View>
            
        );
    };
}

