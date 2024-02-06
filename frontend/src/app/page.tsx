import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="bg-gradient-to-r from-stone-500 h-screen w-full flex justify-center items-center flex-col">
        <p className="absolute top-20 text-8xl bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">TRENDPLAY</p>
        <Link className="p-5 m-5 w-1/5 h-1/8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full shadow-2xl text-center" href="/login">Login</Link>
        <Link className="p-5 m-5 w-1/5 h-1/8 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text rounded-full text-center" href="/signup">Sign Up</Link>
      </div>
    </>
  );
}

// Important stuff
// <div className="tenor-gif-embed" data-postid="1175703927588788964" data-share-method="host" data-aspect-ratio="0.564257" data-width="100%"><a href="https://tenor.com/view/spinning-cat-gif-1175703927588788964">Spinning Cat GIF</a>from <a href="https://tenor.com/search/spinning-gifs">Spinning GIFs</a></div> <script type="text/javascript" async src="https://tenor.com/embed.js"></script>
