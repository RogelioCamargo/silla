import React, {useState} from 'react';
import {Modal, StyleSheet, View} from 'react-native';

// import components
import {Screen, Text} from '../components/atoms';
import {Header, MessageInput} from '../components/molecules';
import {Listing} from '../components/templates';

// import default styles
import {colors, padding} from '../styles';

export default function ListingDetailsScreen({navigation, route}) {
  const info = route.params;

  const [message, setMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [seller, setSeller] = useState(info.user);
  const [listing, setListing] = useState(info.listing);

  return (
    <Screen style={styles.container}>
      <Listing
        listing={listing}
        //onPressHeaderRight={() => onShare()}
        //onPressSendMessage={onPressMessage}
        //OnPressEditListing={onPressEdit}
        seller={seller}
      />

      <Modal animationType="slide" visible={modalVisible}>
        <Header
          iconColor={colors.dark}
          iconRight="x"
          onPressRight={() => setModalVisible(false)}
          title="Start a Conversation"
        />
        <View style={styles.container_modal}>
          <View style={{paddingVertical: 25}}>
            <Text>What would you like to ask?</Text>
          </View>
          <MessageInput
            onChangeText={message => setMessage(message)}
            //onPressButton={sendMessage}
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
