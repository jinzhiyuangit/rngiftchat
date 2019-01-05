/*
 * Copyright (c) 2011-2018, Zingaya, Inc. All rights reserved.
 */

'use strict';

import React, { Component } from 'react';
import { 
    createStackNavigator, 
    createSwitchNavigator, 
    createAppContainer, 
    createBottomTabNavigator
} from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';
import RCTWebRTCDemo from '../screens/WebRTCScreen';
import SettingsScreen from '../screens/SettingsScreen';
import DiscScreen from '../screens/DiscScreen';
import SingleChatScreen  from '../screens/SingleChatScreen';
import PersonDetailScreen from '../screens/PersonDetailScreen';
//import CallScreen from '../screens/CallScreen';
//import IncomingCallScreen from '../screens/IncomingCallScreen';
import PeopleScreen from '../screens/PeopleScreen';
import ChatScreen from '../screens/ChatScreen';
import WebrtcVideoScreen from '../screens/WebrtcVideoScreen';
import WebrtcAudioScreen from '../screens/WebrtcAudioScreen';
import ProfileScreen from '../screens/ProfileScreen';

import COLOR from '../styles/Color';
import Ionicons from 'react-native-vector-icons/Ionicons';

/*const AppStack = createStackNavigator(
    {
        Main: {
            screen: MainScreen,
        },
        Settings: {
            screen: SettingsScreen,
        }
    },
    {
        headerLayoutPreset: "center",
        navigationOptions: {
            headerStyle: {
                backgroundColor: COLOR.PRIMARY,
            },
            headerTintColor: COLOR.WHITE,
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    }
);
/*        Home: {
            screen: AppStack,
            path: 'video',
            navigationOptions: {
                tabBarLabel: 'Home',
                tabBarIcon: ({ tintColor, focused, horizontal }) => (
                    <Ionicons
                        name={'ios-home'}
                        size={horizontal ? 20 : 26}
                        style={{ color: tintColor }}
                    />
                ),
            },
        },
        */

const BtmTabStack = createBottomTabNavigator(
    {
        Chat: {
            screen: ChatScreen,
            path: 'chat'
        },

        People: {
            screen: PeopleScreen,
            path: 'people',
        },
        Discovery: {
            screen: DiscScreen,
            path: 'webrtc',
        },
        Setting: {
            screen: SettingsScreen,
            path: 'setting',
        }
    },
    {
        tabBarOptions: {
            activeTintColor: '#e91e63',
        },
    }
);

const MainStacks = createStackNavigator({
    Root: {
        screen: BtmTabStack,
    },
    SingleChat: {
        screen: SingleChatScreen,
    },
    PersonDetail: {
        screen: PersonDetailScreen,
    },
    WebrtcVideo: {
        screen: WebrtcVideoScreen,
    },
    WebrtcAudio: {
        screen: WebrtcAudioScreen,
    },
});

const RootStack = createSwitchNavigator(
    {
        Login: LoginScreen,
        Main: MainStacks,
    },
    {
        initialRouteName: 'Login',
    }
);

const AppContainer = createAppContainer(RootStack);

export default AppContainer;


