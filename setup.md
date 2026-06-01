# Tailwind CSS Setup Guide

# How to Setup Tailwind CSS

This guide explains how to setup Tailwind CSS manually using Tailwind v3.

---

# Why Tailwind v3?

Tailwind CSS v4 has changed architecture and ecosystem.

Because of this:

```bash id="1s8xqa"
npx tailwindcss init
```

may not work properly in v4 setups.

Tailwind v4 assumes developers often use:

* Vite
* React
* Next.js
* Astro

For beginners, Tailwind v3 is easier because:

* setup is simpler
* tutorials match properly
* easier learning experience
* fewer tooling issues

---

# Step 1 — Initialize Node Project

Run:

```bash id="8m2xrv"
npm init -y
```

This creates:

```txt id="5v7kpt"
package.json
```

The `package.json` file stores:

* project information
* dependencies
* scripts

---

# Step 2 — Install Tailwind CSS

Run:

```bash id="0x7mrv"
npm install -D tailwindcss@3 postcss autoprefixer
```

This installs:

* Tailwind CSS
* PostCSS
* Autoprefixer

---

# Step 3 — Create Tailwind Config File

Run:

```bash id="5v8kpt"
npx tailwindcss init
```

This creates:

```txt id="1x5mpt"
tailwind.config.js
```

---

# Step 4 — Configure Content Paths

Open:

```txt id="4t2xrv"
tailwind.config.js
```

Update it like this:

```js id="9v0mpt"
/** @type {import('tailwindcss').Config} */

module.exports = {

  content: ["./dist/*.html"],

  theme: {
    extend: {},
  },

  plugins: [],
}
```

---

# Step 5 — Create Input CSS File

Create:

```txt id="1k2xqn"
src/input.css
```

Add:

```css id="6t8wrl"
@tailwind base;

@tailwind components;

@tailwind utilities;
```

These directives import Tailwind’s:

* base styles
* component styles
* utility classes

---

# Step 6 — Create HTML File

Create:

```txt id="0m7xrv"
dist/index.html
```

Basic structure:

```html id="5x2mqa"
<!DOCTYPE html>

<html lang="en">

<head>

  <meta charset="UTF-8">

  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Tailwind Project</title>

  <link rel="stylesheet" href="style.css">

</head>

<body>

  <h1 class="text-4xl font-bold text-blue-500">
    Hello Tailwind CSS 😄
  </h1>

</body>

</html>
```

---

# Step 7 — Build Tailwind CSS

Run:

```bash id="8v4kzn"
npx tailwindcss -i ./src/input.css -o ./dist/style.css --watch
```

Meaning:

* `-i` → input file
* `-o` → output file
* `--watch` → automatically rebuild on changes

---

# Final Folder Structure

```txt id="2m5xpt"
project/
│
├── src/
│   └── input.css
│
├── dist/
│   ├── index.html
│   └── style.css
│
├── package.json
├── package-lock.json
└── tailwind.config.js
```

---

# Running the Project

1. Keep the Tailwind watch command running.
2. Open:

```txt id="7t2kzn"
dist/index.html
```

in browser.

---

# Important Notes

## node_modules Folder

After installation, a huge folder called:

```txt id="9m4xqn"
node_modules/
```

will appear.

This contains installed packages and dependencies.

Do NOT upload this folder to GitHub.

---

# Add .gitignore

Create:

```txt id="3v8kqa"
.gitignore
```

Add:

```gitignore id="1x7mpt"
node_modules/
```

---

# Common Beginner Mistakes

## 1. Forgetting to Run Watch Command

Without:

```bash id="6v0kpt"
npx tailwindcss -i ./src/input.css -o ./dist/style.css --watch
```

Tailwind styles will not update.

---

## 2. Wrong CSS Link

Make sure HTML links:

```html id="0x8mrv"
<link rel="stylesheet" href="style.css">
```

correctly.

---

## 3. Wrong Content Path

If Tailwind classes do not work, check:

```js id="4m8xqn"
content: ["./dist/*.html"]
```

---

# Recommended Learning Approach

Do NOT memorize Tailwind classes.

Instead:

* build projects
* experiment with UI
* practice responsiveness
* read official docs when needed

---

# Official Documentation

https://tailwindcss.com/docs
