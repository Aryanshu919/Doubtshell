import React, { useState, useEffect, CSSProperties } from "react";
import { format } from "date-fns";
import axios from "axios";
import { SERVER_URL } from "../config";

// ─── Types ─────────────────────────────────────────────────────────────────

interface Answer {
  id: string;
  body: string;
  createdAt: string;
  isAccepted: boolean;
  upvotes: number;
  downvotes: number;
  questionId: string;
  question?: {
    id: string;
    title: string;
  };
}

interface Question {
  id: string;
  title: string;
  body: string;
  tags: string[];
  isSolved: boolean;
  anonymous: boolean;
  createdAt: string;
  imageUrl?: string;
}

interface Bookmark {
  userId: string;
  questionId: string;
  createdAt: string;
  question?: Question;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  imageUrl?: string;
  questions: Question[];
  answers: Answer[];
  bookmarks: Bookmark[];
}

type TabId = "questions" | "answers";

// ─── Constants ──────────────────────────────────────────────────────────────

const TAG_COLORS = ["#FFD166", "#06D6A0", "#118AB2", "#EF476F", "#FF9671", "#A8DADC"];
const getTagColor = (i: number): string => TAG_COLORS[i % TAG_COLORS.length];

const AVATAR_COLORS = ["#EF476F", "#FFD166", "#06D6A0", "#118AB2", "#845EC2", "#FF9671"];
const getAvatarColor = (name: string): string =>
  AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];

// ─── Icons ───────────────────────────────────────────────────────────────────

const QuestionIcon: React.FC = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const AnswerIcon: React.FC = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const CheckIcon: React.FC = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const UpIcon: React.FC = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

const EmailIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

// ─── Styles ──────────────────────────────────────────────────────────────────

const S: Record<string, CSSProperties> = {
  page: {
    width: "100%",
    fontFamily: "'Syne', sans-serif",
  },
  // Profile card
  profileCard: {
    background: "#f4f4f0",
    border: "2.5px solid #000",
    borderRadius: 4,
    boxShadow: "5px 5px 0 #000",
    marginBottom: 20,
    overflow: "hidden",
  },
  profileBanner: {
    height: 80,
    background: "#FFD166",
    borderBottom: "2.5px solid #000",
    position: "relative",
  },
  profileContent: {
    padding: "0 20px 20px",
    display: "flex",
    alignItems: "flex-end",
    gap: 16,
    marginTop: 18,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: "50%",
    border: "3px solid #000",
    boxShadow: "3px 3px 0 #000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 800,
    fontSize: 22,
    color: "#fff",
    flexShrink: 0,
    letterSpacing: 1,
  },
  profileMeta: {
    flex: 1,
    paddingTop: 32,
  },
  profileName: {
    margin: 0,
    fontWeight: 800,
    fontSize: 20,
    letterSpacing: 0.3,
    lineHeight: 1.2,
  },
  profileEmail: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    margin: 0,
    marginTop: 4,
    fontSize: 12,
    color: "#555",
    fontWeight: 700,
  },
  statsRow: {
    display: "flex",
    gap: 0,
    borderTop: "2.5px solid #000",
    marginTop: 16,
  },
  statBox: {
    flex: 1,
    padding: "10px 0",
    textAlign: "center" as const,
    borderRight: "2.5px solid #000",
  },
  statBoxLast: {
    flex: 1,
    padding: "10px 0",
    textAlign: "center" as const,
  },
  statNum: {
    display: "block",
    fontWeight: 800,
    fontSize: 20,
    lineHeight: 1,
  },
  statLabel: {
    display: "block",
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 1.5,
    textTransform: "uppercase" as const,
    color: "#666",
    marginTop: 3,
  },
  // Tabs
  tabsRow: {
    display: "flex",
    gap: 0,
    marginBottom: 16,
    border: "2.5px solid #000",
    borderRadius: 4,
    overflow: "hidden",
    boxShadow: "4px 4px 0 #000",
  },
  tabBtn: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "11px 0",
    background: "#fff",
    border: "none",
    borderRight: "2.5px solid #000",
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: 13,
    cursor: "pointer",
    transition: "background 0.12s",
  },
  tabBtnLast: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "11px 0",
    background: "#fff",
    border: "none",
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: 13,
    cursor: "pointer",
    transition: "background 0.12s",
  },
  // Cards
  card: {
    background: "#f4f4f0",
    border: "2.5px solid #000",
    borderRadius: 4,
    boxShadow: "4px 4px 0 #000",
    marginBottom: 12,
    overflow: "hidden",
    transition: "transform 0.12s, box-shadow 0.12s",
    cursor: "pointer",
  },
  cardHeader: {
    padding: "12px 16px 8px",
  },
  cardTitle: {
    margin: 0,
    fontWeight: 800,
    fontSize: 15,
    lineHeight: 1.35,
  },
  cardBody: {
    margin: 0,
    marginTop: 5,
    fontSize: 13,
    color: "#444",
    lineHeight: 1.5,
    display: "-webkit-box" as unknown as CSSProperties["display"],
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical" as unknown as CSSProperties["WebkitBoxOrient"],
    overflow: "hidden",
  },
  cardFooter: {
    borderTop: "2px solid #000",
    padding: "7px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tagsRow: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: 5,
    padding: "6px 16px 10px",
  },
  tagPill: {
    fontSize: 10,
    fontWeight: 700,
    padding: "2px 8px",
    border: "2px solid #000",
    borderRadius: 3,
    boxShadow: "2px 2px 0 #000",
    letterSpacing: 0.4,
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    fontSize: 10,
    fontWeight: 700,
    padding: "2px 8px",
    border: "2px solid #000",
    borderRadius: 3,
    boxShadow: "2px 2px 0 #000",
    letterSpacing: 0.5,
  },
  dateText: {
    fontSize: 11,
    fontWeight: 700,
    color: "#777",
  },
  emptyState: {
    textAlign: "center" as const,
    padding: "48px 20px",
    border: "2.5px dashed #ccc",
    borderRadius: 4,
    fontWeight: 800,
    fontSize: 15,
    color: "#aaa",
  },
  loadingBox: {
    textAlign: "center" as const,
    padding: "40px 20px",
    fontWeight: 800,
    fontSize: 14,
    color: "#888",
    border: "2.5px solid #000",
    borderRadius: 4,
    boxShadow: "4px 4px 0 #000",
  },
  errorBox: {
    padding: "12px 16px",
    background: "#EF476F",
    color: "#fff",
    border: "2.5px solid #000",
    borderRadius: 4,
    boxShadow: "4px 4px 0 #000",
    fontWeight: 800,
    fontSize: 14,
    marginBottom: 16,
  },
};

// ─── Sub-components ──────────────────────────────────────────────────────────

interface QuestionCardProps {
  question: Question;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <div
      style={{
        ...S.card,
        transform: hovered ? "translate(-2px, -2px)" : "none",
        boxShadow: hovered ? "6px 6px 0 #000" : "4px 4px 0 #000",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={S.cardHeader}>
        <h3 style={S.cardTitle}>{question.title}</h3>
        <p style={S.cardBody}>{question.body}</p>
      </div>

      {question.tags.length > 0 && (
        <div style={S.tagsRow}>
          {question.tags.map((tag: string, i: number) => (
            <span key={tag} style={{ ...S.tagPill, background: getTagColor(i) }}>
              {tag}
            </span>
          ))}
        </div>
      )}

      <div style={S.cardFooter}>
        <div style={{ display: "flex", gap: 6 }}>
          {question.isSolved && (
            <span style={{ ...S.badge, background: "#06D6A0" }}>
              <CheckIcon /> Solved
            </span>
          )}
          {question.anonymous && (
            <span style={{ ...S.badge, background: "#e0e0e0" }}>
              Anonymous
            </span>
          )}
        </div>
        <span style={S.dateText}>
          {format(new Date(question.createdAt), "MMM dd, yyyy")}
        </span>
      </div>
    </div>
  );
};

interface AnswerCardProps {
  answer: Answer;
}

const AnswerCard: React.FC<AnswerCardProps> = ({ answer }) => {
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <div
      style={{
        ...S.card,
        transform: hovered ? "translate(-2px, -2px)" : "none",
        boxShadow: hovered ? "6px 6px 0 #000" : "4px 4px 0 #000",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {answer.question && (
        <div
          style={{
            padding: "8px 16px",
            background: "#FFD166",
            borderBottom: "2px solid #000",
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: 0.5,
          }}
        >
          Re: {answer.question.title}
        </div>
      )}

      <div style={S.cardHeader}>
        <p style={{ ...S.cardBody, WebkitLineClamp: 3 }}>{answer.body}</p>
      </div>

      <div style={S.cardFooter}>
        <div style={{ display: "flex", gap: 6 }}>
          {answer.isAccepted && (
            <span style={{ ...S.badge, background: "#06D6A0" }}>
              <CheckIcon /> Accepted
            </span>
          )}
          <span style={{ ...S.badge, background: "#f4f4f0" }}>
            <UpIcon /> {answer.upvotes}
          </span>
        </div>
        <span style={S.dateText}>
          {format(new Date(answer.createdAt), "MMM dd, yyyy")}
        </span>
      </div>
    </div>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────

const Profile: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [activeTab, setActiveTab] = useState<TabId>("questions");

  useEffect(() => {
    const fetchProfile = async (): Promise<void> => {
      try {
        const res = await axios.get(`${SERVER_URL}/api/profile`, {withCredentials: true})
        
        setUser(res.data.user);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Something went wrong.";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    void fetchProfile();
  }, []);

  if (loading) {
    return (
      <>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');`}</style>
        <div style={{ ...S.loadingBox, fontFamily: "'Syne', sans-serif" }}>
          Loading profile...
        </div>
      </>
    );
  }

  if (error || !user) {
    return (
      <>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');`}</style>
        <div style={{ ...S.errorBox, fontFamily: "'Syne', sans-serif" }}>
          ⚠️ {error || "User not found."}
        </div>
      </>
    );
  }

  const initials = user.name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const tabs: { id: TabId; label: string; count: number; icon: React.ReactNode }[] = [
    { id: "questions", label: "My Questions", count: user.questions.length, icon: <QuestionIcon /> },
    { id: "answers",   label: "My Answers",   count: user.answers.length,   icon: <AnswerIcon />   },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');
        .profile-tab-btn:hover { opacity: 0.85; }
      `}</style>

      <div style={S.page}>

        {/* ── Profile Card ── */}
        <div style={S.profileCard}>
          <div style={S.profileBanner} />

          <div style={S.profileContent}>
            {user.imageUrl ? (
              <img
                src={user.imageUrl}
                alt={user.name}
                style={{ ...S.avatar, objectFit: "cover" }}
              />
            ) : (
              <div style={{ ...S.avatar, background: getAvatarColor(user.name) }}>
                {initials}
              </div>
            )}

            <div style={S.profileMeta}>
              <h2 style={S.profileName}>{user.name}</h2>
              <p style={S.profileEmail}>
                <EmailIcon />
                {user.email}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div style={S.statsRow}>
            <div style={S.statBox}>
              <span style={S.statNum}>{user.questions.length}</span>
              <span style={S.statLabel}>Questions</span>
            </div>
            <div style={S.statBox}>
              <span style={S.statNum}>{user.answers.length}</span>
              <span style={S.statLabel}>Answers</span>
            </div>
            <div style={S.statBoxLast}>
              <span style={S.statNum}>{user.bookmarks.length}</span>
              <span style={S.statLabel}>Bookmarks</span>
            </div>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div style={S.tabsRow}>
          {tabs.map((tab, idx) => {
            const isActive = activeTab === tab.id;
            const isLast = idx === tabs.length - 1;
            return (
              <button
                key={tab.id}
                className="profile-tab-btn"
                onClick={() => setActiveTab(tab.id)}
                style={{
                  ...(isLast ? S.tabBtnLast : S.tabBtn),
                  background: isActive ? "#FFD166" : "#fff",
                  color: "#000",
                }}
              >
                {tab.icon}
                {tab.label}
                <span
                  style={{
                    background: isActive ? "#000" : "#e0e0e0",
                    color: isActive ? "#FFD166" : "#555",
                    fontSize: 10,
                    fontWeight: 800,
                    padding: "1px 7px",
                    borderRadius: 20,
                    marginLeft: 2,
                  }}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Tab Content ── */}
        {activeTab === "questions" && (
          <div>
            {user.questions.length === 0 ? (
              <div style={S.emptyState}>You haven't posted any questions yet.</div>
            ) : (
              user.questions.map((q: Question) => (
                <QuestionCard key={q.id} question={q} />
              ))
            )}
          </div>
        )}

        {activeTab === "answers" && (
          <div>
            {user.answers.length === 0 ? (
              <div style={S.emptyState}>You haven't answered any questions yet.</div>
            ) : (
              user.answers.map((a: Answer) => (
                <AnswerCard key={a.id} answer={a} />
              ))
            )}
          </div>
        )}

      </div>
    </>
  );
};

export default Profile;