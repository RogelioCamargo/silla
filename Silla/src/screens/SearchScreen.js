import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

// import components
import {Screen} from '../components/atoms';
import {SearchInput} from '../components/molecules';
import {ListingsList} from '../components/organisms';

// import default styles
import {colors, margin} from '../styles';

export default function SearchScreen({navigation, route}) {
  // set query
  const query = route.params;

  // local states
  const [error, setError] = useState(false);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(query);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const {data} = await axios.get(
          `http://localhost:5000/listings/api/search?q=${query}`,
        );
        setListings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPressSearch = async () => {
    try {
      setLoading(true);
      console.log(search);
      const {data} = await axios.get(
        `http://localhost:5000/listings/api/search?q=${search}`,
      );
      setListings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen style={styles.container}>
      {/* This is the search bar. */}
      <SearchInput
        goBackButton
        goBackButtonOnPress={() => navigation.goBack()}
        onChangeText={input => setSearch(input)}
        onSubmitEditing={() => onPressSearch()}
        value={search}
      />

      {/* Location  */}
      <View style={styles.container_location}>
        <Ionicons name="location-sharp" size={15} color={colors.primary} />
        <Text style={{marginLeft: 5, color: colors.primary}}>
          Los Angeles, CA
        </Text>
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
});
