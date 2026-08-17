# obs-overlay-clock

A simple OBS (Open Broadcaster Software) overlay of the current time (and optional country flag)

## How to use?

- Either run the webserver locally or use the GitHub page link
- Configure your preferred layout, font size, country flag, time format
- Copy the URL and paste it into your OBS studio browser source

## Build

```sh
npm install
npm run build
# creates a 'dist' directory that contains a static HTML/JS/CSS website
```

## Run website

1. Static webserver

   ```
   npx serve dist
   ```

2. Development preview

   ```sh
   npm run preview
   ```
