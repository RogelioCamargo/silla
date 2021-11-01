import React, {useEffect, useRef, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import socket from '../socket';

// import compone nts
import {Screen, Text} from '../components/atoms';
import {MessageInput} from '../components/molecules';

// import default styles
import {colors, fontSize, padding} from '../styles';
import axios from 'axios';

export default function MessageDetailsScreen({navigation, route}) {
  const conversation = route.params;

  // redux
  const state = useSelector(state => state);

  // local state
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const scrollViewRef = useRef();

  // on mount
  useEffect(() => {
    //socket.emit('join room', conversation);
    fetchMessages();
    socket.on('new message', msg => {
      setMessages(oldMessages => [...oldMessages, msg]);
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // methods
  const fetchMessages = async () => {
    try {
      const {data} = await axios.get(
        `http://localhost:5000/messages/search/conversation/${conversation}`,
      );
      setMessages(data);
    } catch (error) {
      console.log(error);
    }
  };

  const sendNewMessage = async () => {
    const newMessage = {
      author: state.user.userInfo._id,
      content: message,
      conversation: conversation,
    };
    try {
      const {data} = await axios.post(
        'http://localhost:5000/messages/create',
        newMessage,
      );
      await axios.put(
        `http://localhost:5000/conversations/update/${conversation}`,
        {latestMessage: message},
      );
      socket.emit('new message', {msg: {...data}, to: conversation});
      setMessage('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Screen style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}
        style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{
            flexDirection: 'column',
            flexGrow: 1,
            justifyContent: 'flex-start',
          }}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({animated: true})
          }
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}>
          <TouchableOpacity activeOpacity={1} onPress={Keyboard.dismiss}>
            <View>
              {messages.map((msg, index) => {
                return state.user.userInfo._id === msg.author ? (
                  <View
                    key={index}
                    style={{alignItems: 'flex-end', marginVertical: 5}}>
                    <Text
                      style={{
                        alignSelf: 'flex-end',
                        color: colors.medium,
                        fontSize: fontSize.sm,
                        marginBottom: 3,
                      }}>
                      {new Date(msg.createdAt).toLocaleTimeString('en', {
                        timeStyle: 'short',
                        hour12: true,
                        hour: '2-digit',
                        minute: '2-digit',
                        timeZone: 'PST',
                      })}
                    </Text>
                    <View key={index} style={styles.container_message_sender}>
                      <Text
                        style={{color: colors.white, fontSize: fontSize.md}}>
                        {msg.content}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View
                    key={index}
                    style={{alignItems: 'flex-start', marginVertical: 5}}>
                    <Text
                      style={{
                        alignSelf: 'flex-start',
                        color: colors.medium,
                        fontSize: fontSize.sm,
                        marginBottom: 3,
                      }}>
                      {new Date(msg.createdAt).toLocaleTimeString('en', {
                        timeStyle: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                        timeZone: 'PST',
                      })}
                    </Text>
                    <View key={index} style={styles.container_message_receiver}>
                      <Text style={{fontSize: fontSize.md}}>{msg.content}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </TouchableOpacity>
        </ScrollView>
        <MessageInput
          onChangeText={message => setMessage(message)}
          onPressButton={sendNewMessage}
          value={message}
        />
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: padding.standard,
  },
  container_input: {
    flexDirection: 'row',
  },
  container_message_receiver: {
    backgroundColor: colors.light,
    padding: padding.sm,
    borderRadius: 5,
  },
  container_message_sender: {
    backgroundColor: colors.danger,
    padding: padding.sm,
    borderRadius: 5,
  },
});
