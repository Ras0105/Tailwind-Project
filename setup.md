##how to setup tailwind css
1- run 

```
npm install -D tailwindcss@3 postcss autoprefixer

npx tailwindcss init
```
2- update tailwind.config.js file to include this line:
```
content:["./dist/*.html"],
```

3-create src\input.css to include:
```
@tailwind base;

@tailwind components;

@tailwind utilities;

```

4- include the output.css file to your html

5- run the commands:

```
npx tailwindcss -i ./src/input.css -o ./dist/style.css --watch
```