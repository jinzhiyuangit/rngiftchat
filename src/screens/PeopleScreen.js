import React from "react";
import gdata from "../utils/const";

import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';

export default class PeopleScreen extends React.Component {
  constructor(props){
    super(props);
    
    //const params = this.props.navigation.state.params;
    //this.onlineUsers = params ? params.onlineUsers: null;
    //this.onlineUsers = props.navigation.getParam('paraUsers', [{id: "onlyme", name: "onlyme"}])
    //console.log(`the onlineuser length is ${this.props.navigation.getParam('testaa',"bbbbb")}`);
    const { navigation } = this.props;
    this.onlineUsers = navigation.getParam('paraUsers', [{id: "onlyme", name: "onlyme"}]);
    console.log(`the onlineuser length is ${this.onlineUsers.length}`);
    this.currentUser = this.props.navigation.getParam('currentUserObj');
    console.log("the currentUserobj is", this.currentUser);
  }

    static navigationOptions = {
      tabBarLabel: 'People',
      tabBarIcon: ({ tintColor, focused, horizontal }) => (
        <Ionicons
          name={'ios-people'}
          size={horizontal ? 20 : 26}
          style={{ color: tintColor }}
        />
      ),
    };
    componentDidMount() {
      // this._s0 = this.props.navigation.addListener('willFocus', this._onEvent);
      // this._s1 = this.props.navigation.addListener('didFocus', this._onEvent);
      // this._s2 = this.props.navigation.addListener('willBlur', this._onEvent);
      // this._s3 = this.props.navigation.addListener('didBlur', this._onEvent);
    }
    componentWillUnmount() {
      // this._s0.remove();
      // this._s1.remove();
      // this._s2.remove();
      // this._s3.remove();
    }
    _onEvent = a => {
      console.log('EVENT ON PEOPLE TAB', a.type, a);
    };

    render() {
      
      return (
        <View style={styles.container}>
        {/*
          <Header text="Users">
            {this.props.userHasLoggedIn && (
              <TouchableOpacity onPress={this.props.leavePresenceRoom}>
                <View style={styles.leave_button}>
                  <Text style={styles.leave_button_text}>Logout</Text>
                </View>
              </TouchableOpacity>
            )}
            </Header>*/}
  
          <View style={styles.body}>
            {this.onlineUsers.length == 0 && (
              <View style={styles.activity}>
                <ActivityIndicator size="large" color="#05a5d1" />
                <Text style={styles.activity_text}>Loading users...</Text>
              </View>
            )}
  
            {this.onlineUsers.length > 0 && (
              <FlatList
                data={this.onlineUsers}
                renderItem={this.renderItem}
                keyExtractor={(item) => {
                  return item.id.toString();
                }}
              />
            )}
          </View>
        </View>
      );
    }
  
/*    beginChat = user => {
      let roomName = [user.id, this.currentUser.id];
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
                this.substheRoom(room.id, user.id);
              })
              .catch(err => {
                console.log(`error creating room ${err}`);
              });
          } else {
            this.substheRoom(chat_room.id, user.id);
          }
        })
        .catch(err => {
          console.log(`error getting joinable rooms: ${err}`);
        });
    };
 */ 
    sortUsers = () => {
      this.onlineUsers = this.props.navigation.getParam('onlineUsers');
      return this.onlineUsers.slice().sort((x, y) => {
        return y.is_online - x.is_online;
      });
    };  
/*
    substheRoom = (roomId, chatWith) => {
      this.roomId = roomId;
      this.chatWithUser = chatWith;
  
      this.currentUser
        .subscribeToRoom({
          roomId: roomId,
          hooks: {
            //onNewMessage: this.onReceiveMessage,
            onMessage: this.onReceiveMessage,
            onUserStartedTyping: this.onUserTypes,
            onUserStoppedTyping: this.onUserNotTypes
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
      this.props.navigation.navigate('Chat', {
        currentRoomId: roomId,
        chatWithUser: chatWith,
        currentUserObj: this.currentUser
      })
    };
*/

    beginChat = user => {
      console.log("the peoplescreen user is ", user);
      this.props.navigation.navigate('Chat', {
        chatWithUser: user,
        currentUserObj: this.currentUser,
      })
    }

    renderItem = ({ item }) => {
      let online_style = item.is_online ? 'online' : 'offline';
  
      return (
        <TouchableHighlight
          onPress={() => {
            console.log('now beginning chat...');
            this.beginChat(item);
          }}
          underlayColor="#f3f3f3"
          style={styles.list_item}>
          <View style={styles.list_item_body}>
            <View style={[styles.online_indicator, styles[online_style]]} />
  
            <Text style={styles.username}>{item.name}</Text>
          </View>
        </TouchableHighlight>
      );
    };
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 10,
      alignSelf: 'stretch',
    },
    leave_button: {
      marginRight: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#FFF',
    },
    leave_button_text: {
      color: '#FFF',
      fontSize: 16,
    },
    activity: {
      flex: 1,
      alignItems: 'center',
      marginTop: 10,
    },
    activity_text: {
      fontSize: 14,
      color: '#484848',
    },
    body: {
      flex: 9,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    list_item: {
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    list_item_body: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    online_indicator: {
      width: 10,
      height: 10,
      borderRadius: 10,
    },
    online: {
      backgroundColor: '#3ec70f',
    },
    offline: {
      backgroundColor: '#ccc',
    },
    username: {
      marginLeft: 10,
      fontSize: 16,
    },
  });
  