import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// import components
import ListingCard from '../molecules/ListingCard';
import ProfileHeader from '../organisms/ProfileHeader';

// import routes
import routes from '../../navigations/routes';

export default function Profile({
  error,
  listings,
  loading,
  routeToProfileListing,
  user,
}) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Listing */}
      <FlatList
        data={listings}
        keyExtractor={listing => listing._id.toString()}
        numColumns={2}
        // Profile
        ListEmptyComponent={<ProfileHeader user={user} />}
        ListHeaderComponent={<ProfileHeader user={user} />}
        renderItem={({item}) => (
          <ListingCard
            image={item.images[0]}
            onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
});
