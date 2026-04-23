import React, { useState } from "react";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { SERVER_URL } from "../config";
import { format } from "date-fns";
import axios from "axios";


const BookmarkIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

const UpvoteIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

const AnswerIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

// Tag color palette to cycle through
const TAG_COLORS = [
  { bg: "#FFD166", text: "#000" },
  { bg: "#06D6A0", text: "#000" },
  { bg: "#118AB2", text: "#fff" },
  { bg: "#EF476F", text: "#fff" },
  { bg: "#FF6B6B", text: "#fff" },
  { bg: "#A8DADC", text: "#000" },
];

const getTagColor = (index: number) => TAG_COLORS[index % TAG_COLORS.length];

// Avatar initials color palette
const AVATAR_COLORS = [
  "#EF476F",
  "#FFD166",
  "#06D6A0",
  "#118AB2",
  "#845EC2",
  "#FF9671",
];
const getAvatarColor = (name: string) =>
  AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];

const QuestionCard = ({ question, profile }: { question: any; profile: any }) => {

  console.log("logging the profile", profile);
  const [votes, setVotes] = useState(question.votes ?? 0);
  const [voted, setVoted] = useState(false);


  const isBookmarked = profile?.user?.bookmarks?.some(
  (b:any) => b.questionId === question.id
);

  const initials = question?.user?.name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  async function handleBookmark(questionId: string) {
    try {
      await axios.post(
        `${SERVER_URL}/api/bookmark`,
        {
          questionId,
        },
        {
          withCredentials: true,
        },
      );

      
    } catch (error) {
      console.log("Bookmark error:", error);
    }
  }

  return (
    <div
      className="mb-6"
      style={{
        background: "#f4f4f0",
        border: "2.5px solid #000",
        borderRadius: "4px",
        boxShadow: "5px 5px 0px #000",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform =
          "translate(-2px, -2px)";
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "7px 7px 0px #000";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translate(0, 0)";
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "5px 5px 0px #000";
      }}
    >
      {/* Header */}
      <div className="flex gap-3 items-center px-5 pt-5 pb-3">
        {/* Avatar */}
        <div
          style={{
            height: 44,
            width: 44,
            borderRadius: "50%",
            background: getAvatarColor(question.user.name),
            border: "2.5px solid #000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: 15,
            color: "#fff",
            flexShrink: 0,
            letterSpacing: 1,
            fontFamily: "'Syne', sans-serif",
          }}
        >
          {initials}
        </div>

        <div>
          <p
            style={{
              fontWeight: 800,
              fontSize: 15,
              fontFamily: "'Syne', sans-serif",
              margin: 0,
            }}
          >
            {question.user.name}
          </p>
          <p
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "#555",
              margin: 0,
              marginTop: 2,
            }}
          >
            {format(new Date(question.createdAt), "MMM dd, yyyy 'at' HH:mm")}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div
        style={{ height: "2px", background: "#000", margin: "0 0 12px 0" }}
      />

      {/* Question body */}
      <div className="px-5 pb-3">
        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: 17,
            margin: 0,
            marginBottom: 6,
            lineHeight: 1.35,
          }}
        >
          {question.title}
        </h2>
        {question.body && (
          <p
            style={{
              fontSize: 13.5,
              color: "#333",
              margin: 0,
              lineHeight: 1.55,
            }}
          >
            {question.body}
          </p>
        )}
      </div>

      {/* Tags */}
      {question.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 px-5 pb-4">
          {question.tags.map((tag: string, i: number) => {
            const color = getTagColor(i);
            return (
              <span
                key={tag}
                style={{
                  background: color.bg,
                  color: color.text,
                  fontSize: 11,
                  fontWeight: 700,
                  padding: "3px 10px",
                  borderRadius: 3,
                  border: "2px solid #000",
                  boxShadow: "2px 2px 0 #000",
                  fontFamily: "'Syne', sans-serif",
                  letterSpacing: 0.5,
                  textTransform: "lowercase",
                }}
              >
                {tag}
              </span>
            );
          })}
        </div>
      )}

      {/* Footer actions */}
      <div
        style={{
          borderTop: "2.5px solid #000",
          display: "flex",
        }}
      >
        {/* Votes */}
        <button
          onClick={() => {
            if (!voted) {
              setVotes((v: number) => v + 1);
              setVoted(true);
            } else {
              setVotes((v: number) => v - 1);
              setVoted(false);
            }
          }}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            padding: "10px 0",
            background: voted ? "#FFD166" : "transparent",
            border: "none",
            borderRight: "2.5px solid #000",
            fontWeight: 800,
            fontSize: 13,
            fontFamily: "'Syne', sans-serif",
            cursor: "pointer",
            transition: "background 0.15s",
          }}
        >
          <UpvoteIcon />
          {votes} votes
        </button>

        {/* Answers */}
        <button
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            padding: "10px 0",
            background: "transparent",
            border: "none",
            borderRight: "2.5px solid #000",
            fontWeight: 800,
            fontSize: 13,
            fontFamily: "'Syne', sans-serif",
            cursor: "pointer",
          }}
        >
          <AnswerIcon />
          {question.answers ? question.answers.length : 0} answers
        </button>

        {/* Bookmark */}
        <button
          onClick={() => {
            handleBookmark(question.id);
          }}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            padding: "10px 0",
            background: isBookmarked ? "#EF476F" : "transparent",
            color: isBookmarked ? "#fff" : "#000",
            border: "none",
            fontWeight: 800,
            fontSize: 13,
            fontFamily: "'Syne', sans-serif",
            cursor: "pointer",
            transition: "background 0.15s, color 0.15s",
          }}
        >
          <BookmarkIcon />
          {isBookmarked?  "saved!" : "bookmark"}
        </button>
      </div>
    </div>
  );
};

const MainComponent = () => {
  const questions = useSelector(
    (state: RootState) => state.questions.questions,
  );

  const profile = useSelector((state: RootState) => state.profile.profile); 

  return (
    <>
      {/* Import Syne font */}

      <div className="flex-1 overflow-y-auto px-1 py-1">
        {questions.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: 18,
              color: "#888",
              border: "2.5px dashed #ccc",
              borderRadius: 4,
            }}
          >
            No questions yet. Be the first to ask!
          </div>
        )}
        {questions.map((question) => (
          <QuestionCard key={question.id} question={question} profile={profile} />
        ))}
      </div>
    </>
  );
};

export default MainComponent;
