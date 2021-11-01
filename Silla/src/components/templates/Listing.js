import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

// import components
import {Button, Text} from '../atoms';
import {Header, ListItem} from '../molecules';

// import default styles
import {colors, fontSize, margin, padding} from '../../styles';

// import routes
import routes from '../../navigations/routes';

export default function Listing({
  listing,
  onPressHeaderRight,
  onPressSendMessage,
  OnPressEditListing,
  seller,
}) {
  const navigation = useNavigation();

  // redux
  const user = useSelector(({users}) => users.user);

  return (
    <>
      <Header
        iconColor={colors.dark}
        iconLeft="arrow-left"
        iconRight="more-horizontal"
        onPressLeft={() => navigation.goBack()}
        onPressRight={onPressHeaderRight}
      />
      <ScrollView
        style={styles.container_scrollview}
        showsVerticalScrollIndicator={false}>
        <SliderBox
          dotColor={colors.primary}
          images={listing.images}
          inactiveDotColor={colors.light}
          resizeMode="contain"
          sliderBoxHeight={420}
        />
        <View style={styles.container_info}>
          {/* Description */}
          <View style={styles.container_description}>
            <Text style={styles.header_label}>Description</Text>
            <Text style={{marginBottom: 10}}>{listing.description}</Text>
          </View>

          {/* Details */}
          <View style={styles.container_details}>
            <Text style={styles.header_label}>Details</Text>
            {listing.category ? (
              <View style={styles.detail_row}>
                <Text style={styles.detail_label}>Category</Text>
                <Text>{listing.category}</Text>
              </View>
            ) : null}
            {listing.type ? (
              <View style={styles.detail_row}>
                <Text style={styles.detail_label}>Type</Text>
                <Text>{listing.type}</Text>
              </View>
            ) : null}
            {listing.condition ? (
              <View style={styles.detail_row}>
                <Text style={styles.detail_label}>Condition</Text>
                <Text>{listing.condition}</Text>
              </View>
            ) : null}
            {listing.period ? (
              <View style={styles.detail_row}>
                <Text style={styles.detail_label}>Period</Text>
                <Text>{listing.period}</Text>
              </View>
            ) : null}
            {listing.style ? (
              <View style={styles.detail_row}>
                <Text style={styles.detail_label}>Style</Text>
                <Text>{listing.style}</Text>
              </View>
            ) : null}
            {listing.material ? (
              <View style={styles.detail_row}>
                <Text style={styles.detail_label}>Material</Text>
                <Text>{listing.material}</Text>
              </View>
            ) : null}
            {listing.color ? (
              <View style={styles.detail_row}>
                <Text style={styles.detail_label}>Color</Text>
                <Text>{listing.color}</Text>
              </View>
            ) : null}
          </View>

          {/* Seller Profile */}
          <View>
            <ListItem
              leftImage={seller.photoURL}
              onPress={() => navigation.navigate(routes.PROFILE, seller)}
              primaryTitle={seller.displayName}
              secondaryTitle={`@${seller.username}`}
              style={{borderBottomWidth: 0}}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.container_bottom}>
        <Text style={styles.price}>{`$${listing.price}`}</Text>
        {listing.seller !== user._id ? (
          <Button
            onPress={onPressSendMessage}
            style={styles.button}
            title="Message"
          />
        ) : (
          <Button
            onPress={OnPressEditListing}
            style={styles.button}
            title="Edit"
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 1,
    width: '50%',
  },
  container_scrollview: {
    flex: 1,
  },
  container_info: {
    paddingHorizontal: padding.standard,
  },
  container_bottom: {
    alignItems: 'center',
    borderTopColor: colors.light,
    borderTopWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: padding.standard,
    paddingTop: 15,
    paddingBottom: 10,
  },
  container_description: {
    borderBottomColor: colors.light,
    borderBottomWidth: 1,
    paddingVertical: padding.md,
  },
  container_details: {
    borderBottomColor: colors.light,
    borderBottomWidth: 1,
    paddingVertical: padding.md,
  },
  detail_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detail_label: {
    fontWeight: '400',
  },
  header_label: {
    fontWeight: '600',
    fontSize: fontSize.subtitle,
    marginBottom: margin.sm,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
  },
});
