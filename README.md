## CriticalUpdatesTest

App to test out

- Ideas for implementing critical updates
- New JS API `@expo/use-updates`

_Usage_

```bash
# Setup
yarn
eas init
eas update:configure

# Build
npx expo run:ios --configuration Release

# See that the app is running from built-in code
# Monitor status (circle button in upper right corner)
# is green

# Push an update
yarn update --message "Testing an update"

# After a few seconds, hide the app, and then click on it to bring it
# back to the foreground. The monitor status will be yellow
# (update available).

# Press "Download and run update" button to run the update. Status
# should be green again, and the app should show that it is running
# an update.

# After pushing an update, restarting the app should also show the 
# yellow status, if automatic updates are enabled (in app.json,
# "checkAutomatically" is set to "ON_LOAD", or not present)

# Push a critical update
yarn update --message "Testing a critical update" --critical

# Same as above, except the button will turn red
```
