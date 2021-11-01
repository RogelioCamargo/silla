import React, {useEffect, useState} from 'react';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import socket from '../socket';
import axios from 'axios';

// import components
import {ListItemDeleteAction, Screen, Text} from '../components/atoms';
import {ListItem} from '../components/molecules';

// import default styles
import {padding} from '../styles';

// import routes
import routes from '../navigations/routes';

export default function MessagesScreen({navigation, route}) {
  // redux
  const state = useSelector(state => state);

  // local state
  const [conversations, setConversations] = useState([]);

  // on mount
  useEffect(() => {
    fetchConversationsAndJoinRooms();
    socket.on('new conversation', () => {
      fetchConversations();
    });
    socket.on('delete conversation', () => {
      fetchConversations();
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // methods
  const fetchConversationsAndJoinRooms = async () => {
    try {
      const {data} = await axios.get(
        `http://localhost:5000/conversations/search/user/${state.user.userInfo._id}`,
      );
      setConversations(data);
      if (data.length > 0) {
        data.map(convo => socket.emit('join room', convo._id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchConversations = async () => {
    try {
      const {data} = await axios.get(
        `http://localhost:5000/conversations/search/user/${state.user.userInfo._id}`,
      );
      setConversations(data);
    } catch (error) {
      console.log(error);
    }
  };

  function calculateTime(date) {
    let interval;
    let seconds = Math.floor((new Date() - new Date(date)) / 1000);
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + ' months ago';
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + ' days ago';
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + ' hours ago';
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + ' minutes ago';
    }
    return Math.floor(seconds) + ' seconds ago';
  }

  const displayAlert = conversation => {
    Alert.alert(
      'Delete Conversation',
      'Are you sure you want to permanently delete this conversation?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => deleteConversation(conversation._id),
        },
      ],
    );
  };

  const deleteConversation = async conversation => {
    try {
      // get all messages from that conversation
      const {data} = await axios.get(
        `http://localhost:5000/messages/search/conversation/${conversation._id}`,
      );
      // delete all messages from that conversation
      await Promise.all(
        data.map(async message => {
          await axios.delete(
            `http://localhost:5000/messages/delete/${message._id}`,
          );
        }),
      );
      // finally delete conversation
      await axios.delete(
        `http://localhost:5000/conversations/delete/${conversation._id}`,
      );
      // update screen
      socket.emit('delete conversation');
    } catch (error) {
      console.log(error);
    }
    //setConversations(prevConvos => prevConvos.filter(convo => convo._id !== conversation._id));
  };

  return (
    <Screen style={styles.container}>
      {conversations.length > 0 ? (
        <ScrollView showsVericalScrollIndictor={false}>
          <View>
            {conversations.map((conversation, index) => {
              return state.user.userInfo._id === conversation.seller.id ? (
                <ListItem
                  key={index}
                  leftImage={conversation.buyer.url}
                  onPress={() =>
                    navigation.navigate(
                      routes.MESSAGE_DETAILS,
                      conversation._id,
                    )
                  }
                  primaryTitle={conversation.buyer.username}
                  secondaryTitle={conversation.latestMessage}
                  tertiaryTitle={calculateTime(conversation.updatedAt)}
                  renderRightActions={() => (
                    <ListItemDeleteAction
                      onPress={() => deleteConversation(conversation)}
                    />
                  )}
                  rightImage={conversation.listing.url}
                />
              ) : (
                <ListItem
                  key={index}
                  leftImage={conversation.seller.url}
                  onPress={() =>
                    navigation.navigate(
                      routes.MESSAGE_DETAILS,
                      conversation._id,
                    )
                  }
                  primaryTitle={conversation.seller.username}
                  secondaryTitle={conversation.latestMessage}
                  tertiaryTitle={calculateTime(conversation.updatedAt)}
                  renderRightActions={() => (
                    <ListItemDeleteAction
                      onPress={() => deleteConversation(conversation)}
                    />
                  )}
                  rightImage={conversation.listing.url}
                />
              );
            })}
            )}
          </View>
        </ScrollView>
      ) : (
        <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
          <Text>You have no messages yet.</Text>
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: padding.standard,
  },
});
