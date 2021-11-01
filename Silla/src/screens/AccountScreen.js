import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import axios from 'axios';

// import components
import {Screen} from '../components/atoms';
import {Profile} from '../components/templates';

// import constants
import {API_URL} from '../constants';

export default function AccountScreen({navigation}) {
  // redux state
  const user = useSelector(({users}) => users.user);

  // local state(s)
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  // on mount
  useEffect(() => {
    getListings(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getListings = async () => {
    try {
      setLoading(true);
      const {data} = await axios.get(
        `${API_URL}/listings/search/uid/${user._id}`,
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
      <Profile
        error={error}
        listings={listings}
        loading={loading}
        user={user}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({});
