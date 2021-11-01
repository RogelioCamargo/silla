import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

// import components
import {Button, Text} from '../components/atoms';

// import configs
import {configurationForGoogleSignIn} from '../configs';

// import default styles
import {colors, fontSize, margin, padding} from '../styles';

GoogleSignin.configure(configurationForGoogleSignIn);

export default function LoginScreen() {
  const onFacebookButtonPress = async () => {
    try {
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      // Once signed in, get the users AccesToken
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );

      // Sign-in the user with the credential
      return auth().signInWithCredential(facebookCredential);
    } catch (err) {
      console.log(err);
    }
  };

  const onGoogleButtonPress = async () => {
    try {
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/login_image_2.jpg')}
        style={styles.container_background}>
        <View style={styles.container_logo}>
          <Text style={styles.text_logo}>silla</Text>
        </View>
        <View style={styles.container_bottom}>
          <View style={styles.container_buttons}>
            {/* <Button style={styles.button_apple} title="Sign in with Apple" /> */}
            <Button
              onPress={() =>
                onGoogleButtonPress().then(() =>
                  console.log('Signed in with Google!'),
                )
              }
              style={styles.button_google}
              title="Sign in with Google"
            />
            <Button
              onPress={() =>
                onFacebookButtonPress().then(() =>
                  console.log('Signed in with Facebook!'),
                )
              }
              style={styles.button_facebook}
              title="Sign in with Facebook"
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button_apple: {
    backgroundColor: colors.dark,
  },
  button_facebook: {
    backgroundColor: '#3b5998',
  },
  button_google: {
    backgroundColor: '#DB4437',
    marginVertical: 15,
  },
  container_background: {
    flex: 1,
    resizeMode: 'center',
  },
  container_bottom: {
    paddingHorizontal: padding.standard,
    justifyContent: 'center',
    marginBottom: margin.xl,
  },
  container_buttons: {
    marginBottom: 100,
  },
  container_logo: {
    alignItems: 'center',
    color: colors.black,
    flex: 1,
  },
  container_terms: {
    alignItems: 'center',
  },
  text_logo: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: 90,
    letterSpacing: 2,
    marginTop: 100,
  },
  text_terms: {
    color: colors.white,
    fontSize: fontSize.sm,
  },
});
