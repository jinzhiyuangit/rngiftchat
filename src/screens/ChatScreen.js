import React from "react";
import { GiftedChat, utils } from "react-native-gifted-chat";

import Chatkit from "@pusher/chatkit-client";

const CHATKIT_INSTANCE_LOCATOR = "d6b422d1-6fd4-4271-8953-4bd711965dbd";
const CHATKIT_TOKEN_PROVIDER_ENDPOINT =
`https://us1.pusherplatform.io/services/chatkit_token_provider/v1/${CHATKIT_INSTANCE_LOCATOR}/token`;
const CHATKIT_ROOM_ID = "19375885";
const CHATKIT_USER_NAME = "zhiyuan";

export default class ChatScreen extends React.Component {
  state = {
    messages: []
  };
  constructor(props){
    super(props);
    this.currentUser = null;
    this.roomId = "111";
    this._chatWithUser = this.props.navigation.getParam('chatWithUser');
    this.currentUser = this.props.navigation.getParam('currentUserObj');
  }

  componentDidMount() {
    /*
    const tokenProvider = new Chatkit.TokenProvider({
      url: CHATKIT_TOKEN_PROVIDER_ENDPOINT
    });

    const chatManager = new Chatkit.ChatManager({
      instanceLocator: `v1:us1:${CHATKIT_INSTANCE_LOCATOR}`,
      userId: CHATKIT_USER_NAME,
      tokenProvider: tokenProvider
    });

    chatManager.connect().then(currentUser => {
      this.currentUser = currentUser;
      this.currentUser.subscribeToRoom({
        roomId: CHATKIT_ROOM_ID,
        hooks: {
          onMessage: this.onReceive.bind(this)
        }
      });
    });
   */

    this.beginChat();
  }


  beginChat = () => {
    console.log("run the beginChat function")
    let roomName = [this._chatWithUser.id, this.currentUser.id];
    roomName = roomName.sort().join("_") + "_room";

    this.currentUser
      .getJoinableRooms()
      .then(rooms => {
        var chat_room = rooms.find(room => {
          return room.name == roomName;
        });

        if (!chat_room) {
          this.currentUser
            .createRoom({
              name: roomName,
              private: false // so they could find it in joinable rooms
            })
            .then(room => {
              this.substheRoom(room.id, this._chatWithUser.id);
            })
            .catch(err => {
              console.log(`error creating room ${err}`);
            });
        } else {
          this.substheRoom(chat_room.id, this._chatWithUser.id);
        }
      })
      .catch(err => {
        console.log(`error getting joinable rooms: ${err}`);
      });
  };

  /*sortUsers = () => {
    this.onlineUsers = this.props.navigation.getParam('onlineUsers');
    return this.onlineUsers.slice().sort((x, y) => {
      return y.is_online - x.is_online;
    });
  };  */

  substheRoom = (roomId, chatWith) => {
    console.log("run the substheRoom function")
    this.roomId = roomId;
    this.chatWithUser = chatWith;
    console.log("get the roomid is ", this.roomId);

    this.currentUser
      .subscribeToRoom({
        roomId: roomId,
        hooks: {
          //onNewMessage: this.onReceiveMessage,
          onMessage: this.onReceive.bind(this),
          //onUserStartedTyping: this.onUserTypes,
          //onUserStoppedTyping: this.onUserNotTypes
        },
        messageLimit: 5
      })
      .then(room => {
        this.setState({
          inChatRoom: true
        });
        console.log(`successfully subscribed to room`);
      })
      .catch(err => {
        console.log(`error subscribing to room: ${err}`);
      });
  };


  onReceive(data) {
    console.log("run the onReceive");
    const { id, senderId, text, createdAt } = data;
    const incomingMessage = {
      _id: id,
      text: text,
      createdAt: new Date(createdAt),
      user: {
        _id: senderId,
        name: senderId,
        avatar:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmXGGuS_PrRhQt73sGzdZvnkQrPXvtA-9cjcPxJLhLo8rW-sVA"
      }
    };

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, incomingMessage)
    }));
  }

  onSend([message]) {
    this.currentUser.sendMessage({
      text: message.text,
      roomId: this.roomId
    });
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: this.currentUser.id
        }}
      />
    );
  }
}