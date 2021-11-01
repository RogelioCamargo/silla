import React, {useState, useEffect} from 'react';
import {Modal, Share, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import socket from '../socket';

// import actions
import {addListingInfo} from '../store/listings';

// import components
import {Screen, Text} from '../components/atoms';
import {Header, ListItem, MessageInput} from '../components/molecules';
import {Listing} from '../components/templates';

// import default styles
import {colors, padding} from '../styles';

// import routes
import routes from '../navigations/routes';

export default function ListingDetailsScreen({navigation, route}) {
  const listing = route.params;

  // redux
  const dispatch = useDispatch();
  const user = useSelector(({users}) => users.user);

  // local state
  const [message, setMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [sellerDetails, setSellerDetails] = useState({});

  // on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data} = await axios.get(
          `http://localhost:5000/users/search/profile/${listing.seller}`,
        );
        setSellerDetails(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Allow users to share the listing.
   */
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'Silla \nA place to sell your furniture',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  /**
   * Allows users to start a conversation or continue
   * an existing conversation.
   */
  const onPressMessage = async () => {
    try {
      const {data} = await axios.get(
        `http://localhost:5000/conversations/search/${user._id}/${listing.seller}/${listing._id}`,
      );
      if (data.success) {
        navigation.navigate(routes.MESSAGE_DETAILS, data.conversation._id);
      } else {
        setModalVisible(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Allow users to edit the listing.
   */
  const onPressEdit = () => {
    dispatch(addListingInfo(listing));
    navigation.navigate(routes.EDIT_LISTING);
  };

  /**
   * Allow users to delete the listing.
   */
  const deleteListing = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/listings/delete/${listing._id}`,
      );
      navigation.navigate(routes.LISTINGS);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Allow users to send a message to the seller.
   */
  const sendMessage = async () => {
    const conversationDetails = {
      buyer: {
        id: user._id,
        username: user.username,
        url: user.photoURL,
      },
      seller: {
        id: sellerDetails._id,
        username: sellerDetails.username,
        url: sellerDetails.photoURL,
      },
      listing: {
        id: listing._id,
        url: listing.images[0],
      },
      latestMessage: message,
    };
    try {
      const {data} = await axios.post(
        'http://localhost:5000/conversations/create',
        conversationDetails,
      );
      if (data.success) {
        const messageDetails = {
          author: user._id,
          content: message,
          conversation: data.conversation._id,
        };
        socket.emit('new conversation', data.conversation._id);
        await axios.post(
          'http://localhost:5000/messages/create',
          messageDetails,
        );
        setModalVisible(false);
        navigation.navigate(routes.MESSAGE_DETAILS, data.conversation._id);
      } else {
        console.log(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Screen style={styles.container}>
      <Listing
        listing={listing}
        onPressHeaderRight={() => onShare()}
        onPressSendMessage={onPressMessage}
        OnPressEditListing={onPressEdit}
        seller={sellerDetails}
      />

      <Modal animationType="slide" visible={modalVisible}>
        <Header
          iconColor={colors.dark}
          iconRight="x"
          onPressRight={() => setModalVisible(false)}
          title="Start a Conversation"
        />
        <View style={styles.container_modal}>
          <ListItem
            leftImage={sellerDetails.photoURL}
            primaryTitle={sellerDetails.name}
            rightImage={listing.images[0]}
            secondaryTitle={'@' + sellerDetails.username}
            tertiaryTitle="Los Angeles, CA"
          />
          <View style={{paddingVertical: 25}}>
            <Text>What would you like to ask?</Text>
          </View>
          <MessageInput
            onChangeText={message => setMessage(message)}
            onPressButton={sendMessage}
            value={message}
          />
        </View>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container_modal: {
    paddingHorizontal: padding.standard,
  },
});
