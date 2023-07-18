## CriticalUpdatesTest

App to test out

- Ideas for implementing critical updates
- Uses the [new forthcoming JS API](https://github.com/expo/expo/pull/23532)

### Quick start

```bash
yarn
eas init
eas update:configure

# Build and run iOS
npx expo run:ios --configuration Release
# Build and run Android
npx expo run:android --variant release
```

See that the app is running from built-in code.  Monitor status (circle button in upper right corner) will be green.

### Push an update

```bash
yarn update --message "Testing an update"
```

(This runs a script that manually modifies `app.json` to add a custom `message` property in the `extra` section, and then run `eas update`. Doing this results in an update manifest that contains the custom property in the `extra` section of the `expoClient` object.)

After a few seconds, the monitor status will turn yellow (update available). Click on the yellow button to get more information about the update, and see the "Download and run update" button.

Press "Download and run update" button to run the update. Status should be green again, and the app should show that it is running an update.

### Automatic updates

This app uses the `expo-updates` setting `checkAutomatically: ON_ERROR_RECOVERY` (see `app.json`). With this setting, updates are not automatically downloaded on startup unless an error was encountered while loading the last update.

You can turn on automatic update downloads by removing the above setting, or changing the value to `ON_LOAD`, then running `npx expo prebuild` to propagate the new setting to the native iOS and Android code (`Expo.plist` and `AndroidManifest.xml`).

After building the app this way, try force quitting the app, push an update as above, then start the app up again.  Now the app should automatically detect and download the update, and status should automatically turn yellow.

### Push a critical update
```bash
yarn update --message "Testing a critical update" --critical
```

The monitor button will turn red, indicating a critical update. The monitor code automatically downloads and runs critical updates.
