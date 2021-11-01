import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import axios from 'axios';

// import components
import {Screen} from '../components/atoms';
import {SearchInput} from '../components/molecules';
import {ListingsList} from '../components/organisms';

export default function HomeSearchScreen({navigation, route}) {
  // set query
  const {key, value} = route.params;

  // local states
  const [error, setError] = useState(false);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const {data} = await axios.get(
          `http://localhost:5000/listings/api/search?q=&${key}=${value}`,
        );
        setListings(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPressSearch = async () => {
    try {
      setLoading(true);
      const {data} = await axios.get(
        `http://localhost:5000/listings/api/search?q=${search}`,
      );
      setListings(data);
    } catch (error) {
      setError(error.message);
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

      {/* This is what the search result yields. */}
      <ListingsList data={listings} error={error} loading={loading} />
    </Screen>
  );
}

const styles = StyleSheet.create({});
