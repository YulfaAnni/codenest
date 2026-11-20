# 🔥 Firestore 400 Error - Setup Required

## Problem
You're seeing "400 Bad Request" errors because **Firestore needs to be set up in your Firebase Console**.

## Solution: Enable Firestore

### Step 1: Go to Firebase Console
1. Open https://console.firebase.google.com/
2. Select your project: **earnest-sight-473304-b3**

### Step 2: Create Firestore Database
1. Click on **"Firestore Database"** in the left sidebar
2. Click **"Create database"**
3. Choose a location (e.g., `us-central1`)
4. Select **"Start in production mode"** (we already have security rules)
5. Click **"Enable"**

### Step 3: Update Security Rules
Once Firestore is created, go to the **"Rules"** tab and paste:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to read tutorials
    match /tutorials/{tutorialId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

Click **"Publish"**.

### Step 4: Refresh Your App
Once Firestore is enabled, refresh your app at http://localhost:3000

---

## What's Happening?

The 400 errors mean:
- ❌ Firestore database doesn't exist yet in your Firebase project
- ❌ Or: Firestore rules are rejecting the connection

Once you enable Firestore in the console, the app will work perfectly! 🎉

---

## After Setup

Your app will be able to:
- ✅ Add tutorials
- ✅ View tutorials
- ✅ Update tutorials
- ✅ Delete tutorials
- ✅ Real-time sync (optional)

The current code is correct - it just needs the database to exist first!
