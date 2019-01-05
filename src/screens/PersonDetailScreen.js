
'use strict';
import React from "react";
import {
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import styles from '../styles/Styles';
import Button from "../components/Button";

export default class PersonDetailScreen extends React.Component {

    _enterChat = () => {
        console.log("PersonDetailScreen.js click _enterChat. goto ChatScreen" );
        this.props.navigation.navigate("SingleChat");
    }

    _videoChat = () => {
        console.log("PersonDetailScreen.js click _videoChat. goto webrtcvideo");
        this.props.navigation.navigate("WebrtcVideo");
    }

    _audioChat = () => {
        console.log("PersonDetailScreen.js click _videoChat. goto webrtcaudio");
        this.props.navigation.navigate("WebrtcAudio");
    }

    render() {
        return (
            <SafeAreaView style={styles.safearea}>
                <View>
                    <TouchableOpacity onPress={() => this._enterChat()} style={{ width: 220, alignSelf: 'center' }}>
                        <Text style={styles.loginbutton}>
                            send message
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this._videoChat()} style={{ width: 220, alignSelf: 'center' }}>
                        <Text style={styles.loginbutton}>
                            video call
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this._audioChat()} style={{ width: 220, alignSelf: 'center' }}>
                        <Text style={styles.loginbutton}>
                            audio call
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}
