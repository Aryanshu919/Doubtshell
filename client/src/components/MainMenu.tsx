import React, { useState } from "react";
import Sidebar from "./Sidebar";
import MainComponent from "./MainComponent";
import Profile from "./Profile";
import Bookmark from "./Bookmark";
import PostQuestion from "./PostQuestion";
import { SERVER_URL } from "../config";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setQuestions } from "../slices/questionSlices";
import { setProfile } from "../slices/profileSlice";

const NAV_ITEMS = [
  {
    label: "Explore",
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    color: "#6699ff",
  },
  {
    label: "Profile",
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    color: "#FFD166",
  },
  {
    label: "Bookmarks",
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    ),
    color: "#FF6B6B",
  },
  {
    label: "Post Question",
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
    ),
    color: "#06D6A0",
  },
];

const MainMenu = () => {
  const dispatch = useDispatch();
  const [active, setActive] = useState("Explore");

  useEffect(() => {
    async function fetchQuestion() {
      const response = await axios.get(`${SERVER_URL}/api/question?limit=10`, {
        withCredentials: true,
      });

      dispatch(setQuestions(response.data.questions));

      const profileRes = await axios.get(`${SERVER_URL}/api/profile`, {
        withCredentials: true,
      });
      dispatch(
        setProfile({
          ...profileRes.data,
          bookmarks: profileRes.data.bookmarks.map((b: any) => b.questionId),
        }),
      );
    }

    fetchQuestion();
  }, []);

  return (
    <div className="min-h-screen mt-30">
      <main className="max-w-[850px] mx-auto">
        <div className="flex gap-5 items-start">
          {/* Sidebar (fixed width) */}
          <Sidebar
            NAV_ITEMS={NAV_ITEMS}
            active={active}
            setActive={setActive}
          />

          {/* Main Content (IMPORTANT) */}
          <div className="flex-1 min-w-0">
            {active === "Profile" && <Profile />}
            {active === "Explore" && <MainComponent />}
            {active === "Bookmarks" && <Bookmark />}
            {active === "Post Question" && <PostQuestion />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainMenu;
