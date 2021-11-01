import React, {useState} from 'react';
import {Modal, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// import components
import {Screen, Text} from '../atoms';
import {Header} from '../molecules';

// import default styles
import {colors} from '../../styles';

export default function LocationModal() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <TouchableWithoutFeedback>
        <View>
          <Ionicons name="location-sharp" size={15} color={colors.primary} />
          <Text style={styles.text_location}>Los Angeles, CA</Text>
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide">
        <Screen>
          <Header
            iconRight="x"
            onPressRight={() => setModalVisible(false)}
            title="Set Location"
          />
        </Screen>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});
