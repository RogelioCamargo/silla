import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  FlatList,
} from 'react-native';
import Feather from 'react-native-vector-icons/dist/Feather';

// import components
import {PickerItem, Screen, Text} from '../atoms';
import Header from '../molecules/Header';

// import default styles
import {colors, padding} from '../../styles';

export default function AppPicker({
  items,
  numberOfColumns = 1,
  onSelectItem,
  PickerItemComponent = PickerItem,
  label,
  selectedItem,
  width = '100%',
}) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.container, {width}]}>
          <View>
            <Text style={styles.text_label}>{label}</Text>
            <Text style={styles.text_selected}>{selectedItem}</Text>
          </View>
          <Feather name="chevron-down" size={22} color={colors.black} />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide">
        <Screen>
          <Header
            iconRight="x"
            onPressRight={() => setModalVisible(false)}
            title={label}
          />
          {/* <Button title="Close" onPress={() => setModalVisible(false)} /> */}
          <FlatList
            data={items}
            keyExtractor={item => item.key.toString()}
            numColumns={numberOfColumns}
            renderItem={({item}) => (
              <PickerItemComponent
                item={item}
                //label={item.label}
                onPress={() => {
                  setModalVisible(false);
                  onSelectItem(item);
                }}
              />
            )}
          />
        </Screen>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: padding.standard,
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
  },
  text_label: {},
  text_selected: {
    color: colors.primary,
    fontWeight: '600',
    marginTop: 5,
  },
});
