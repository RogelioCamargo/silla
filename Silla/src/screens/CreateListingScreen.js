import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {useDispatch, useSelector} from 'react-redux';
import {useForm, Controller} from 'react-hook-form';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import {v4 as uuidv4} from 'uuid';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';
import storage from '@react-native-firebase/storage';

// import actions
import {reset, addListingInfo} from '../store/listings';

// import categories
import categories from '../assets/categories';

// import components
import {Button, Screen, Text, TextInput} from '../components/atoms';
import {Card, Header, Picker} from '../components/molecules';

// import default styles
import {colors, fontSize, margin, padding} from '../styles';

export default function CreateListingScreen({navigation}) {
  // react hook form
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  // redux
  const dispatch = useDispatch();
  const user = useSelector(({users}) => users.user);

  // local state
  const [listing, setListing] = useState({});
  const [location, setLocation] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [modalLocationVisible, setModalLocationVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [zipCode, setZipCode] = useState('');
  const [_ID] = useState(uuidv4());

  // on mount
  useEffect(() => {
    //getPermissionAndLocation(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * This function first gets permission and then the
   * coordinates.
   */
  const getPermissionAndLocation = async () => {
    const permission = await Geolocation.requestAuthorization('whenInUse');
    if (permission === 'granted') {
      getCoordinatesAndLocation();
    }
  };

  /**
   * This function first gets the coordinates from the user
   * and then the physical location from the specifed coordinates.
   */
  const getCoordinatesAndLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const coordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        console.log(coordinates);
        getLocationFromCoordinates(coordinates);
      },
      error => {
        console.log(JSON.stringify(error, null, 3));
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  /**
   * This function gets the physical location from the
   * the specificed coordinates.
   */
  const getLocationFromCoordinates = ({latitude, longitude}) => {
    const locationPromise = new Promise((resolve, reject) => {
      const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude},${longitude}&limit=1&apiKey=${process.env.HERE_API_KEY}`;
      fetch(url)
        .then(location => {
          resolve(location.json());
        })
        .catch(error => {
          reject(error);
        });
    });

    locationPromise.then(
      result => {
        // setLocation({
        //   city: result.items[0].address.city,
        //   stateCode: result.items[0].address.stateCode,
        //   type: 'Point',
        //   coordinates: [
        //     result.items[0].position.lng,
        //     result.items[0].position.lat,
        //   ],
        // });
        console.log(result);
      },
      error => {
        console.log(error);
      },
    );
  };

  /**
   * This function gets the physical location from the
   * the specificed coordinates.
   */
  const getCoordinatesFromZipCode = () => {
    const zipCodePromise = new Promise((resolve, reject) => {
      const url = `https://geocode.search.hereapi.com/v1/geocode?qq=postalCode=${zipCode};country=United+States&limit=1&apiKey=${process.env.HERE_API_KEY}`;
      fetch(url)
        .then(location => {
          resolve(location.json());
        })
        .catch(error => {
          reject(error);
        });
    });

    zipCodePromise.then(
      results => {
        if (results.items[0]) {
          const {lat, lng} = results.items[0].position;
          const locationPromise = new Promise((resolve, reject) => {
            const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat},${lng}&limit=1&api&apiKey=${process.env.HERE_API_KEY}`;
            fetch(url)
              .then(location => {
                resolve(location.json());
              })
              .catch(error => {
                reject(error);
              });
          });

          locationPromise.then(
            loc => {
              setLocation({
                city: loc.items[0].address.city,
                stateCode: loc.items[0].address.stateCode,
                type: 'Point',
                coordinates: [
                  loc.items[0].position.lng,
                  loc.items[0].position.lat,
                ],
              });
              setModalLocationVisible(false);
            },
            error => {
              console.log(error);
            },
          );
        } else {
          console.log(JSON.stringify(results, null, 3));
        }
      },
      error => {
        console.log(error);
      },
    );
  };

  /**
   * This function allows the user to access the user's camera
   * where the user will then be able to take a photo.
   */
  const takePhoto = async () => {
    try {
      const image = await ImagePicker.openCamera({
        width: 500,
        height: 500,
        cropping: true,
      });
      setSelectedImages(prevImgs => [...prevImgs, image]);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * This function goes into the user's camera roll
   * where they will be able to select up to 4 images.
   */
  const choosePhotosFromLibrary = async () => {
    try {
      const images = await ImagePicker.openPicker({
        maxFiles: 4,
        mediaType: 'photo',
        multiple: true,
      });
      setSelectedImages([...images]);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * This function sends the images to AWS.
   * @param {Array} images - An array of objects that contain image metadata.
   * @returns {Array} - An array of image URLs.
   */
  const uploadImagesToFirebase = images => {
    return Promise.all(
      images.map(async (image, index) => {
        // send each image to firebase storage
        const filename = `listingimages/${_ID}-image${index + 1}.jpg`;
        const reference = storage().ref(filename);
        await reference.putFile(image.path);

        const url = await storage().ref(filename).getDownloadURL();
        // returns url of image
        return url;
      }),
    );
  };

  /**
   * This function submits to the database.
   * @param {String} newListing -  An object containing all the
   */
  const addListingToDatabase = async newListing => {
    try {
      await axios.post('http://localhost:5000/listings/create', newListing);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * This function stores the data object in redux and
   * navigates to the next page.
   * @param {Object} data - All the data collected in this page.
   */
  const onSubmit = async data => {
    // get image urls
    const URLS = await uploadImagesToFirebase(selectedImages);

    // prepare object
    const newListing = {
      _id: _ID,
      ...listing,
      ...data,
      images: [...URLS],
      seller: user._id,
      location: {
        ...location,
      },
    };

    // submit to database
    await addListingToDatabase(newListing);

    // reset redux state
    // dispatch(reset());

    navigation.pop();
  };

  /**
   * This function saves the additional details in redux state.
   * @param {Object} data - All the data collected in this page.
   */
  const onSave = data => {
    setListing({...data});
    //dispatch(addListingInfo(data));
    setModalVisible(false);
  };

  return (
    <Screen style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
        keyboardVerticalOffset={90}>
        <TouchableOpacity
          style={styles.container_main}
          activeOpacity={1}
          onPress={Keyboard.dismiss}>
          {selectedImages.length !== 4 ? (
            <View style={styles.container_buttons}>
              {/* Take photo button. */}
              <TouchableOpacity onPress={takePhoto}>
                <View style={styles.button_select}>
                  <MaterialCommunityIcons
                    name="camera-outline"
                    size={20}
                    color={colors.dark}
                  />
                  <Text style={styles.text_select}>Take Photo</Text>
                </View>
              </TouchableOpacity>
              {/* Select image button. */}
              <TouchableOpacity onPress={choosePhotosFromLibrary}>
                <View style={styles.button_select}>
                  <MaterialCommunityIcons
                    name="image"
                    size={20}
                    color={colors.dark}
                  />
                  <Text style={styles.text_select}>Select Photo</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : null}

          {/* Images displayed here. */}
          {selectedImages.length > 0 ? (
            <View style={styles.container_images}>
              <FlatList
                data={selectedImages}
                horizontal
                keyExtractor={image => image.path}
                scrollEnabled={false}
                renderItem={({item}) => (
                  <Card style={styles.image_selected} image={item.path} />
                )}
              />
            </View>
          ) : null}

          {/* Instructions */}
          <View style={{flexDirection: 'row', marginTop: margin.md}}>
            <Feather name="edit-3" size={15} color={colors.medium} />
            <Text style={styles.text_instruction}>
              Tap any photo to choose different photos.
            </Text>
          </View>
          <View style={styles.row}>
            <Feather name="edit-3" size={15} color={colors.medium} />
            <Text style={styles.text_instruction}>
              Tap and hold photo to re-arrange.
            </Text>
          </View>

          {/* Description */}
          <View style={styles.container_description}>
            {errors.description && (
              <Text style={styles.text_warning}>This is required.</Text>
            )}
            <Text style={styles.text_label}>Description</Text>
            <Controller
              control={control}
              defaultValue=""
              name="description"
              rules={{required: true}}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  autoCorrect={false}
                  multiline
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  style={styles.input_description}
                  value={value}
                />
              )}
            />
          </View>

          {/* Price */}
          <View style={styles.container_price}>
            {errors.price && (
              <Text style={styles.text_warning}>This is required.</Text>
            )}
            <Text style={styles.text_label}>Price</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{marginRight: 5}}>$</Text>
              <Controller
                control={control}
                defaultValue=""
                name="price"
                rules={{required: true}}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    keyboardType="decimal-pad"
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    returnKeyType="done"
                    style={styles.input_price}
                    value={value}
                  />
                )}
              />
            </View>
          </View>

          {/* Location */}
          <TouchableWithoutFeedback
            onPress={() => setModalLocationVisible(true)}>
            <View style={styles.container_location}>
              <Text style={styles.text_label}>Location</Text>
              {location.city && location.stateCode ? (
                <Text style={{paddingVertical: padding.sm}}>
                  {location.city + ', ' + location.stateCode}
                </Text>
              ) : null}
            </View>
          </TouchableWithoutFeedback>

          {/* Add More Details Button */}
          <Button
            onPress={() => setModalVisible(true)}
            secondary
            style={styles.button_additional}
            title="Add More Detail"
          />
        </TouchableOpacity>

        {/* Post Button */}
        <Button
          onPress={handleSubmit(onSubmit)}
          style={styles.button_bottom}
          title="Post"
        />
      </KeyboardAvoidingView>

      {/* Modal - Additional Details */}
      <Modal animationType="slide" visible={modalVisible}>
        <Header
          iconRight="x"
          onPressRight={() => setModalVisible(false)}
          title="Optional"
        />
        <Screen style={styles.container_modal}>
          <View style={{flex: 1}}>
            <View style={{marginTop: margin.md}}>
              <View style={{flexDirection: 'row'}}>
                <Feather name="edit-3" size={15} color={colors.medium} />
                <Text style={styles.text_instruction}>
                  All these fields are totally optional.
                </Text>
              </View>
              <View style={styles.row}>
                <Feather name="edit-3" size={15} color={colors.medium} />
                <Text style={styles.text_instruction}>
                  These fields will help to enhance your listing.
                </Text>
              </View>
            </View>
            {/* Modal - Extras */}
            <View style={styles.container_picker_groups}>
              <Text style={styles.text_modal_label}>Details</Text>
              {/* Category */}
              <Controller
                control={control}
                defaultValue=""
                name="category"
                // rules={{ required: true }}
                render={({onChange, value}) => (
                  <Picker
                    items={categories.category}
                    onSelectItem={value => onChange(value.label)}
                    label="Category"
                    selectedItem={value}
                  />
                )}
              />
              {/* Type */}
              <Controller
                control={control}
                defaultValue=""
                name="type"
                // rules={{ required: true }}
                render={({onChange, value}) => (
                  <Picker
                    items={categories.type}
                    onSelectItem={value => onChange(value.label)}
                    label="Type"
                    selectedItem={value}
                  />
                )}
              />
              {/* Condition */}
              <Controller
                control={control}
                defaultValue=""
                name="condition"
                // rules={{ required: true }}
                render={({onChange, value}) => (
                  <Picker
                    items={categories.condition}
                    onSelectItem={value => onChange(value.label)}
                    label="Condition"
                    selectedItem={value}
                  />
                )}
              />
              {/* Color */}
              <Controller
                control={control}
                defaultValue=""
                name="color"
                // rules={{ required: true }}
                render={({onChange, value}) => (
                  <Picker
                    items={categories.color}
                    onSelectItem={value => onChange(value.label)}
                    label="Color"
                    selectedItem={value}
                  />
                )}
              />
              {/* Material */}
              <Controller
                control={control}
                defaultValue=""
                name="material"
                // rules={{ required: true }}
                render={({onChange, value}) => (
                  <Picker
                    items={categories.material}
                    onSelectItem={value => onChange(value.label)}
                    label="Material"
                    selectedItem={value}
                  />
                )}
              />
            </View>

            {/* Specifics */}
            <View style={styles.container_picker_groups}>
              <View style={{marginBottom: 10}}>
                {/* Instructions */}
                <View style={{flexDirection: 'row'}}>
                  <Feather name="edit-3" size={15} color={colors.medium} />
                  <Text style={styles.text_instruction}>
                    These are important for catagorizing items.
                  </Text>
                </View>
              </View>
              <Text style={styles.text_modal_label}>Specifics</Text>
              {/* Style */}
              <Controller
                control={control}
                defaultValue=""
                name="style"
                // rules={{ required: true }}
                render={({onChange, value}) => (
                  <Picker
                    items={categories.style}
                    onSelectItem={value => onChange(value.label)}
                    label="Style"
                    selectedItem={value}
                  />
                )}
              />
              {/* Period */}
              <Controller
                control={control}
                defaultValue=""
                name="period"
                // rules={{ required: true }}
                render={({onChange, value}) => (
                  <Picker
                    items={categories.period}
                    onSelectItem={value => onChange(value.label)}
                    label="Period"
                    selectedItem={value}
                  />
                )}
              />
            </View>
          </View>
          {/* Save Button */}
          <Button
            color="medium"
            onPress={handleSubmit(onSave)}
            style={styles.button_bottom}
            title="Save"
          />
        </Screen>
      </Modal>

      {/* Modal - Location */}
      <Modal animationType="slide" visible={modalLocationVisible}>
        <Screen>
          <Header
            iconRight="x"
            onPressRight={() => setModalLocationVisible(false)}
            title="Set Location"
          />
          <KeyboardAvoidingView style={styles.flex}>
            <TouchableOpacity
              style={styles.flex}
              activeOpacity={1}
              onPress={Keyboard.dismiss}>
              <View style={{paddingHorizontal: padding.standard}}>
                <View style={styles.container_search}>
                  <TextInput
                    autoCorrect={false}
                    enablesReturnKeyAutomatically={true}
                    keyboardType="number-pad"
                    placeholder="Enter Zip Code"
                    onChangeText={input => setZipCode(input)}
                    style={styles.input_search}
                    textAlign="center"
                    value={zipCode}
                  />
                </View>
                <View style={{alignItems: 'center', marginVertical: 5}}>
                  {location.city && location.stateCode ? (
                    <Text style={{paddingVertical: padding.sm}}>
                      {location.city + ', ' + location.stateCode}
                    </Text>
                  ) : null}
                </View>
                <Button onPress={getCoordinatesFromZipCode} title="Apply" />
              </View>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </Screen>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  button_bottom: {
    marginBottom: margin.sm,
  },
  button_select: {
    alignItems: 'center',
    borderColor: colors.dark,
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 7,
    paddingHorizontal: 30,
  },
  button_additional: {
    marginTop: margin.md,
  },
  container: {
    paddingHorizontal: padding.standard,
  },
  container_buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container_description: {
    borderBottomColor: colors.light,
    borderBottomWidth: 1,
    marginTop: margin.sm,
  },
  container_picker_groups: {
    marginVertical: margin.sm,
  },
  container_images: {
    alignItems: 'center',
    marginTop: margin.md,
    width: '100%',
  },
  container_location: {
    borderBottomColor: colors.light,
    borderBottomWidth: 1,
    paddingVertical: padding.sm,
  },
  container_main: {
    flex: 1,
    justifyContent: 'center',
  },
  container_modal: {
    paddingHorizontal: padding.standard,
  },
  container_price: {
    borderBottomColor: colors.light,
    borderBottomWidth: 1,
    paddingVertical: padding.sm,
  },
  container_search: {
    alignItems: 'center',
    backgroundColor: colors.light,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 5,
    padding: 2.5,
  },
  flex: {
    flex: 1,
  },
  image_selected: {
    height: 90,
    width: 90,
    backgroundColor: colors.medium,
    marginRight: 2.5,
    borderRadius: 5,
    overflow: 'hidden',
  },
  input_description: {
    paddingTop: padding.sm,
    height: 80,
    borderWidth: 0,
  },
  input_price: {
    width: '80%',
    borderColor: 0,
  },
  input_search: {
    //borderColor: colors.dark,
    borderRadius: 5,
    //borderWidth: 1,
    backgroundColor: colors.white,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  text_instruction: {
    color: colors.medium,
    marginLeft: 5,
  },
  text_label: {
    fontSize: fontSize.subtitle,
    fontWeight: '600',
  },
  text_modal_label: {
    fontSize: fontSize.subtitle,
    fontWeight: '600',
    marginBottom: 5,
  },
  text_select: {
    marginLeft: margin.sm,
  },
  text_warning: {
    marginVertical: 5,
    color: colors.danger,
  },
});
