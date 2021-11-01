import {Platform} from 'react-native';

export const configurationForGoogleSignIn = {
  webClientId:
    Platform.OS === 'ios'
      ? process.env.CLIENT_ID_IOS
      : process.env.CLIENT_ID_ANDRIOD,
  iosClientId:
    process.env.CLIENT_ID_IOS,
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
};
