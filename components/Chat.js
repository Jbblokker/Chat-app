import React from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

export default class Screen2 extends React.Component {
    constructor() {
        super();
        this.state = {
            messages: [],
        }
    }
// adding component for making message from state
    componentDidMount = () => {
       const { name } = this.props.route.params
       this.props.navigation.setOptions({ title: name});
        this.setState({
            messages: [
                {
                    _id: 1,
                    text:`Hello ${name}`,
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                        
                },
                {
                    _id: 2,
                    text: 'This is a system message' ,
                    createdAt: new Date(),
                    system: true,
                },
            ],
        });
    }
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

