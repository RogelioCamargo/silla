import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import axios from 'axios';

// import components
import {Screen} from '../components/atoms';
import {Profile} from '../components/templates';

export default function ProfileScreen({navigation, route}) {
  const user = route.params;

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const {data} = await axios.get(
          `http://localhost:5000/listings/find/${user._id}`,
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

  return (
    <Screen style={styles.container}>
      <Profile
        user={user}
        listings={listings}
        loading={loading}
        error={error}
        routeToProfileListing
      />
    </Screen>
  );
}

const styles = StyleSheet.create({});
