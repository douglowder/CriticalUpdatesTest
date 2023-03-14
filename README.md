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

# See that the app is running from built-in code, no update available

# Push an update
yarn update --message "Testing an update"

# Press "Check manually for updates", see update info appear and
# the "Download and run update" button appear. Press it to run the update.

# After pushing an update, restarting the app should also show the update
# available and the "Download and run update" button appear. Restarting the
# app a second time will download and run the update automatically.

# Push a critical update
yarn update --message "Testing a critical update" --critical
```
