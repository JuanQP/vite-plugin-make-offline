# vite-plugin-make-offline

Run your compiled project by just double-clicking it.

### The problem

If you just want to open your compiled `index.html` because you want to use it **offline**, is not possible by default in Vite, because of how it works. So, you want to simply run `npm run build` and then *use* the `index.html` offline (AKA with the *file protocol* `file://` in your browser).

### How to use it

```sh
npm -D install vite-plugin-make-offline
```

In your `vite.config.ts` you can use it like this:

```ts
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { makeOffline } from "vite-plugin-make-offline";

export default defineConfig({
  plugins: [react(), makeOffline()], // This is the plugin 😃
})
```

Build it

```sh
npm run build
```

Double-click your `dist/index.html` and now you can just use your app offline 😉

### What does this do?

* This small plugin will run a `replace` in the import of the script to make it usable offline.
* This means: **not** using the props `crossorigin` and `type="module"`. Please, [refer to the documentation](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin) about the implications of doing this.
* Then, it will add the prop `defer` to the `<script>` tag in order to wait for the html to load before running the app.

And also will use this config:

```js
{
  base: "./",
  build: {
    rollupOptions: {
      output: {
        format: "iife"
      }
    }
  }
}
```

* `base: "./"`: Because the purpose of this plugin is to make your built project usable with `file://` protocol, it needs to use relative paths to load images and css files.
* `format: "iife"`: Because it needs to be built as a library.

### Example project

Let's start with the minimal example: The Vite React TS example app.

Install it

```sh
npm create vite@latest example -- --template react-ts
cd example
npm install
npm run build
```

If you go to `dist/index.html` and try to open it in your browser you will get a CORS error...

![image](https://user-images.githubusercontent.com/11776905/229627736-ed6201cb-712d-49e4-88ab-e68e0d37c1a0.png)

We need to build our project as a `iife` (*Immediately Invoked Function Expression*) and then make the paths of our assets relative to the location where this `index.html` is located.

You only have to install this plugin, build again, and then you can use the `index.html` file 😉. Details on how to do this in the [How to use it section](#how-to-use-it).

### Tips

Because maybe this is not the normal way of *deploying* an app, you may want to have a separate file for this build. You can easily do this by creating a new vite config like `vite.config.offline.ts` and then you could add a new script in your `package.json` like this:

```
"build-offline": "tsc && vite build --config vite.config.offline.ts",
```

And then use it like:

```
npm run build-offline
```

### Caveats

* If you need to use `react-router-dom`, because of how it works, your router must be a `HashRouter`, not a `BrowserRouter`
