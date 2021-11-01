import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

// import components
import {Screen, Text} from '../components/atoms';
import {SearchInput} from '../components/molecules';
import {ListingsList} from '../components/organisms';

// import default styles
import {colors, margin, padding} from '../styles';

// import routes
import routes from '../navigations/routes';

export default function ListingsScreen({navigation}) {
  // local states
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');

  // on mount
  useEffect(() => {
    getListings();
  }, []);

  const getListings = async () => {
    try {
      setLoading(true);
      const {data} = await axios.get('http://localhost:5000/listings');
      setListings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const onPressSearch = async () => {
    navigation.navigate(routes.SEARCH_LISTINGS, search);
    setSearch('');
  };

  return (
    <Screen>
      <View style={{paddingHorizontal: padding.standard}}>
        {/* Search */}
        <SearchInput
          onChangeText={input => setSearch(input)}
          onSubmitEditing={() => onPressSearch()}
          value={search}
        />

        {/* Location  */}
        <View style={styles.container_location}>
          <Ionicons name="location-sharp" size={15} color={colors.primary} />
          <Text style={styles.text_location}>Los Angeles, CA</Text>
        </View>
      </View>

      {/* This is what the search result yields. */}
      <ListingsList data={listings} error={error} loading={loading} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container_location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: margin.standard,
  },
  text_location: {
    marginLeft: 5,
    color: colors.primary,
  },
});
