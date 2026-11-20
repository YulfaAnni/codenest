# Firebase Setup Guide for CodeNest

## ✅ Migration Complete!
Your CodeNest app has been migrated from Supabase to Firebase.

## 📋 Next Steps to Complete Setup:

### 1. Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: **codenest** (or your preferred name)
4. Follow the setup wizard

### 2. Enable Firestore Database
1. In Firebase Console, go to **Build → Firestore Database**
2. Click "Create database"
3. Choose **Start in test mode** (for development)
4. Select your preferred location
5. Click "Enable"

### 3. Get Your Firebase Configuration
1. In Firebase Console, go to **Project Settings** (⚙️ icon)
2. Scroll down to "Your apps"
3. Click the **Web** icon (`</>`)
4. Register your app with nickname: **CodeNest Web**
5. Copy the `firebaseConfig` object

### 4. Update Your Firebase Configuration
Open `src/firebaseConfig.js` and replace the placeholder values:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",              // Replace this
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",  // Replace this
  projectId: "YOUR_PROJECT_ID",        // Replace this
  storageBucket: "YOUR_PROJECT_ID.appspot.com",   // Replace this
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",  // Replace this
  appId: "YOUR_APP_ID"                 // Replace this
};
```

### 5. Install Firebase CLI (for deployment)
```bash
npm install -g firebase-tools
```

### 6. Login to Firebase
```bash
firebase login
```

### 7. Initialize Firebase in Your Project
```bash
firebase init
```
- Select: **Hosting**
- Choose: **Use an existing project**
- Select your project
- Public directory: **build**
- Single-page app: **Yes**
- GitHub deploys: **No** (for now)

### 8. Update .firebaserc
Replace `your-project-id` with your actual Firebase project ID:
```json
{
  "projects": {
    "default": "your-actual-project-id"
  }
}
```

## 🚀 Deployment Commands

### Build and Deploy to Firebase Hosting
```bash
npm run deploy
```

Or separately:
```bash
npm run build
firebase deploy
```

## 📊 Firestore Security Rules (Important!)

After testing, update your Firestore rules for production:

1. Go to **Firestore Database → Rules**
2. Replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /tutorials/{tutorialId} {
      // Anyone can read tutorials
      allow read: if true;
      
      // Only authenticated users can write
      // For now, allowing all writes (change in production!)
      allow write: if true;
    }
  }
}
```

## 🔄 What Changed:

### Files Updated:
- ✅ `supabaseClient.js` → `firebaseConfig.js`
- ✅ `supabaseTutorials.js` → `firebaseTutorials.js`
- ✅ `App.js` - Updated imports to use Firebase
- ✅ `package.json` - Added deploy script, removed Supabase

### Files Created:
- ✅ `firebase.json` - Firebase hosting configuration
- ✅ `.firebaserc` - Firebase project reference

### Dependencies:
- ✅ Installed: `firebase`
- ✅ Removed: `@supabase/supabase-js`

## 🎯 Testing Locally

1. Start the development server:
```bash
npm start
```

2. Make sure you've updated the Firebase config with your actual credentials!

## 📝 Additional Features You Can Add:

### Authentication
```bash
# In firebaseConfig.js, add:
import { getAuth } from 'firebase/auth';
export const auth = getAuth(app);
```

### Storage (for file uploads)
```bash
# In firebaseConfig.js, add:
import { getStorage } from 'firebase/storage';
export const storage = getStorage(app);
```

## ⚠️ Important Notes:

1. **Never commit** your actual Firebase credentials to public repositories
2. Consider using **environment variables** for production:
   - Create `.env` file
   - Add to `.gitignore`
   - Use `process.env.REACT_APP_FIREBASE_API_KEY` etc.

3. **Update Firestore rules** before going to production!

## 🆘 Troubleshooting:

### Error: "Firebase: Firebase App named '[DEFAULT]' already exists"
- You're initializing Firebase multiple times. Check that you only import from `firebaseConfig.js`

### Error: "Missing or insufficient permissions"
- Check your Firestore security rules
- Make sure you're in "test mode" for development

### Build fails
- Make sure you've updated the Firebase config with real values
- Run `npm install` to ensure all dependencies are installed

## 📚 Resources:

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Getting Started](https://firebase.google.com/docs/firestore/quickstart)
- [Firebase Hosting Guide](https://firebase.google.com/docs/hosting)

---

**Ready to deploy?** 
1. Update your Firebase config
2. Run `npm run deploy`
3. Your app will be live at `https://your-project-id.web.app`
