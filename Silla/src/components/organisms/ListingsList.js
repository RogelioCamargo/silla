import React from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// import components
import ListingCard from '../molecules/ListingCard';
import Text from '../atoms/Text';

// import default styles
import {colors} from '../../styles';

// import routes
import routes from '../../navigations/routes';

export default function ListingsList({data, error, loading}) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.container_loading}>
          <ActivityIndicator size="large" />
        </View>
      ) : error ? (
        <View style={styles.container_message}>
          <Text>{error}</Text>
        </View>
      ) : data.length !== 0 ? (
        <FlatList
          data={data}
          keyExtractor={listing => listing._id.toString()}
          numColumns={2}
          renderItem={({item}) => (
            <ListingCard
              image={item.images[0]}
              onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
            />
          )}
        />
      ) : (
        <View style={styles.container_message}>
          <Text>No results found.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  container_listing: {
    backgroundColor: colors.light,
    height: 205,
    margin: 1,
    width: 205,
  },
  container_loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container_message: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
