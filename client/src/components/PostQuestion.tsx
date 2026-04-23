import React, { useState, CSSProperties } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PostQuestionProps {
  onClose?: () => void;
}

interface TagColor {
  bg: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const SUGGESTED_TAGS: string[] = [
  "javascript", "react", "nodejs", "typescript",
  "css", "python", "websocket", "api", "database", "git",
];

const TAG_COLORS: TagColor[] = [
  { bg: "#FFD166" },
  { bg: "#06D6A0" },
  { bg: "#118AB2" },
  { bg: "#EF476F" },
  { bg: "#FF9671" },
  { bg: "#A8DADC" },
];

const getTagColor = (index: number): string =>
  TAG_COLORS[index % TAG_COLORS.length].bg;

// ─── Icons ────────────────────────────────────────────────────────────────────

const CloseIcon: React.FC = () => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ImageIcon: React.FC = () => (
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
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

const EyeOffIcon: React.FC = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: "inline", marginRight: 6, verticalAlign: "middle" }}
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles: Record<string, CSSProperties> = {
  wrapper: {
    background: "#f4f4f0",
    border: "2.5px solid #000",
    borderRadius: "4px",
    boxShadow: "6px 6px 0 #000",
    fontFamily: "'Syne', sans-serif",
    width: "100%",
    maxWidth: 680,
  },
  header: {
    background: "#FFD166",
    borderBottom: "2.5px solid #000",
    padding: "14px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    margin: 0,
    fontWeight: 800,
    fontSize: 18,
    letterSpacing: 0.5,
  },
  closeBtn: {
    width: 32,
    height: 32,
    padding: 0,
    background: "#fff",
  },
  body: {
    padding: "20px 20px 24px",
  },
  successBanner: {
    background: "#06D6A0",
    border: "2.5px solid #000",
    borderRadius: 3,
    boxShadow: "3px 3px 0 #000",
    padding: "10px 14px",
    marginBottom: 16,
    fontWeight: 800,
    fontSize: 14,
  },
  errorBanner: {
    background: "#EF476F",
    color: "#fff",
    border: "2.5px solid #000",
    borderRadius: 3,
    boxShadow: "3px 3px 0 #000",
    padding: "10px 14px",
    marginBottom: 16,
    fontWeight: 800,
    fontSize: 14,
  },
  fieldWrapper: {
    marginBottom: 16,
  },
  label: {
    display: "block",
    fontWeight: 800,
    fontSize: 12,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 7,
  },
  charCount: {
    fontSize: 11,
    color: "#888",
    marginTop: 4,
    textAlign: "right",
    fontWeight: 700,
  },
  tagLabelNote: {
    fontWeight: 600,
    textTransform: "none",
    fontSize: 11,
    color: "#888",
  },
  tagPillsRow: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: 6,
    marginBottom: 8,
  },
  suggestedTagsRow: {
    marginTop: 8,
    display: "flex",
    flexWrap: "wrap" as const,
    gap: 5,
  },
  suggestedTagBtn: {
    background: "#fff",
    border: "2px solid #000",
    borderRadius: 3,
    boxShadow: "2px 2px 0 #000",
    padding: "2px 9px",
    fontSize: 11,
    fontWeight: 700,
    fontFamily: "'Syne', sans-serif",
    cursor: "pointer",
    letterSpacing: 0.4,
  },
  imagePreview: {
    marginTop: 8,
    maxHeight: 160,
    width: "100%",
    objectFit: "cover" as const,
    border: "2.5px solid #000",
    borderRadius: 3,
    boxShadow: "3px 3px 0 #000",
  },
  anonymousBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#fff",
    border: "2.5px solid #000",
    borderRadius: 3,
    boxShadow: "3px 3px 0 #000",
    padding: "10px 14px",
    marginBottom: 20,
  },
  anonymousTitle: {
    margin: 0,
    fontWeight: 800,
    fontSize: 13,
  },
  anonymousSubtitle: {
    margin: 0,
    fontSize: 11,
    color: "#666",
    marginTop: 2,
  },
  divider: {
    height: "2px",
    background: "#000",
    marginBottom: 20,
  },
  actionsRow: {
    display: "flex",
    gap: 10,
    justifyContent: "flex-end",
  },
  cancelBtn: {
    background: "#fff",
    padding: "10px 20px",
  },
  submitBtn: {
    background: "#FFD166",
    padding: "10px 28px",
    fontSize: 15,
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

const PostQuestion: React.FC<PostQuestionProps> = ({ onClose }) => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");
  const [anonymous, setAnonymous] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [showImageInput, setShowImageInput] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const addTag = (tag: string): void => {
    const clean = tag.trim().toLowerCase();
    if (clean && !tags.includes(clean) && tags.length < 5) {
      setTags((prev) => [...prev, clean]);
    }
    setTagInput("");
  };

  const removeTag = (tag: string): void => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(tagInput);
    }
    if (e.key === "Backspace" && !tagInput && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    }
  };

  const handleSubmit = async (): Promise<void> => {
    setError("");
    if (!title.trim()) { setError("Title is required."); return; }
    if (!body.trim()) { setError("Body is required."); return; }

    setLoading(true);
    try {
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          body,
          tags,
          anonymous,
          imageUrl: imageUrl || undefined,
          isSolved: false,
          userId: "current-user-id", // TODO: replace with auth userId
        }),
      });

      if (!res.ok) throw new Error("Failed to post question.");
      setSuccess(true);
      setTimeout(() => onClose?.(), 1200);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>): void => {
    e.currentTarget.style.display = "none";
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');

        .pq-input {
          width: 100%;
          background: #fff;
          border: 2.5px solid #000;
          border-radius: 3px;
          padding: 10px 12px;
          font-size: 14px;
          font-family: inherit;
          box-shadow: 3px 3px 0 #000;
          outline: none;
          transition: box-shadow 0.12s, transform 0.12s;
          resize: none;
          color: #000;
          box-sizing: border-box;
        }
        .pq-input:focus {
          box-shadow: 5px 5px 0 #000;
          transform: translate(-1px, -1px);
        }
        .pq-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 14px;
          border: 2.5px solid #000;
          border-radius: 3px;
          cursor: pointer;
          transition: transform 0.12s, box-shadow 0.12s;
          box-shadow: 3px 3px 0 #000;
        }
        .pq-btn:hover {
          transform: translate(-2px, -2px);
          box-shadow: 5px 5px 0 #000;
        }
        .pq-btn:active {
          transform: translate(1px, 1px);
          box-shadow: 1px 1px 0 #000;
        }
        .pq-btn:disabled {
          opacity: 0.6;
          pointer-events: none;
        }
        .tag-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          font-weight: 700;
          padding: 3px 9px;
          border: 2px solid #000;
          border-radius: 3px;
          box-shadow: 2px 2px 0 #000;
          font-family: 'Syne', sans-serif;
          letter-spacing: 0.4px;
        }
        .tag-remove {
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 0;
          opacity: 0.7;
        }
        .tag-remove:hover { opacity: 1; }
        .toggle-track {
          width: 40px;
          height: 22px;
          border: 2.5px solid #000;
          border-radius: 20px;
          position: relative;
          cursor: pointer;
          transition: background 0.15s;
          flex-shrink: 0;
        }
        .toggle-thumb {
          position: absolute;
          top: 2px;
          left: 2px;
          width: 14px;
          height: 14px;
          background: #000;
          border-radius: 50%;
          transition: transform 0.15s;
        }
        .toggle-thumb.on { transform: translateX(18px); }
      `}</style>

      <div style={styles.wrapper}>

        {/* ── Header ── */}
        <div style={styles.header}>
          <h2 style={styles.headerTitle}>✏️ Post a Question</h2>
          {onClose && (
            <button className="pq-btn" onClick={onClose} style={styles.closeBtn}>
              <CloseIcon />
            </button>
          )}
        </div>

        {/* ── Body ── */}
        <div style={styles.body}>

          {/* Banners */}
          {success && <div style={styles.successBanner}>🎉 Question posted successfully!</div>}
          {error && <div style={styles.errorBanner}>⚠️ {error}</div>}

          {/* Title */}
          <div style={styles.fieldWrapper}>
            <label style={styles.label}>Title *</label>
            <input
              className="pq-input"
              placeholder="e.g. What is the difference between == and === in JS?"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
              maxLength={150}
            />
            <div style={styles.charCount}>{title.length}/150</div>
          </div>

          {/* Details */}
          <div style={styles.fieldWrapper}>
            <label style={styles.label}>Details *</label>
            <textarea
              className="pq-input"
              placeholder="Describe your question in detail. Include any error messages, what you've tried, etc."
              value={body}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value)}
              rows={5}
            />
          </div>

          {/* Tags */}
          <div style={styles.fieldWrapper}>
            <label style={styles.label}>
              Tags{" "}
              <span style={styles.tagLabelNote}>(max 5)</span>
            </label>

            {tags.length > 0 && (
              <div style={styles.tagPillsRow}>
                {tags.map((tag: string, i: number) => (
                  <span key={tag} className="tag-pill" style={{ background: getTagColor(i) }}>
                    {tag}
                    <button className="tag-remove" onClick={() => removeTag(tag)}>
                      <CloseIcon />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {tags.length < 5 && (
              <input
                className="pq-input"
                placeholder="Type a tag and press Enter or comma..."
                value={tagInput}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                onBlur={() => { if (tagInput) addTag(tagInput); }}
              />
            )}

            <div style={styles.suggestedTagsRow}>
              {SUGGESTED_TAGS
                .filter((t: string) => !tags.includes(t))
                .slice(0, 6)
                .map((tag: string) => (
                  <button
                    key={tag}
                    onClick={() => addTag(tag)}
                    style={styles.suggestedTagBtn}
                  >
                    + {tag}
                  </button>
                ))}
            </div>
          </div>

          {/* Image URL */}
          <div style={styles.fieldWrapper}>
            <button
              className="pq-btn"
              onClick={() => setShowImageInput((prev) => !prev)}
              style={{
                background: showImageInput ? "#A8DADC" : "#fff",
                padding: "7px 14px",
              }}
            >
              <ImageIcon />
              {showImageInput ? "Remove image" : "Attach image URL"}
            </button>

            {showImageInput && (
              <div style={{ marginTop: 8 }}>
                <input
                  className="pq-input"
                  placeholder="https://example.com/image.png"
                  value={imageUrl}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImageUrl(e.target.value)}
                />
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="preview"
                    onError={handleImageError}
                    style={styles.imagePreview}
                  />
                )}
              </div>
            )}
          </div>

          {/* Anonymous toggle */}
          <div style={styles.anonymousBox}>
            <div>
              <p style={styles.anonymousTitle}>
                <EyeOffIcon />
                Post anonymously
              </p>
              <p style={styles.anonymousSubtitle}>
                Your name won't be shown to other users
              </p>
            </div>
            <div
              className="toggle-track"
              style={{ background: anonymous ? "#06D6A0" : "#e0e0e0" }}
              onClick={() => setAnonymous((prev) => !prev)}
            >
              <div className={`toggle-thumb${anonymous ? " on" : ""}`} />
            </div>
          </div>

          {/* Divider */}
          <div style={styles.divider} />

          {/* Actions */}
          <div style={styles.actionsRow}>
            {onClose && (
              <button className="pq-btn" onClick={onClose} style={styles.cancelBtn}>
                Cancel
              </button>
            )}
            <button
              className="pq-btn"
              onClick={handleSubmit}
              disabled={loading || success}
              style={styles.submitBtn}
            >
              {loading ? "Posting..." : success ? "✓ Posted!" : "Post Question →"}
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default PostQuestion;