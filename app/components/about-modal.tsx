export default function AboutModal(props: {
  showAbout: boolean;
  setShowAbout: (show: boolean) => void;
}) {
  const handleClick = () => {
    props.setShowAbout(false);
  };
  return (
    <div className="z-30 absolute w-full h-full z-10 top-0 left-0 flex items-center justify-center bg-black/20 backdrop-blur-sm p-2">
      <div className="w-full sm:w-2/3 p-4 bg-stone-100 flex flex-col gap-4 font-mono">
        <p>
          <strong>What is this?</strong> A place to hang out together and watch
          a live stream of a waterhole in Namibia. The original stream is by
          NamibiaCam and{" "}
          <a
            href="https://www.youtube.com/watch?v=ydYDqZQpim8"
            className="underline"
          >
            here on YouTube
          </a>
          .
        </p>
        <p>
          <strong>Who made it?</strong> This is a quick project built using
          PartyKit, infrastructure for real-time multiplayer apps.{" "}
          <a
            href="https://blog.partykit.io/posts/single-serving-waterhole"
            className="underline"
          >
            Read the blog post
          </a>{" "}
          for why and how etc.
        </p>
        <p>
          <strong>I want my own!</strong>{" "}
          <a
            href="https://github.com/partykit/sketch-waterhole"
            className="underline"
          >
            Here’s the code on GitHub.
          </a>{" "}
          Or get in touch.
        </p>
        <p>
          &mdash;
          <a href="https://interconnected.org" className="underline">
            Matt
          </a>
        </p>
        <button onClick={handleClick} className="text-red-400">
          Close
        </button>
      </div>
    </div>
  );
}
