# How to Make a Website and Put It on the Internet
A beginner-friendly guide. No coding experience needed.

---

## What You'll Need
- A computer (Mac or Windows)
- An internet connection
- A free GitHub account (github.com)
- A free Vercel account (vercel.com)

---

## The Big Picture

Here's what we're doing:
1. **Build** your website on your computer
2. **Save** it to GitHub (like Google Drive for code)
3. **Publish** it with Vercel (makes it live on the internet)
4. **Connect** a custom domain (optional - like "mysite.com")

Once set up, updating your site is just: make changes → save → it's live!

---

## Step 1: Open Terminal

Terminal is where you type commands to control your computer.

**On Mac:**
- Press `Cmd + Space`
- Type "Terminal"
- Press Enter

You'll see a window with text. This is where you type commands.

---

## Step 2: Create Your Website Project

Copy and paste these commands one at a time. Press Enter after each one.

**Create a new project:**
```
npm create vite@latest my-website -- --template react
```
(Replace "my-website" with whatever you want to call it)

**Go into your project folder:**
```
cd my-website
```

**Install everything it needs:**
```
npm install
```

**See your website:**
```
npm run dev
```

Now open your web browser and go to: `http://localhost:5173`

You'll see your website! It only works on your computer for now.

To stop it, go back to Terminal and press `Ctrl + C`.

---

## Step 3: Add Your Images

Your project has a folder called `public`. This is where images go.

**To open this folder:**
```
open public
```

**Create an "images" folder inside it**, then add your images there.

**To use an image in your code:**
```
<img src="/images/my-photo.jpg" />
```

That's it! The path always starts with `/images/` followed by the filename.

---

## Step 4: Create a Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Choose "Continue with GitHub" (easiest)
4. Authorize it

---

## Step 5: Put Your Website on the Internet

**First time only - log in to Vercel from Terminal:**
```
npx vercel login
```
A browser window opens. Click to confirm.

**Publish your website:**
```
npx vercel --prod
```

First time it asks questions:
- "Set up and deploy?" → Type `y` and press Enter
- "Which scope?" → Press Enter
- "Link to existing project?" → Type `n` and press Enter
- "What's your project's name?" → Type a name and press Enter
- "In which directory is your code located?" → Press Enter
- "Want to override settings?" → Type `n` and press Enter

**Done!** It gives you a link like `https://my-website-abc123.vercel.app`

That's your live website! Anyone can visit it.

---

## Step 6: Fix Page Links (Important!)

If someone goes directly to a page like `/about`, they'll see an error.

**To fix this, create a file called `vercel.json`:**

1. Open your project folder
2. Create a new file called `vercel.json` (not in any subfolder, right at the top level)
3. Put this inside:
```
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```
4. Save it
5. Publish again: `npx vercel --prod`

---

## Step 7: Connect to GitHub (So Updates Are Automatic)

GitHub saves your code online and tells Vercel when you make changes.

### Create a GitHub account
1. Go to [github.com](https://github.com)
2. Sign up for free

### Create a repository (a place to store your project)
1. Click the "+" icon in the top right
2. Click "New repository"
3. Name it (like "my-website")
4. Keep it Public or Private (your choice)
5. Click "Create repository"

### Upload your code to GitHub
In Terminal, run these commands (one at a time):

```
git init
```

```
git add .
```

```
git commit -m "My first upload"
```

```
git remote add origin https://github.com/YOURUSERNAME/YOURREPONAME.git
```
(Replace YOURUSERNAME and YOURREPONAME with your actual GitHub username and repository name)

```
git push -u origin main
```

### Connect GitHub to Vercel
1. Go to [vercel.com](https://vercel.com) and log in
2. Click on your project
3. Click "Settings" (tab at the top)
4. Click "Git" (in the left sidebar)
5. Click "Connect Git Repository"
6. Select your GitHub repository
7. Click "Connect"

**Now your site auto-updates whenever you push to GitHub!**

---

## Step 8: Making Changes to Your Site

After everything is connected, here's how to update your site:

### 1. Make your changes
Edit your files however you want.

### 2. Test locally
```
npm run dev
```
Check `http://localhost:5173` to see your changes.

### 3. Save and upload to GitHub
```
git add .
```

```
git commit -m "Describe what you changed"
```

```
git push
```

### 4. Wait ~1 minute
Vercel automatically sees the change and updates your live site.

**That's it!** No need to run any Vercel commands anymore.

---

## Step 9: Connect Your Own Domain (Optional)

Want `www.yourname.com` instead of `yourproject.vercel.app`?

### Buy a domain
Get one from:
- [Namecheap](https://namecheap.com) (~$10/year)
- [Google Domains](https://domains.google) (~$12/year)
- [GoDaddy](https://godaddy.com) (~$15/year)

### Add it to Vercel
1. Go to your project on [vercel.com](https://vercel.com)
2. Click "Settings"
3. Click "Domains"
4. Type your domain (like `mysite.com`)
5. Click "Add"

### Update your domain settings
Vercel shows instructions. You'll need to:
1. Go to where you bought your domain
2. Find "DNS Settings" or "Nameservers"
3. Add the records Vercel tells you to add

This part varies by domain provider. Vercel's instructions are pretty clear.

### Wait
It can take 10 minutes to 48 hours for the domain to work. Usually it's fast.

---

## Cheat Sheet

| What you want to do | What to type |
|---------------------|--------------|
| See your site locally | `npm run dev` |
| Stop the local site | `Ctrl + C` |
| Publish to internet | `npx vercel --prod` |
| Save changes to GitHub | `git add .` then `git commit -m "message"` then `git push` |
| Open your project folder | `open .` |
| Open images folder | `open public/images` |

---

## Common Problems

### "I changed something but the live site looks the same"
- Did you save the file?
- Did you push to GitHub? (`git add .` → `git commit -m "msg"` → `git push`)
- Wait a minute for Vercel to rebuild
- Try refreshing with `Cmd + Shift + R` (clears cache)

### "My images aren't showing"
- Is the image in the `public/images` folder?
- Check spelling and capitalization (must match exactly!)
- Path should start with `/images/`

### "Page shows error when I go directly to it"
- Did you create `vercel.json`? (See Step 6)
- Did you redeploy after creating it?

### "I'm lost in Terminal"
- Type `pwd` to see where you are
- Type `ls` to see what's in the current folder
- Type `cd ..` to go up one folder
- Type `cd foldername` to go into a folder

---

## You Did It!

Your website is on the internet. When you want to update it:
1. Change files
2. `git add .`
3. `git commit -m "what I changed"`
4. `git push`

That's the whole workflow. It gets easier every time!
