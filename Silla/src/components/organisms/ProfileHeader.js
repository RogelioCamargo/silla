import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// import components
import Button from '../atoms/Button';
import Text from '../atoms/Text';

// import default styles
import {colors, fontSize, margin, padding} from '../../styles';

// import routes
import routes from '../../navigations/routes';

export default function Profile({user}) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Profile Details */}
      <View style={styles.container_top}>
        {/* Profile Image */}
        <Image
          style={styles.image}
          //source={{ uri: state.user.userInfo.imageUrl + '?rnd=' + Math.random() }}
          source={{uri: user.photoURL}}
        />
        {/* Profile Side Details */}
        <View style={styles.container_middle}>
          <Text style={styles.name}>{user.displayName}</Text>
          <Text style={styles.username}>@rcamargo</Text>
          <Text style={styles.location}>Los Angeles, CA</Text>
        </View>
      </View>

      {/* Additional Details */}
      <View>
        {user.bio ? (
          <Text style={styles.bio}>{user.bio}</Text>
        ) : (
          <Text style={styles.bio}>
            This is my bio and this is just sample text.
          </Text>
        )}
        <View style={styles.container_bottom}>
          <View>
            <Text style={styles.count}>4</Text>
            <Text>Listings</Text>
          </View>
          <Button
            //onPress={() => navigation.navigate(routes.EDIT_PROFILE)}
            style={styles.button_edit}
            title="Edit Profile"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bio: {
    paddingHorizontal: padding.sm,
  },
  button_edit: {
    width: '75%',
  },
  container_bio: {
    padding: padding.sm,
  },
  container_middle: {
    justifyContent: 'center',
  },
  container_top: {
    flexDirection: 'row',
    padding: padding.sm,
  },
  container_bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: padding.sm,
  },
  count: {
    fontWeight: '600',
  },
  image: {
    height: 75,
    width: 75,
    borderRadius: 50,
    marginRight: 10,
  },
  name: {
    fontSize: fontSize.subtitle,
    fontWeight: '600',
  },
  username: {
    color: colors.medium,
    marginVertical: 2.5,
  },
});
