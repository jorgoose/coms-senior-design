export default function Home() {
  return (
    <>
      <div className="bg-gradient-to-r from-gray-500 h-screen w-full flex justify-center items-center flex-col">
        <p className="text-8xl bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text mb-24">TRENDPLAY</p>
        <button className="p-5 m-5 w-1/5 h-1/8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full shadow-2xl">Login</button>
        <button className="p-5 m-5 w-1/5 h-1/8 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text rounded-full">Sign Up</button>
      </div>
    </>
  );
}
