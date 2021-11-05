import { useEffect, useState } from "react";

const LeftHomepage = ({ id, cn, followers, following, contrib }) => {
  const [codename, setCodename] = useState(null);
  useEffect(() => {
    setCodename(cn);
  }, [cn])

  let fllwrs;
  let fllwng;

  if (! followers) {
    fllwrs = 0;
  } else {
    fllwrs = followers.split(",").length;
  }

  if (! following) {
    fllwng = 0;
  } else {
    fllwng = following.split(",").length;
  }

  return (
    <div className="LeftHomepage" style={{ maxWidth: "250px" }}>
      <div className="bg-gray-50 p-6 ml-3 rounded shadow-sm">
        <p className="font-semibold text-xl text-gray-600">
          { ! codename ? "" : codename + " #" + id.slice(11).toLowerCase() }
        </p>
        

      {
        ! fllwrs && ! fllwng ?  
        <div className="my-4">
          <p className="flex justify-around font-semibold text-purple-700">
            <span className="">0</span>
            <span className="">0</span>
          </p>
          <div className="flex justify-around font-bold">
            <a href="/a/you" className="text-lg text-purple-400 hover:text-purple-500">Folowers</a>
            <a href="/a/you" className="text-lg text-purple-400 hover:text-purple-500">Following</a>
          </div>
        </div>
        :
        <div className="py-4">
          <div className="flex justify-around font-semibold text-purple-700">
            <span className="">{ fllwrs }</span>
            <span className="">{ fllwng }</span>
          </div>
          <div className="flex justify-around font-bold">
            <a href="/a/you" className="text-lg text-purple-400 hover:text-purple-500">Folowers</a>
            <a href="/a/you" className="text-lg text-purple-400 hover:text-purple-500">Following</a>
          </div>
        </div>
      }
        <div className="flex justify-around font-bold">
          <span className="text-purple-700">{ contrib ? contrib: "" }</span>
        </div>
        <div className="flex justify-around font-bold">
          <span className="text-purple-400">Contribution</span>
        </div>
      </div>

      <div className="bg-purple-500 p-6 ml-3 rounded mt-4 shadow-sm">
        <h1 className="text-white font-bold text-xl">Acknowledgment to top 10 donators</h1>
        <div className="text-gray-300 text-lg py-3">
          <p className="">1. <a href="/who/id" className="hover:text-white">@admin</a></p>
          <p className="">2. <a href="/who/id" className="hover:text-white">@japsiee</a></p>
          <p className="">3. <a href="/who/id" className="hover:text-white">@kyle</a></p>
          <p className="">4. <a href="/who/id" className="hover:text-white">@mendio</a></p>
          <p className="">5. <a href="/who/id" className="hover:text-white">@bill</a></p>
          <p className="">6. <a href="/who/id" className="hover:text-white">@admin</a></p>
          <p className="">7. <a href="/who/id" className="hover:text-white">@japsiee</a></p>
          <p className="">8. <a href="/who/id" className="hover:text-white">@kyle</a></p>
          <p className="">9. <a href="/who/id" className="hover:text-white">@mendio</a></p>
          <p className="">10. <a href="/who/id" className="hover:text-white">@bill</a></p>
        </div>
      </div>

      <div className="bg-gray-50 p-6 ml-3 rounded mt-4 shadow-sm">
        <h1 className="text-purple-500 text-xl">Top 5 Contributors</h1>
        <div className="text-gray-600 text-lg py-3">
          <p className="">1. <a href="/who/id" className="hover:text-purple-500">@admin</a></p>
          <p className="">2. <a href="/who/id" className="hover:text-purple-500">@japsiee</a></p>
          <p className="">3. <a href="/who/id" className="hover:text-purple-500">@kyle</a></p>
          <p className="">4. <a href="/who/id" className="hover:text-purple-500">@mendio</a></p>
          <p className="">5. <a href="/who/id" className="hover:text-purple-500">@bill</a></p>
        </div>
      </div>

    </div>
  );
}
 
export default LeftHomepage;