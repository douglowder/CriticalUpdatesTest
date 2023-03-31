## CriticalUpdatesTest

App to test out

- Ideas for implementing critical updates
- Ideas for an Updates provider API

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

# After a few seconds, status button turns yellow
# indicating an update is available. Press yellow button
# to open modal.

# Press "Download and run update" button to run the update.

# After pushing an update, restarting the app should also show the 
# yellow status

# Push a critical update
yarn update --message "Testing a critical update" --critical

# Same as above, except the button will turn red
```
