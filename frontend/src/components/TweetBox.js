import React, { useState } from "react";
import {
  EmojiIcon,
  GIFIcon,
  ImageIcon,
  PollIcon,
  ScheduleIcon,
} from "../icons/Icon";
import writeUserData from "../firebase";
// import firebase from "firebase";

const TweetBox = () => {
  const imageUrl = "https://pbs.twimg.com/profile_images/1570150585667665922/R5lgaU5O_400x400.jpg";

  const [content, setContent] = useState("");

  const displayName = "Melih Cokan";

  const username= "@cokanmelih"; 

  const sendTweet = () => {
    writeUserData(username,displayName,content,imageUrl);
  }




  return (
    <div className="flex flex-col flex-1 mt-2 px-2">
      <textarea
        className="w-full text-xl placeholder-gray-dark outline-none overflow-hidden resize-none bg-transparent"
        placeholder="What's Happening ?"
        onChange={(e) => setContent(e.target.value)}
        value={content}
      />
      <div className="flex items-center justify-between">
        <div className="flex">
          <div className="flex items-center justify-center w-11 h-11 rounded-full hover:bg-gray-lightest">
            <ImageIcon />
          </div>
          <div className="flex items-center justify-center w-11 h-11 rounded-full hover:bg-gray-lightest">
            <GIFIcon />
          </div>
          <div className="flex items-center justify-center w-11 h-11 rounded-full hover:bg-gray-lightest">
            <PollIcon />
          </div>
          <div className="flex items-center justify-center w-11 h-11 rounded-full hover:bg-gray-lightest">
            <EmojiIcon />
          </div>
          <div className="flex items-center justify-center w-11 h-11 rounded-full hover:bg-gray-lightest">
            <ScheduleIcon />
          </div>
        </div>
        <button
          className="bg-primary-base hover:bg-primary-dark text-white shadow-lg rounded-full py-2 px-4 w-11/12 transform transition-colors duration-200 "
          onClick={sendTweet}
        >
          Tweet
        </button>
      </div>
    </div>
  );
};

export default TweetBox;


// if (content !== "") {
    //   db.collection("feed").add({
    //     displayName: "Melih Cokan",
    //     username: "@cokanmelih",
    //     content: content,
    //     // timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
    //     avatar:
    //       "https://pbs.twimg.com/profile_images/1570150585667665922/R5lgaU5O_400x400.jpg",
    //   });

    //   setContent("");
    // }