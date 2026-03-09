# JavaScript custom components

This directory contains the website's reusable **Web Components** (custom HTML elements) built with vanilla JavaScript.

## How custom components are structured

Each component lives in its own folder and follows the same pattern:

- `component-name.js` → the class that extends `HTMLElement`.
- `component-name-template.js` → a function that returns the component HTML string.
- `style.css` → styles scoped by class names used in the template.

Current components:

- `audio-player/`
- `track-option/`

## The custom-component workflow used in this project

### 1) Create a class that extends `HTMLElement`

A component class uses `connectedCallback()` to render itself and attach event listeners.

Example in this repo:

- `AudioPlayer` in `audio-player/audio-player.js`
- `TrackOption` in `track-option/track-option.js`

Both classes read values from HTML attributes (for example, `track-id`, `track-title`, and `track-src`) and expose them through getters.

### 2) Build markup with a template function

Instead of writing large HTML directly inside `connectedCallback()`, each component imports `HTML_TEMPLATE` from a `*-template.js` file.

This template function receives dynamic values (title, description, src, etc.) and returns a full HTML string that is assigned with:

```js
this.innerHTML = HTML_TEMPLATE(...)
```

### 3) Register the custom element

The component only becomes usable in HTML after registration:

```js
customElements.define('audio-player', AudioPlayer);
customElements.define('track-option', TrackOption);
```

Where registration happens in this project:

- `src/main.js` registers `<audio-player>`.
- `src/tracks/main.js` registers `<track-option>`.

### 4) Use the component in HTML (or create it with JS)

You can use custom tags directly in HTML:

```html
<audio-player
  track-id="1"
  track-title="Song title"
  track-src="/assets/audio/song.mp3"
  track-genre="Lo-fi"
  track-description="A mellow instrumental"
  track-instruments='["guitar", "drums"]'
></audio-player>
```

Or create them in JavaScript and set attributes before appending to the DOM (this is how `track-option` cards are rendered from `tracks.json`).

## Why this approach works well here

- Reusable UI blocks with a clear API (attributes).
- Keeps rendering logic close to behavior (events and methods are in one class).
- Easy to render many instances from data.
- Works without framework dependencies.

## Adding a new custom component

1. Create a folder in `src/assets/js/components/<your-component>/`.
2. Add:
   - `<your-component>.js`
   - `<your-component>-template.js`
   - `style.css`
3. In the class file:
   - `extends HTMLElement`
   - implement `connectedCallback()`
   - read attributes with getters
   - (optional) add `observedAttributes`
4. Import and register it from the page entry file where it is used:

```js
import { YourComponent } from '../assets/js/components/your-component/your-component.js';
customElements.define('your-component', YourComponent);
```

5. Add the custom tag to HTML or create instances in JavaScript.
```html
<body>
   <your-component custom-attr="value"> </your-component>
</body>
```