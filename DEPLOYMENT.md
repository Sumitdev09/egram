# E-Grampanchayat Deployment Guide 🚀

## Quick Deploy Options

Your E-Grampanchayat system is ready to be deployed! Here are the **easiest FREE options**:

---

## 🌟 Option 1: Deploy with Vercel (RECOMMENDED - 2 minutes)

**Vercel is the easiest and fastest way to deploy!**

### Steps:

1. **Go to**: https://vercel.com
2. **Sign up/Login** with your GitHub account
3. **Click**: "Add New" → "Project"
4. **Import**: Select your `egram` repository
5. **Configure**:
   - Framework Preset: Vite ✅ (auto-detected)
   - Build Command: `npm run build` ✅
   - Output Directory: `dist` ✅
6. **Add Environment Variables**:
   - Click "Environment Variables"
   - Add `VITE_SUPABASE_URL` → your Supabase URL
   - Add `VITE_SUPABASE_ANON_KEY` → your Supabase key
7. **Click**: "Deploy" 🚀

**Done!** You'll get a URL like: `https://egram-xyz.vercel.app`

---

## 🌐 Option 2: Deploy with Netlify (2 minutes)

### Steps:

1. **Go to**: https://netlify.com
2. **Sign up/Login** with your GitHub account
3. **Click**: "Add new site" → "Import an existing project"
4. **Connect**: GitHub → Select `egram` repository
5. **Configure**:
   - Build command: `npm run build` ✅
   - Publish directory: `dist` ✅
6. **Add Environment Variables**:
   - Go to Site settings → Environment variables
   - Add `VITE_SUPABASE_URL` → your Supabase URL
   - Add `VITE_SUPABASE_ANON_KEY` → your Supabase key
7. **Click**: "Deploy site" 🚀

**Done!** You'll get a URL like: `https://egram-xyz.netlify.app`

---

## 🎯 Option 3: Deploy with GitHub Pages (Free)

### Steps:

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json** - Add to scripts:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```

3. **Add to vite.config.ts** - Add base URL:
   ```typescript
   base: '/egram/'
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**:
   - Go to GitHub repo → Settings → Pages
   - Source: `gh-pages` branch
   - Click Save

**Done!** URL: `https://sumitdev09.github.io/egram`

---

## 🔥 Option 4: Deploy with Render (Free)

### Steps:

1. **Go to**: https://render.com
2. **Sign up/Login** with GitHub
3. **Click**: "New" → "Static Site"
4. **Connect**: Your `egram` repository
5. **Configure**:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
6. **Add Environment Variables** in Render dashboard
7. **Click**: "Create Static Site" 🚀

**Done!** You'll get a URL like: `https://egram.onrender.com`

---

## ⚡ Recommended: Vercel or Netlify

**Why?**
- ✅ Automatic deployments on every git push
- ✅ Free SSL certificate (HTTPS)
- ✅ Custom domain support
- ✅ Instant rollbacks
- ✅ Edge network (fast worldwide)
- ✅ Environment variables support
- ✅ Preview deployments for pull requests

---

## 📝 Important Notes

### Environment Variables Required:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Get these from: **Supabase Dashboard → Settings → API**

### After Deployment:
1. ✅ Test the website URL
2. ✅ Make sure login/signup works
3. ✅ Share URL with friends: `https://your-site.vercel.app`
4. ✅ Every git push will auto-deploy updates!

---

## 🎉 Success!

Once deployed, share your URL:
- **Homepage**: `https://your-site.vercel.app`
- **Citizen Portal**: `https://your-site.vercel.app/auth`
- **Admin Login**: `https://your-site.vercel.app/admin/login`

**Made with ❤️ by Sumit Yadav**
