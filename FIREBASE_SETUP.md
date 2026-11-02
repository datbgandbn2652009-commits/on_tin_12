# Shared leaderboard setup

The site is static, so it needs a shared database before visitors on different devices can see the same scores. This project uses Firebase Realtime Database through its HTTPS REST API.

## Firebase setup

1. Create a Firebase project and add a Web app.
2. In **Build → Realtime Database**, create a database.
3. In **Build → Authentication → Sign-in method**, enable **Email/Password**, then create an administrator account.
4. Copy the administrator account's **UID** from Authentication → Users.
5. In Realtime Database → Rules, replace `ADMIN_UID` below with that UID and publish:

```json
{
  "rules": {
    "leaderboard": {
      ".read": true,
      ".write": "auth != null && auth.uid === 'ADMIN_UID'",
      "$playerKey": {
        ".write": "!data.exists() || (auth != null && auth.uid === 'ADMIN_UID')",
        ".validate": "newData.hasChildren(['name', 'id', 'score', 'pct', 'n', 'date']) && newData.child('score').isNumber() && newData.child('score').val() >= 0 && newData.child('score').val() <= 9000 && newData.child('pct').isNumber() && newData.child('pct').val() >= 0 && newData.child('pct').val() <= 100"
      }
    }
  }
}
```

These rules let visitors read the shared board and add a score for an ID that has no entry yet. Updating or clearing the leaderboard requires the authenticated administrator UID.

## Add the public web configuration

Open `firebase-config.js` and fill `apiKey` and `databaseURL` from the Firebase Web app and Realtime Database pages. The web API key and database URL are public client settings. Do not add a service-account key or administrator password to this file.

After publishing the updated site, all visitors use the shared leaderboard. When the administrator clicks **Xóa bảng**, the site asks for the Firebase administrator email and password; Firebase rules verify the account before deleting scores. The existing `MaGi / 25` profile controls whether the admin controls are shown, while Firebase authentication enforces deletion permission.
