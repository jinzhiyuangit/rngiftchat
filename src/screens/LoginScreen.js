/*
 * Copyright (c) 2011-2018, Zingaya, Inc. All rights reserved.
 */

'use strict';

import React from 'react';
import {
    Text,
    View,
    TextInput,
    Platform,
    Modal,
    TouchableHighlight,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    AsyncStorage
} from 'react-native';

//import LoginManager from '../manager/LoginManager';
import Chatkit, { ChatManager, TokenProvider } from "@pusher/chatkit-client";
import COLOR_SCHEME from '../styles/ColorScheme';
import COLOR from '../styles/Color';
import styles from '../styles/Styles';

//let _this;
const instanceLocatorId = "d6b422d1-6fd4-4271-8953-4bd711965dbd";
const presenceRoomId = "19375885"; // room ID of the general room created through the chatKit inspector
const chatServer = "http://salt.intviu.cn:3000/users";

const tokenProvider = new TokenProvider({
  url: `https://us1.pusherplatform.io/services/chatkit_token_provider/v1/${instanceLocatorId}/token`
});

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.password = '';
        this.state = {
            username: '',
            isModalOpen: false,
            modalText: '',
            userHasLoggedIn: false,
            users: [],
            presenceRoomId: null,
            currentRoomId: null,
            chatWithUser: null,
            message: "",
            messages: [],
            chatWithUserIsTyping: false,
            refreshing: false,
            inChatRoom: false
        }
    }

    componentDidMount() {
        //_this = this;
        //(async() => {
        //    const usernameValue = await AsyncStorage.getItem('usernameValue');
        //    _this.setState({username: usernameValue});
        //})();
        //LoginManager.getInstance().on('onConnectionFailed', (reason) => this.onConnectionFailed(reason));
        //LoginManager.getInstance().on('onLoggedIn', (displayName) => this.onLoggedIn(displayName));
        //LoginManager.getInstance().on('onLoginFailed', (errorCode) => this.onLoginFailed(errorCode));
    }


    updateUsername = username => {
        this.setState({
          username
        });
    };
    
    enterChat = () => {
        this.props.navigation.navigate('Main')
        //console.log("start create user finish. send a request to nodeserver");
    /*    fetch(chatServer, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: this.state.username
            })
        }).then(response => {
            //console.log("create user finish. get a response from nodeserver");
            this.chatManager = new ChatManager({
                instanceLocator: `v1:us1:${instanceLocatorId}`,
                userId: this.state.username,
                tokenProvider
            });
            //console.log("create chatManager finish.");
            this.chatManager.connect({ 
                onAddedToRoom: room => {
                    console.log(`Added to room ${room.name}`)
                },
                onRemovedFromRoom: room => {
                    console.log(`currentuser removed from room ${room.name}`)
                },
                onRoomUpdated: room => {
                    console.log(`the room was updated ${room.name}`)
                },
                onRoomDeleted: room => {
                    console.log(`delete the room ${room.name}`)
                }
            })
            .then(
                currentUser => {
                    this.currentUser = currentUser;
                    //console.log("connect chatManager finish.");
                    this.setState({
                        presenceRoomId: presenceRoomId
                    });
                    currentUser.subscribeToRoom({
                        roomId: presenceRoomId,
                        hooks: {
                            //onMessage: message => {
                            //    console.log(`get a new message ${message.text}`);
                            //},
                            onUserStartedTyping: user => {
                                console.log(`user start typing ${user.name}`);
                            },
                            onUserStoppedTyping: user => {
                                console.log(`user stop typing ${user.name}`);
                            },
                            onUserJoined: user => {
                                console.log(`user joined this room ${user.name}`);
                            },
                            onUserLeft: user => {
                                console.log(`user left this room ${user.name}`);
                            },
                            onPresenceChanged: (state, user) => {
                                console.log(`user ${user.name}, changed status to ${state.current}`);
                            }
                        }
                    })
                    .then(room => {
                        //console.log("subscribeToRoom finish.");
                        let new_users = [];
                        room.users.forEach(user => {
                            if (user.id != this.currentUser.id) {
                                let is_online =
                                user.presence.state == "online" ? true : false;
                                new_users.push({
                                    id: user.id,
                                    name: user.name,
                                    is_online
                                });
                            }
                        });
                        console.log(`the users is null ? ${new_users.length}`);
                        this.setState({
                            userHasLoggedIn: true,
                            users: new_users
                        });
                        //(async() => {
                        //    await AsyncStorage.setItem('onlineUsers', this.state.users);
                        //})();
                        //this.props.navigation.setParams({testaa: "aaaaaa"});
                        this.props.navigation.navigate('Main')
                    })
                    .catch(err => {
                        console.log(`Error joining room ${err}`);
                    });
                })
                .catch(error => {
                    console.log("error with chat manager", error);
                });
            })
            .catch(error => {
                console.log("error in request: ", error);
            });
        */  };

    render() {
        return (
            <SafeAreaView style={styles.safearea}>
                <StatusBar barStyle={Platform.OS === 'ios' ? COLOR_SCHEME.DARK : COLOR_SCHEME.LIGHT} backgroundColor={COLOR.PRIMARY_DARK} />
                <View style={[styles.container]}>
                    <View>
                        <View style={styles.loginform}>
                            <TextInput
                                underlineColorAndroid='transparent'
                                style={styles.forminput}
                                placeholder="Enter your username"
                                value={this.state.username}
                                autoFocus={true}
                                autoCapitalize='none'
                                autoCorrect={false}
                                //onSubmitEditing={() => this._focusNextField('password')}
                                onChangeText={(text) => { this.setState({username: text}) }}
                                blurOnSubmit={false} />
                            <TextInput
                                underlineColorAndroid='transparent'
                                style={styles.forminput}
                                placeholder="User password"
                                secureTextEntry={true}
                                ref='password'
                                onChangeText={(text) => { this.password = text }}
                                blurOnSubmit={true} />
                            <TouchableOpacity onPress={() => this.enterChat()} style={{ width: 220, alignSelf: 'center' }}>
                                <Text style={styles.loginbutton}>
                                    LOGIN
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.enterChat()} style={{ width: 220, alignSelf: 'center' }}>
                                <Text style={styles.loginbutton}>
                                    LOGIN WITH ONE TIME KEY
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Modal
                        animationType='fade'
                        transparent={true}
                        visible={this.state.isModalOpen}
                        onRequestClose={() => { }}>
                        <TouchableHighlight
                            onPress={(e) => this.setState({ isModalOpen: false })}
                            style={styles.container}>
                            <View style={[styles.container, styles.modalBackground]}>
                                <View
                                    style={[styles.innerContainer, styles.innerContainerTransparent]}>
                                    <Text>{this.state.modalText}</Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                    </Modal>
                </View>
            </SafeAreaView>
        );
    }
}