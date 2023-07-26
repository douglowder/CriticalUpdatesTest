## Updates API demo

App to test out

- Features provided by `expo-updates`
- Example solutions for some use cases
- Uses the [new forthcoming JS API](https://docs.expo.dev/versions/unversioned/sdk/updates/#useupdates)

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

See that the app is running from built-in code. Toggle "Monitor always visible" to show the monitor's banner view, showing that there are no available updates.

### Push an update

```bash
yarn update --message "Testing an update"
```

(This runs a script that manually modifies `app.json` to add a custom `message` property in the `extra` section, and then run `eas update`. Doing this results in an update manifest that contains the custom property in the `extra` section of the `expoClient` object.)

Check the checkbox near the bottom of the screen labeled "Check at 10 second intervals". After a few seconds, the monitor banner will appear at the top with a notification icon, alerting the user that an update is available.

Click "Details" on the banner to see information on the update. Click "Download" to fetch the update, and "Launch" to restart the app with the new update bundle.

### Automatic updates

Force quit the app, and then issue a `yarn update` command to run EAS Update again and upload a new update bundle to the server.  Now start the app. Since the `expo-updates` module has the default configuration for automatic updates, it will query the server on startup, see that there is an update, and download it. Therefore, the monitor banner will now show that a new update has been downloaded.  Click "Launch" to load and run the new update. If a bundle is downloaded, it will also be automatically launched the next time the app cold starts.

### Push a critical update
```bash
yarn update --message "Testing a critical update" --critical
```

The banner will show that a critical update is available, with a red icon. The monitor code automatically downloads and runs critical updates, if the "Download and launch critical updates" toggle is enabled.
