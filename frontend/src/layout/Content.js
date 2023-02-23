import React from "react";
import Divider from "../components/Divider";
import TweetBox from "../components/TweetBox";
import { TopTweetsIcon } from "../icons/Icon";

const Content = () => {
  return (
    <main className="flex-1 flex-col border-r border-l border-gray-extraLight">
      <header className="sticky top-0 flex justify-between items-center p-4 border-b border-gray-extraLight bg-white">
        <span className="font-bold text-xl text-gray-900">Home</span>
        <TopTweetsIcon></TopTweetsIcon>
      </header>
      <div className="flex space-x-4 px-3 py-3">
        <img
          src="https://pbs.twimg.com/profile_images/1570150585667665922/R5lgaU5O_400x400.jpg"
          alt="Profile"
          className="w-11 h-11 rounded-full"
        />
        <div>
          <TweetBox />
        </div>
        <Divider />

      </div>
    </main>
  );
};

export default Content;
