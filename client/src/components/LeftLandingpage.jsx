const LeftLandingpage = () => {
  return (
    <div className="LeftLandingpage flex justify-center items-center h-screen bg-gradient-to-r from-gray-100 to-gray-200">
      <div className="p-6 md:p-12 p-md-5">
        <div className="mb-5 text-base md:text-lg">
          <a href="/login" className="px-3 py-4 pr-12 bg-purple-500 text-purple-50 rounded-full transition duration-200 ease-in hover:bg-purple-400"><i className="bi bi-key-fill border-2 border-gray-50 rounded-full px-2 py-1"></i>&nbsp;&nbsp;Login</a>
          <a href="/create-account" className="px-3 py-4 pr-12 bg-purple-500 text-purple-50 rounded-full transition duration-200 ease-in hover:bg-purple-400 ml-2"><i className="bi bi-person-plus-fill border-2 border-gray-50 rounded-full px-2 py-1"></i>&nbsp;&nbsp;Create Account</a>
        </div>
        <div className="banner py-3">
          <a href="/" className="text-9xl font-bold text-gray-900 transition duration-200 ease-in hover:text-purple-800">Devs</a>
          <p className="text-6xl font-bold text-gray-900">Komunidad</p>
        </div>
        <p className="text-xl text-justify text-gray-700">Devs komunidad is exclusive only for aspiring developers / already developers to help each other grow via exchanging their thoughts and ideas. This community was built and inspired by these inspirational qoutes - "Surround yourself by experienced programmers" and "There's something you know that I don't know and there's something I know that you don't".</p>
        <div className="mt-5 text-purple-500 font-bold text-xl">
          <a href="/privacy-policy" className="mr-4">Privacy Policy</a>
          <a href="/terms-and-condition" className="mr-4">Terms &amp; Condition</a>
          <a href="/guide" className="mr-4">How to use</a>
        </div>
      </div>
    </div>
  );
}
 
export default LeftLandingpage;