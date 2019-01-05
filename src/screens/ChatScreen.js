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
    AsyncStorage,
    StyleSheet,
    FlatList
} from 'react-native';

export default class ChatScreen extends React.Component {

    constructor(props){
        super(props);
        this.usersdemo = [
            {name: 'aaa', id: 'aaa', is_online: true},
            {name: 'bbb', id: 'bbb', is_online: true},
            {name: 'ccc', id: 'ccc', is_online: false},
            {name: 'ddd', id: 'ddd', is_online: false},
            {name: 'eee', id: 'eee', is_online: false},
            {name: 'fff', id: 'fff', is_online: true},
        ];
        this.state = {
            messages: []
        };
    }

    componentDidMount() {
    }

    _beginChat = (item) => {
        console.log("ChatScreen.js _beginChat ", item);
        this.props.navigation.navigate('SingleChat')
    }

    _renderItem = ({ item }) => {
        console.log("aaaaaaa");
        let online_style = item.is_online ? 'online' : 'offline';

        return (
            <TouchableHighlight
                onPress={() => {
                    console.log('now beginning chat...');
                    this._beginChat(item);
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

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.body}>
                    <FlatList
                        data={this.usersdemo}
                        renderItem={this._renderItem}
                        //extraData={this.state}
                        keyExtractor={(item) => {
                            return item.id.toString();
                        }}
                    />
                </View>
            </View>
        );
    }
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
  