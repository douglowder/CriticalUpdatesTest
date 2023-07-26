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

![01-embedded](https://github.com/douglowder/CriticalUpdatesTest/assets/6577821/a84671f9-7741-47e9-bee7-92457ea98f1a)![02-no-updates](https://github.com/douglowder/CriticalUpdatesTest/assets/6577821/2e4d5ae9-b418-4c72-95d7-a939ec193683)


### Push an update

```bash
yarn update --message "Testing an update"
```

(This runs a script that manually modifies `app.json` to add a custom `message` property in the `extra` section, and then run `eas update`. Doing this results in an update manifest that contains the custom property in the `extra` section of the `expoClient` object.)

Check the checkbox near the bottom of the screen labeled "Check at 10 second intervals". After a few seconds, the monitor banner will appear at the top with a notification icon, alerting the user that an update is available.

![03-update-available](https://github.com/douglowder/CriticalUpdatesTest/assets/6577821/ced54467-4a12-43e0-ad1b-1e7abf48ccbf)

Click "Details" on the banner to see information on the update. Click "Download" to fetch the update, and "Launch" to restart the app with the new update bundle.

![04-update-available-detail](https://github.com/douglowder/CriticalUpdatesTest/assets/6577821/b1d7f545-9110-4851-a85e-0f9a5f6a3711) ![05-update-downloaded](https://github.com/douglowder/CriticalUpdatesTest/assets/6577821/c0a1bd30-fbe2-4ab9-b1dc-b7e81decf00d) ![06-update-launched](https://github.com/douglowder/CriticalUpdatesTest/assets/6577821/14408b1b-d96e-403b-a8b5-c2c0ac1de1e1)




### Automatic updates

Force quit the app, and then issue a `yarn update` command like the one above, to run EAS Update again and upload a new update bundle to the server.  Now start the app. Since the `expo-updates` module has the default configuration for automatic updates, it will query the server on startup, see that there is an update, and download it. Therefore, the monitor banner will now show that a new update has been downloaded.  Click "Launch" to load and run the new update. If a bundle is downloaded, it will also be automatically launched the next time the app cold starts.

### Push a critical update
```bash
yarn update --message "Testing a critical update" --critical
```
Again, check the checkbox near the bottom of the screen labeled "Check at 10 second intervals".
The banner will show that a critical update is available, with a red icon.

![07-critical-update](https://github.com/douglowder/CriticalUpdatesTest/assets/6577821/989eb683-e05e-43a5-8a3d-cbbb0d147988)

Now enable the "Download and launch critical updates" toggle. On the next check for updates, 10 seconds later, the monitor will immediately download and launch the new update without manual intervention.
