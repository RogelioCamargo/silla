import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

// import categories
import categories from '../assets/categories';

// import components
import {Button, PickerItem, Screen, Text} from '../components/atoms';
import {Card, Header, ListItem} from '../components/molecules';

// import default styles
import {colors, fontSize, margin, padding} from '../styles';

// import routes
import routes from '../navigations/routes';

// get screen dimensions
const screen = Dimensions.get('screen');

/* Local Components */
const MoreButton = ({onPress}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Text style={styles.text_more}>More</Text>
    </TouchableWithoutFeedback>
  );
};

export default function HomeScreen({navigation}) {
  // local state
  const [modalVisible, setModalVisible] = useState(false);
  const [selection, setSelection] = useState('');

  const onPressCard = (key, value) => {
    navigation.navigate(routes.SEARCH_HOME, {key, value});
  };

  const onPressMoreType = () => {
    setSelection('Type');
    setModalVisible(true);
  };

  const onPressMoreStyle = () => {
    setSelection('Style');
    setModalVisible(true);
  };

  return (
    <Screen style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Explore by Style */}
        <View style={styles.container_scroll}>
          <View style={styles.container_title}>
            <Text style={styles.text_home_title}>Explore by Style</Text>
            <MoreButton onPress={onPressMoreStyle} />
          </View>
          <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <FlatList
                data={categories.style.slice(0, 8)}
                keyExtractor={style => style.key.toString()}
                numColumns={4}
                renderItem={({item}) => (
                  <Card
                    onPress={() => onPressCard('style', item.label)}
                    style={styles.container_card}
                    title={item.label}
                    image={item.url}
                  />
                )}
                scrollEnabled={false}
              />
            </ScrollView>
          </View>
        </View>

        {/* Explore by Type */}
        <View style={styles.container_scroll}>
          <View style={styles.container_title}>
            <Text style={styles.text_home_title}>Explore by Type</Text>
            <MoreButton onPress={onPressMoreType} />
          </View>
          <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <FlatList
                data={categories.type.slice(0, 8)}
                keyExtractor={type => type.key.toString()}
                numColumns={4}
                renderItem={({item}) => (
                  <Card
                    onPress={() => onPressCard('type', item.label)}
                    style={styles.container_card}
                    title={item.label}
                    image={item.url}
                  />
                )}
                scrollEnabled={false}
              />
            </ScrollView>
          </View>
        </View>

        {/* Explore by Period */}
        <View style={styles.container_scroll}>
          <View style={styles.container_title}>
            <Text style={styles.text_home_title}>Explore by Period</Text>
          </View>
          <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <FlatList
                data={categories.period}
                keyExtractor={period => period.key.toString()}
                numColumns={4}
                renderItem={({item}) => (
                  <TouchableWithoutFeedback
                    onPress={() => onPressCard('period', item.label)}>
                    <View style={styles.container_period}>
                      <Text style={{color: colors.white}}>{item.label}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                )}
                scrollEnabled={false}
              />
            </ScrollView>
          </View>
        </View>

        {/* Category */}
        <View style={{paddingHorizontal: padding.standard}}>
          <Text style={[styles.text_home_title, {marginBottom: 10}]}>
            Categories
          </Text>
          {categories.category.map((item, index) => {
            return (
              <ListItem
                chevronRightIcon
                key={index}
                onPress={() => onPressCard('category', item.label)}
                primaryTitle={item.label}
                style={{borderBottomColor: colors.light, borderBottomWidth: 1}}
              />
            );
          })}
        </View>

        {/* Bottom */}
        <View style={styles.container_search}>
          <View style={{marginBottom: margin.sm}}>
            <Text style={styles.text_home_title}>Have Something in Mind?</Text>
          </View>
          <Button
            onPress={() => navigation.navigate(routes.LISTINGS)}
            style={styles.button_search}
            title="Search"
          />
        </View>
      </ScrollView>

      <Modal visible={modalVisible}>
        <Screen>
          <Header
            iconRight="x"
            onPressRight={() => setModalVisible(false)}
            title={selection}
          />

          <FlatList
            data={categories[selection.toLowerCase()]}
            keyExtractor={item => item.key.toString()}
            renderItem={({item}) => (
              <PickerItem
                item={item}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate(routes.SEARCH_HOME, {
                    key: selection.toLowerCase(),
                    value: item.label,
                  });
                }}
              />
            )}
          />
        </Screen>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container_card: {
    backgroundColor: colors.light,
    height: screen.width / 3.6,
    margin: 2,
    width: screen.width / 2.7,
  },
  container_search: {
    marginVertical: margin.lg,
    paddingHorizontal: padding.standard,
  },
  container_scroll: {
    marginBottom: margin.lg,
  },
  container_title: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: padding.standard,
    marginBottom: margin.sm,
  },
  container_period: {
    backgroundColor: colors.dark,
    padding: 12,
    margin: 2,
    borderRadius: 25,
  },
  text_home_title: {
    fontSize: fontSize.subtitle,
    fontWeight: '600',
  },
  text_more: {
    color: colors.primary,
    fontWeight: '600',
  },
});
