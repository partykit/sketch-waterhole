# sketch-waterhole

Sometimes you just want to have a window open to a waterhole in the Namib Desert, watch the animals hang out, and chat with whoever else is there.

This is a single-serving website that presents [this NamibiaCam YouTube live stream](https://www.youtube.com/watch?v=ydYDqZQpim8) without any of the chrome and YouTube UI, and optional chat.

[Come visit the waterhole!](https://waterhole.genmon.partykit.dev)

![Screenshot of the app showing the video stream and chat](/assets/waterhole.png)

## Experimental!

This app was created during [Matt](https://interconnected.org)'s summer 2023 residency. The purpose is to experiment with multiplayer interactions, and simultaneously see what PartyKit can do. It's called a sketch because it's lightweight and quick, and because we learn something in making it.

## What you'll find here

This micro-app is built with Remix and PartyKit meaning that it can be hosted entirely from PartyKit's servers. Check out the [PartyKit x Remix starter template](https://github.com/partykit/remix-starter) for how to do this.

Behind the scenes you'll see we're using [react-player](https://github.com/CookPete/react-player). This is a React component that wraps the YouTube player, and gives us a lot of control over how it behaves. So it's possible to share playback state and video URL between all clients, and make a shared jukebox -- a job for another time.

## Development and deployment

There are two servers that need to be started for development:

- The Remix development server
- The PartyKit server

Both are started with one command:

```sh
npm run dev
```

Open up [http://127.0.0.1:1999](http://127.0.0.1:1999) to see the site.

## Deployment

```sh
npm run deploy
```

If you don't already have a PartyKit account, you'll be prompted to create one during the deploy process.
