
'use strict';
import React from "react";
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
import styles from '../styles/Styles';

export default class ChatScreen extends React.Component {
    render() {
        return (
            <SafeAreaView style={styles.safearea}>
                <View>Setting screen</View>
            </SafeAreaView>
        );
    }
}
