# 🚀 Quick Deploy Checklist

## Before First Deploy

### 1. Firebase Console (5 min)
- [ ] Create project at https://console.firebase.google.com/
- [ ] Enable **Firestore** (Production mode)
- [ ] Enable **Authentication** (Anonymous + Google)
- [ ] Get Firebase config from Project Settings

### 2. Local Setup (2 min)
```bash
# Add credentials
cp .env.example .env
# Edit .env with your Firebase config

# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login
```

### 3. Configure Firebase (3 min)
```bash
# Initialize
firebase init
  # Select: Firestore + Hosting
  # Firestore rules: firestore.rules
  # Firestore indexes: firestore.indexes.json
  # Public directory: build
  # Single-page app: Yes

# Update .firebaserc with your project ID
```

### 4. Deploy Rules (1 min)
```bash
firebase deploy --only firestore:rules
```

### 5. Test (2 min)
```bash
npm start
# Try: Sign in → Add tutorial → Sign out
```

### 6. Deploy! (3 min)
```bash
npm run deploy
```

---

## Every Time You Deploy

```bash
# 1. Make your changes
# 2. Test locally
npm start

# 3. Deploy
npm run deploy
```

---

## Emergency: Rollback

```bash
# See deployment history
firebase hosting:releases:list

# Rollback to previous version
firebase hosting:rollback
```

---

## Your URLs

**Local:** http://localhost:3000
**Production:** https://YOUR-PROJECT-ID.web.app

---

## Quick Commands

```bash
npm start              # Dev server
npm run build         # Build
npm run deploy        # Deploy everything
firebase open         # Open console
firebase projects:list # List projects
```

---

## Environment Variables

Required in `.env`:
```
REACT_APP_FIREBASE_API_KEY=...
REACT_APP_FIREBASE_AUTH_DOMAIN=...
REACT_APP_FIREBASE_PROJECT_ID=...
REACT_APP_FIREBASE_STORAGE_BUCKET=...
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=...
REACT_APP_FIREBASE_APP_ID=...
```

---

## Need Help?

- **Setup:** `FIREBASE_PRODUCTION_SETUP.md`
- **Full Guide:** `MIGRATION_SUMMARY.md`
- **Firebase Docs:** https://firebase.google.com/docs

---

**Total Setup Time: ~15 minutes**
**Let's go! 🚀**
