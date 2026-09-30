import React from "react";
import { Pin, Archive, Trash2, RotateCcw } from "lucide-react";

export default function NoteCard({
  note,
  onPin,
  onArchive,
  onDelete,
  onRestore,
  onEditClick
}) {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleCardClick = () => {
    // Only allow editing if the note is not deleted (in trash)
    if (!note.deleted && onEditClick) {
      onEditClick(note);
    }
  };

  return (
    <div className="note-card glass-panel" onClick={handleCardClick}>
      {/* Note Header */}
      <div className="note-card-header">
        <h3 className="note-card-title">{note.title}</h3>
        {!note.deleted && (
          <button
            className={`note-pin-btn ${note.pinned ? "pinned" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              onPin(note._id);
            }}
            title={note.pinned ? "Unpin Note" : "Pin Note"}
          >
            <Pin size={16} fill={note.pinned ? "var(--pin-color)" : "none"} />
          </button>
        )}
      </div>

      {/* Note Content */}
      <div className="note-card-body">{note.content}</div>

      {/* Note Footer */}
      <div className="note-card-footer">
        {/* Tags badges */}
        {note.tags && note.tags.length > 0 && (
          <div className="note-tags">
            {note.tags.map((tag) => (
              <span key={tag} className="note-tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Action Controls & Timestamps */}
        <div className="note-card-actions">
          <span className="note-date">
            {note.updatedAt ? `Updated ${formatDate(note.updatedAt)}` : formatDate(note.createdAt)}
          </span>

          <div className="note-buttons">
            {note.deleted ? (
              /* Trash State Actions */
              <button
                className="note-action-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onRestore(note._id);
                }}
                title="Restore Note"
              >
                <RotateCcw size={15} />
              </button>
            ) : (
              /* Active State Actions */
              <>
                <button
                  className="note-action-btn archive-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onArchive(note._id);
                  }}
                  title={note.archived ? "Unarchive Note" : "Archive Note"}
                  style={{ color: note.archived ? "var(--archive-color)" : "" }}
                >
                  <Archive size={15} />
                </button>
                <button
                  className="note-action-btn delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(note._id);
                  }}
                  title="Move to Trash"
                >
                  <Trash2 size={15} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
