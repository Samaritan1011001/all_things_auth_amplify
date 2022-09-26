/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from './src/aws-exports';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import { polyfillGlobal } from 'react-native/Libraries/Utilities/PolyfillFunctions';

polyfillGlobal('URLSearchParams', () => undefined);
delete global.URLSearchParams;

async function urlOpener(url, redirectUrl) {
    console.log("executed!")
  await InAppBrowser.isAvailable();
  const { type, url: newUrl } = await InAppBrowser.openAuth(url, redirectUrl, {
    showTitle: false,
    enableUrlBarHiding: true,
    enableDefaultShare: false,
    ephemeralWebSession: false,
  });

  if (type === 'success') {
    Linking.openURL(newUrl);
  }
}
    Amplify.configure({
    ...awsconfig,
    oauth: {
      ...awsconfig.oauth,
      urlOpener,
    },
  });

//   Auth.configure(awsconfig);
    Amplify.Logger.LOG_LEVEL = "DEBUG";



AppRegistry.registerComponent(appName, () => App);
