import React from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";

//gifted chat library
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";

//firebase
import firebase from "firebase";
require("firebase/firestore");

//import AsyncStorage
import { AsyncStorage } from "react-native";

//import NetInfo
import NetInfo from "@react-native-community/netinfo";

//import CustomActions 
import CustomActions from "./CustomActions";

//import MapView
import MapView from "react-native-maps";



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
      measurementId: "G-5BHLFJCSQ0",
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    this.referenceChatMessages = firebase.firestore().collection("messages");
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: "",
        name: "",
        avatar: "",
      },
      isConnected: false,
      image: null,
      location: null,

    };
  }
  // adding component for making message from state
  componentDidMount = () => {
    const { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });
    NetInfo.fetch().then((connection) => {
      if (connection.isConnected) {
        this.setState({ "isConnected": true });
        console.log("online");
      } else {
        console.log("offline");
      }
    });
    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      } 
        this.setState({
            uid: user.uid,
            user: {
              _id: user.uid,
              name: name,
              avatar: 'https://placeimg.com/140/140/any',
            },
            messages: [],
        }); 
        //this.set.state ({ user: {_id:user.uid, name: this.props.route.params} });
        this.unsubscribe = this.referenceChatMessages
          .orderBy("createdAt", "desc")
          .onSnapshot(this.onCollectionUpdate);
        this.getMessages();
        //    this.setState({ isConnected: false})
        //}
        //this.setState({ isConnected: false});
      
    });
  }

  // render the default inputToolbar
  renderInputToolbar = (props) => {
    console.log(this.state.isConnected);
    if (this.state.isConnected == false) {
    } else {
      return (
        <InputToolbar
          {...props}
        />
      );
    }
  }

  componentWillUnmount() {
    this.unsubscribe();
    this.authUnsubscribe();
  }

  //get messages from AsyncStorage
  async getMessages() {
    let messages = "";
    try {
      messages = await AsyncStorage.getItem("messages") || [];
      this.setState({
        messages: [...JSON.parse(messages), ...this.state.messages]
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  //delete messages from AsyncStorage
  async deleteMessages() {
    try {
      await AsyncStorage.removeItem("messages");
      this.setState({
        messages: [],
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  addMessage() {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      _id: message._id,
      createdAt: message.createdAt,
      text: message.text || null,
      user: message.user,
      image: message.image || null,
      location: message.location || null,
    });
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text || null,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar,
        },
        image: data.image,
        location: data.location,
      });
    });
    this.setState({
      messages,
    });
  };

  //store messages
  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }), () => {
      this.addMessage();
      this.saveMessages();
    });
  }

  //save messages
  async saveMessages() {
    try {
      await AsyncStorage.setItem(
        'messages',
        JSON.stringify(this.state.messages),
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  // this allows us to change color of the chat bubble
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#1976D2",
          },
        }}
      />
    );
  }

   renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };

  // custom view for the maps
  renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ borderRadius: 13, height: 150, margin: 3, width: 200, }}
          showsUserLocation={true}
          region={{
            latitude: Number(currentMessage.location.latitude),
            longitude: Number(currentMessage.location.longitude),
            latitudeDelta: 1.2,
            longitudeDelta: 1,
          }}
        />
      );
    }
    return null;
  }

  render() {
    const { changeColor } = this.props.route.params;
    return (
      <View style={{ flex: 1, backgroundColor: changeColor }}>
        <GiftedChat
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          renderBubble={this.renderBubble.bind(this)}
          renderActions={this.renderCustomActions}
          renderCustomView={this.renderCustomView}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={
            this.state.user
          }
        />
        {Platform.OS === "android"
          ? <KeyboardAvoidingView behavior="height" />
          : null}
      </View>
    );
  }
}