import React, {useState, useCallback, useEffect} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {useDispatch, useSelector} from 'react-redux';
import {useForm, Controller} from 'react-hook-form';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

// import {RNS3} from 'react-native-aws3';
import axios from 'axios';
// import DraggableFlatList from 'react-native-draggable-flatlist';

// import actions
import {reset, addListingInfo} from '../store/listings';

// import categories
import categories from '../assets/categories';

// import components
import {Button, Screen, Text, TextInput} from '../components/atoms';
import {Header, Picker} from '../components/molecules';

// import configs
import {configurationFileForS3Listing} from '../configs';

// import default styles
import {colors, fontSize, margin, padding} from '../styles';

// import routes
import routes from '../navigations/routes';

export default function EditListingScreen({navigation}) {
  // react hook form
  const {control, handleSubmit, errors} = useForm();

  // redux
  const dispatch = useDispatch();
  const state = useSelector(state => state);

  // local state
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  // on mount
  useEffect(() => {
    for (let image of state.listing.images) {
      const img = {
        path: image,
      };
      setSelectedImages(prevImg => [...prevImg, img]);
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * This function accesses the user's camera roll
   * and allows the user to select up to 4 images
   * which are to be stored in redux.
   */
  const choosePhotosFromLibrary = async () => {
    try {
      const images = await ImagePicker.openPicker({
        maxFiles: 4,
        mediaType: 'photo',
        multiple: true,
      });
      //dispatch(addListingImages(images));
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
  //   const addImagesToAWS = images => {
  //     return Promise.all(
  //       images.map(async (image, index) => {
  //         // send each image to aws
  //         const response = await RNS3.put(
  //           {
  //             uri: image.path,
  //             name: state.listing._id + '-image' + (index + 1) + '.jpg',
  //             type: 'image/jpg',
  //           },
  //           configurationFileForS3Listing,
  //         );
  //         if (response.status !== 201) {
  //           throw new Error('Failed to upload image to S3.');
  //         }
  //         // returns url of image
  //         return response.headers.Location;
  //       }),
  //     );
  //   };

  /**
   * This function submits to the database.
   * @param {String} newListing -  An object containing all the
   */
  const addListingToDatabase = async newListing => {
    try {
      const {data} = await axios.put(
        `http://localhost:5000/listings/update/${state.listing._id}`,
        newListing,
      );
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
    // const imageUrls = await addImagesToAWS(selectedImages);

    // prepare object
    const newListing = {
      ...state.listing,
      ...data,
      // images: [...imageUrls],
      seller: state.user.userInfo._id,
    };

    // submit to database
    await addListingToDatabase(newListing);

    // reset redux state
    dispatch(reset());

    navigation.navigate(routes.HOME);
  };

  const onSave = data => {
    dispatch(addListingInfo(data));
    setModalVisible(false);
  };

  const deleteFromSelectedImages = path => {
    setSelectedImages(prevImgs => prevImgs.filter(item => item.path !== path));
  };

  /**
   * The following two functions are for the draggable flatlist
   * component.
   */
  //   const renderItem = useCallback(({item, drag}) => {
  //     console.log(JSON.stringify(item, null, 3));
  //     return (
  //       <TouchableOpacity onPress={choosePhotosFromLibrary} onLongPress={drag}>
  //         <ImageBackground
  //           style={styles.image_selected}
  //           source={{uri: item.path}}>
  //           <TouchableOpacity onPress={() => deleteFromSelectedImages(item.path)}>
  //             <MaterialIcons
  //               name="cancel"
  //               size={24}
  //               color={colors.dark}
  //               style={{alignSelf: 'flex-end'}}
  //             />
  //           </TouchableOpacity>
  //         </ImageBackground>
  //       </TouchableOpacity>
  //     );
  //   }, []);

  const onDragEnd = useCallback(({data}) => {
    setSelectedImages([...data]);
  }, []);

  return (
    <Screen style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}
        keyboardVerticalOffset={90}>
        <TouchableOpacity
          style={{flex: 1, justifyContent: 'center'}}
          activeOpacity={1}
          onPress={Keyboard.dismiss}>
          {/* Select button. */}
          {selectedImages.length == 0 ? (
            <TouchableOpacity onPress={choosePhotosFromLibrary}>
              <View style={styles.button_select}>
                <MaterialCommunityIcons
                  name="camera-outline"
                  size={24}
                  color={colors.dark}
                />
                <Text style={styles.text_select}>Select Image</Text>
                {/* <Text style={styles.text_count}>{state.listing.images.length}/4</Text> */}
              </View>
            </TouchableOpacity>
          ) : null}
          {/* Images displayed here. */}
          {/* {selectedImages.length > 0 ? (
            <View
              style={{height: 90, alignItems: 'center', marginTop: margin.md}}>
              <DraggableFlatList
                data={selectedImages}
                horizontal
                keyExtractor={image => image.path}
                renderItem={renderItem}
                onDragEnd={onDragEnd}
                scrollEnabled={false}
              />
            </View>
          ) : null} */}
          <View style={{flexDirection: 'row', marginTop: margin.md}}>
            <Feather name="edit-3" size={15} color={colors.medium} />
            <Text style={styles.text_instruction}>Tap photo to edit.</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
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
              defaultValue={state.listing.description}
              name="description"
              rules={{required: true}}
              render={({onChange, onBlur, value}) => (
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
                defaultValue={state.listing.price}
                name="price"
                rules={{required: true}}
                render={({onChange, onBlur, value}) => (
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
          <Button
            color="medium"
            onPress={() => setModalVisible(true)}
            style={styles.button_additional}
            title="Add More Details"
          />
        </TouchableOpacity>

        {/* Next Button */}
        <Button
          onPress={handleSubmit(onSubmit)}
          style={styles.button_bottom}
          title="Post"
        />
      </KeyboardAvoidingView>

      {/* Modal */}
      <Modal visible={modalVisible}>
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
            </View>
            <View style={styles.container_picker_groups}>
              <Text style={styles.text_modal_label}>Details</Text>
              {/* Category */}
              <Controller
                control={control}
                defaultValue={state.listing.category}
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
                defaultValue={state.listing.type}
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
                defaultValue={state.listing.condition}
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
                defaultValue={state.listing.color}
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
                defaultValue={state.listing.material}
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
            <View style={styles.container_picker_groups}>
              <View style={{marginBottom: 10}}>
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
                defaultValue={state.listing.style}
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
                defaultValue={state.listing.period}
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
          <Button
            color="black"
            onPress={handleSubmit(onSave)}
            style={styles.button_bottom}
            title="Save"
          />
        </Screen>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  button_additional: {
    marginTop: margin.md,
  },
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
    padding: 5,
  },
  container: {
    paddingHorizontal: padding.standard,
  },
  container_description: {
    borderBottomColor: colors.light,
    borderBottomWidth: 1,
    marginTop: margin.md,
  },
  container_picker_groups: {
    marginVertical: margin.sm,
  },
  container_images: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: margin.md,
    width: '100%',
  },
  container_modal: {
    paddingHorizontal: padding.standard,
  },
  container_price: {
    borderBottomColor: colors.light,
    borderBottomWidth: 1,
    paddingVertical: padding.sm,
  },
  image_selected: {
    height: 90,
    width: 90,
    backgroundColor: colors.dark,
    marginRight: 2.5,
    borderRadius: 5,
  },
  input_description: {
    paddingTop: padding.sm,
    height: 100,
    borderWidth: 0,
  },
  input_price: {
    width: '80%',
    borderColor: 0,
    //fontSize: fontSize.subtitle
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
    marginHorizontal: margin.sm,
  },
  text_warning: {
    marginVertical: 5,
    color: colors.danger,
  },
});
