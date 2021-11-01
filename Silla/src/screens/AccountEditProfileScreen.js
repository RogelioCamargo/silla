// import React, { useState } from 'react';
// import { Keyboard, KeyboardAvoidingView, ImageBackground, Platform, View, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
// import { useForm, Controller } from 'react-hook-form';
// import { RNS3 } from 'react-native-aws3';
// import { useDispatch, useSelector } from 'react-redux'; 
// import ImagePicker from 'react-native-image-crop-picker';
// import axios from 'axios'; 

// // import actions
// import { setUserImage, setUserInfo } from '../store/users'; 

// // import components
// import { Button, Screen, Text, TextInput } from '../components/atoms'; 

// // import configs
// import { configurationFileForS3Profile } from '../config'; 

// // import default styles
// import { colors, margin, padding } from '../styles'; 

// export default function AccountEditProfileScreen({ navigation }) {
//     // react hook form
//     const { control, handleSubmit, errors } = useForm(); 

//     // redux
//     const dispatch = useDispatch(); 
//     const state = useSelector(state => state); 

//     // used to determine if we need to update profile image in aws
//     const [currentImage, setCurrentImage] = useState({
//         uri: state.user.userInfo.imageUrl
//     }); 

//     const changeProfileImage = async () => {
//         try {
//             const image = await ImagePicker.openPicker({
//                 width: 500,
//                 height: 500,
//                 cropping: true
//             });
//             const filename = state.user.userInfo._id + "-profile-image.jpg"; 
//             setCurrentImage({ 
//                 uri: image.path, 
//                 name: filename, 
//                 type: "image/jpg"
//             }); 
//         } 
//         catch(error) {
//             console.log(error); 
//         }
//     }

//     const updateImageInAWS = async () => {
//         const response = await RNS3.put(currentImage, configurationFileForS3Profile); 
//         // console.log(JSON.stringify(response, null, 3)); 
//         if (response.status !== 201)
//             throw new Error("Failed to upload image to S3.");
//         dispatch(setUserImage(response.body.postResponse.location)); 
//     }

//     const onSubmit = async (newData) => {
//         try {
//             if (currentImage.uri !== state.user.userInfo.imageUrl) {
//                 await updateImageInAWS();
//             }
//             const updatedUserInfo = {
//                 ...state.user.userInfo, 
//                 ...newData, 
//             }; 

//             // update user info in database
//             const { data } = await axios.put(`http://localhost:5000/users/${state.user.userInfo._id}`, updatedUserInfo); 
//             dispatch(setUserInfo(data));
//         } 
//         catch (error) {
//             console.log(error); 
//         }
//         finally {
//             navigation.goBack();
//         } 
//     }

//     return (
//         <Screen style={styles.container}>
//             <KeyboardAvoidingView
//                 behavior={Platform.OS === "ios" ? "padding" : "height"}
//                 style={{ flex: 1 }}
//                 keyboardVerticalOffset={120}
//             >
//                 <ScrollView style={{ flex: 1 }}>
//                     <TouchableOpacity activeOpacity={1} onPress={Keyboard.dismiss}>
//                     <View style={{ marginBottom: 20 }}>
//                         {/* Profile Image */}
//                         <TouchableWithoutFeedback 
//                             onPress={changeProfileImage}>
//                             <ImageBackground
//                                 style={styles.image_user}
//                                 source={{ uri: currentImage.uri }}
//                                 >
//                                 <Text style={{ color: colors.white, fontWeight: 'bold', paddingVertical: 10 }}>Change</Text>
//                             </ImageBackground>
//                         </TouchableWithoutFeedback>

//                         {/* Name */}
//                         {errors.name && <Text style={styles.text_warning}>This is required.</Text>}
//                         <View style={styles.container_input}>
//                             <Text style={styles.text_label}>Name</Text>
//                             <Controller
//                                 control={control}
//                                 defaultValue={state.user.userInfo.name}
//                                 name="name"
//                                 rules={{ required: true }}
//                                 render={({ onChange, onBlur, value }) => (
//                                     <TextInput
//                                         onBlur={onBlur}
//                                         onChangeText={value => onChange(value)}
//                                         returnKeyType="done"
//                                         style={styles.input}
//                                         value={value}
//                                     />
//                                 )}
//                             />
//                         </View>
                        
//                         {/* Username */}
//                         {errors.username && <Text style={styles.text_warning}>This is required.</Text>}
//                         <View style={styles.container_input}>
//                             <Text style={styles.text_label}>Username</Text>
//                             <Controller
//                                 control={control}
//                                 defaultValue={state.user.userInfo.username}
//                                 name="username"
//                                 rules={{ required: true }}
//                                 render={({ onChange, onBlur, value }) => (
//                                     <TextInput
//                                         onBlur={onBlur}
//                                         onChangeText={value => onChange(value)}
//                                         returnKeyType="done"
//                                         style={styles.input}
//                                         value={value}
//                                     />
//                                 )}
//                             />
//                         </View>

//                         {/* Email */}
//                         {errors.name && <Text style={styles.text_warning}>This is required.</Text>}
//                         <View style={styles.container_input}>
//                             <Text style={styles.text_label}>Email</Text>
//                             <Controller
//                                 control={control}
//                                 defaultValue={state.user.userInfo.email}
//                                 name="email"
//                                 rules={{ required: true }}
//                                 render={({ onChange, onBlur, value }) => (
//                                     <TextInput
//                                         onBlur={onBlur}
//                                         onChangeText={value => onChange(value)}
//                                         returnKeyType="done"
//                                         style={styles.input}
//                                         value={value}
//                                     />
//                                 )}
//                             />
//                         </View>

//                         {/* Bio */}
//                         <View style={styles.container_input}>
//                             <Text style={styles.text_label}>Bio</Text>
//                             <Controller
//                                 control={control}
//                                 defaultValue={state.user.userInfo.bio}
//                                 name="bio"
//                                 render={({ onChange, onBlur, value }) => (
//                                     <TextInput
//                                         multiline
//                                         onBlur={onBlur}
//                                         onChangeText={value => onChange(value)}
//                                         style={styles.input}
//                                         value={value}
//                                     />
//                                 )}
//                             />
//                         </View>
//                     </View>
//                     </TouchableOpacity>
//                 </ScrollView>
//             </KeyboardAvoidingView>
//             {/* Update Button */}
//             <Button 
//                 onPress={handleSubmit(onSubmit)}
//                 style={styles.button_update}
//                 title="Update"
//             />
//         </Screen>
//     )
// }

// const styles = StyleSheet.create({
//     button_update: {
//         marginBottom: 180, 
//     }, 
//     container: {
//         paddingHorizontal: padding.sm,
//     }, 
//     container_input: { 
//         alignItems: 'flex-end', 
//         flexDirection: 'row',
//         alignItems: 'center', 
//         paddingVertical: 15, 
//         borderBottomColor: colors.light, 
//         borderBottomWidth: 1
//     }, 
//     image_user: {
//         height: 100, 
//         width: 100, 
//         backgroundColor: colors.primary, 
//         borderRadius: 50, 
//         alignSelf: 'center',
//         justifyContent: 'flex-end', 
//         alignItems: 'center',  
//         marginVertical: margin.md, 
//         overflow: 'hidden', 
//         opacity: 0.8
//     }, 
//     input: {
//         width: '75%',
//         borderWidth: 0
//     }, 
//     text_label: {
//         flex: 1, 
//         fontWeight: 'bold'
//     }, 
//     text_warning: {
//         color: colors.danger, 
//     }
// })