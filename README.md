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

![01-embedded](https://github.com/douglowder/CriticalUpdatesTest/assets/6577821/c7e22273-ed8d-4ad1-aa13-f0c165d1cf98) ![02-no-updates](https://github.com/douglowder/CriticalUpdatesTest/assets/6577821/5868b1b4-bc31-4b58-ab51-23e004d08100)



### Push an update

```bash
yarn update --message "Testing an update"
```

(This runs a script that manually modifies `app.json` to add a custom `message` property in the `extra` section, and then run `eas update`. Doing this results in an update manifest that contains the custom property in the `extra` section of the `expoClient` object.)

Check the checkbox near the bottom of the screen labeled "Check at 10 second intervals". After a few seconds, the monitor banner will appear at the top with a notification icon, alerting the user that an update is available.

![03-update-available](https://github.com/douglowder/CriticalUpdatesTest/assets/6577821/640fc938-ca43-4f82-b34e-0d2f3854bbb9)


Click "Details" on the banner to see information on the update. Click "Download" to fetch the update, and "Launch" to restart the app with the new update bundle.

![04-update-available-detail](https://github.com/douglowder/CriticalUpdatesTest/assets/6577821/c6db3f53-68f7-4235-ba5c-bb8c9383c793) ![05-update-downloaded](https://github.com/douglowder/CriticalUpdatesTest/assets/6577821/b1cf1f9e-2ca1-401c-b1a4-af351c1c4fdd) ![06-update-launched](https://github.com/douglowder/CriticalUpdatesTest/assets/6577821/80df68e6-e4f2-4ea2-ad6e-587beeab30e8)




### Check for updates when the app foregrounds

Enable the "Check when app foregrounds" toggle. Now push another update using a `yarn update` command as above. In the simulator, navigate back to the home screen, and then click on the app icon to bring it back to the foreground. The monitor code will check the update server and show the banner indicating a new available update.

### Automatic updates

Force quit the app, and then issue a `yarn update` command like the one above, to run EAS Update again and upload a new update bundle to the server.  Now start the app. Since the `expo-updates` module has the default configuration for automatic updates, it will query the server on startup, see that there is an update, and download it. Therefore, the monitor banner will now show that a new update has been downloaded.  Click "Launch" to load and run the new update. If a bundle is downloaded, it will also be automatically launched the next time the app cold starts.

### Push a critical update
```bash
yarn update --message "Testing a critical update" --critical
```
Again, check the checkbox near the bottom of the screen labeled "Check at 10 second intervals".
The banner will show that a critical update is available, with a red icon.

![07-critical-update](https://github.com/douglowder/CriticalUpdatesTest/assets/6577821/d6928d65-fc30-4108-aa91-d1ddf7c60dff)

Now enable the "Download and launch critical updates" toggle. On the next check for updates, 10 seconds later, the monitor will immediately download and launch the new update without manual intervention.
