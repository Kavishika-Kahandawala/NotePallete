import { Github } from "lucide-react";

const MyCard = () => {
  const gitHubUrl = "https://github.com/Kavishika-Kahandawala";
  return (
    <div>
      <div className="px-8 py-32">
        <div className="grid gap-8 items-start justify-center">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <button className="relative px-7 py-4 bg-black rounded-lg leading-none flex items-center">
              <span className="flex items-center space-x-5">
                <Github className="text-pink-600" />
                {/* <span className="pr-6 text-gray-100">
                    For more
                </span> */}
              </span>
              <span className="pl-6 text-indigo-400 group-hover:text-gray-100 transition duration-200">
                <a href={gitHubUrl}>Visit my GitHub &rarr;</a>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCard;
