import React, { useState, useEffect } from "react";
import { Search, FolderOpen, Calendar, Menu, ArrowRight } from "lucide-react";
import Sidebar from "./Sidebar";
import NoteCreator from "./NoteCreator";
import NoteCard from "./NoteCard";
import NoteModal from "./NoteModal";

export default function Dashboard({ user, showNotification, onLogout, theme, onToggleTheme }) {
  const [notes, setNotes] = useState([]);
  const [currentView, setCurrentView] = useState("active"); // 'active', 'pinned', 'archived', 'trash'
  const [activeTag, setActiveTag] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEditNote, setSelectedEditNote] = useState(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Load notes depending on the current view
  const fetchNotes = async () => {
    try {
      const endpoint = currentView === "trash" ? "/notes/trash" : "/notes";
      const response = await fetch(endpoint, {
        headers: {
          "Accept": "application/json"
        }
      });

      if (response.status === 401) {
        // Token cookie expired or deleted
        showNotification("Session expired. Please login again.", "error");
        onLogout();
        return;
      }

      const data = await response.json();

      if (response.ok) {
        // Backend returns notes in different fields:
        // /notes returns { notes: [...] }
        // /notes/trash returns { notes: [...] } - wait, in controllers:
        // /notes/trash returns { notes } (line 332: notes) but it has a typo: "messageP"
        // Let's verify: handleGetTrashNotes returns { messageP: "...", notes }
        // Yes, notes is the array.
        setNotes(data.notes || data.note || []);
      } else {
        showNotification(data.message || "Failed to fetch notes", "error");
      }
    } catch (error) {
      showNotification("Failed to connect to backend", "error");
    }
  };

  // Trigger fetch when currentView changes
  useEffect(() => {
    fetchNotes();
  }, [currentView]);

  // Note actions
  const handleNoteCreate = async (noteData) => {
    try {
      const response = await fetch("/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noteData),
      });

      const data = await response.json();

      if (response.ok) {
        showNotification("Note created successfully", "success");
        fetchNotes(); // Reload notes
        return true;
      } else {
        showNotification(data.message || "Failed to create note", "error");
        return false;
      }
    } catch (error) {
      showNotification("Network error while creating note", "error");
      return false;
    }
  };

  const handlePinToggle = async (noteId) => {
    try {
      const response = await fetch(`/notes/${noteId}/pin`, {
        method: "PATCH",
      });
      const data = await response.json();

      if (response.ok) {
        fetchNotes();
      } else {
        showNotification(data.message || "Failed to pin note", "error");
      }
    } catch (error) {
      showNotification("Network error", "error");
    }
  };

  const handleArchiveToggle = async (noteId) => {
    try {
      const response = await fetch(`/notes/${noteId}/archive`, {
        method: "PATCH",
      });
      const data = await response.json();

      if (response.ok) {
        showNotification(data.message || "Archive updated", "success");
        fetchNotes();
      } else {
        showNotification(data.message || "Failed to archive note", "error");
      }
    } catch (error) {
      showNotification("Network error", "error");
    }
  };

  const handleDeleteToggle = async (noteId) => {
    try {
      const response = await fetch(`/notes/${noteId}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (response.ok) {
        showNotification("Note moved to Trash", "success");
        fetchNotes();
      } else {
        showNotification(data.message || "Failed to delete note", "error");
      }
    } catch (error) {
      showNotification("Network error", "error");
    }
  };

  const handleRestoreNote = async (noteId) => {
    try {
      const response = await fetch(`/notes/${noteId}/restore`, {
        method: "PATCH",
      });
      const data = await response.json();

      if (response.ok) {
        showNotification("Note restored successfully", "success");
        fetchNotes();
      } else {
        showNotification(data.message || "Failed to restore note", "error");
      }
    } catch (error) {
      showNotification("Network error", "error");
    }
  };

  const handleNoteUpdate = async (noteId, updatedData) => {
    try {
      const response = await fetch(`/notes/${noteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();

      if (response.ok) {
        showNotification("Note updated successfully", "success");
        fetchNotes();
        return true;
      } else {
        showNotification(data.message || "Failed to update note", "error");
        return false;
      }
    } catch (error) {
      showNotification("Network error while updating note", "error");
      return false;
    }
  };

  // Filter notes to display based on view, tag, and search query
  const getFilteredNotes = () => {
    let list = [...notes];

    // 1. Partitioning by folder (if not Trash, since Trash has its own API endpoint)
    if (currentView !== "trash") {
      if (currentView === "pinned") {
        list = list.filter((n) => n.pinned && !n.archived);
      } else if (currentView === "archived") {
        list = list.filter((n) => n.archived);
      } else {
        // active view
        list = list.filter((n) => !n.archived);
      }
    }

    // 2. Filter by selected tag in Sidebar
    if (activeTag) {
      list = list.filter((n) => n.tags && n.tags.includes(activeTag));
    }

    // 3. Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      list = list.filter(
        (n) =>
          n.title.toLowerCase().includes(query) ||
          n.content.toLowerCase().includes(query) ||
          (n.tags && n.tags.some((t) => t.toLowerCase().includes(query)))
      );
    }

    return list;
  };

  const displayedNotes = getFilteredNotes();

  // Partition active notes into Pinned and Others for a cleaner, dashboard look
  const pinnedNotes = displayedNotes.filter((n) => n.pinned && !n.archived && !n.deleted);
  const regularNotes = displayedNotes.filter((n) => (!n.pinned || n.archived || n.deleted));

  // Determine section heading details
  const getWorkspaceDetails = () => {
    if (activeTag) return { title: `Tag: ${activeTag}`, subtitle: "Displaying notes with this tag" };
    switch (currentView) {
      case "pinned":
        return { title: "Pinned Notes", subtitle: "Important ideas saved at the top" };
      case "archived":
        return { title: "Archive", subtitle: "Stored thoughts kept out of the main workspace" };
      case "trash":
        return { title: "Trash", subtitle: "Soft deleted notes that can be restored" };
      case "active":
      default:
        return { title: "My Notes", subtitle: "Your creative space for capturing thoughts" };
    }
  };

  const details = getWorkspaceDetails();

  return (
    <div className="dashboard-container">
      {/* Sidebar navigation */}
      <div className={`sidebar-panel-wrapper ${mobileSidebarOpen ? "mobile-open" : ""}`}>
        <Sidebar
          user={user}
          currentView={currentView}
          onViewChange={(view) => {
            setCurrentView(view);
            setMobileSidebarOpen(false);
          }}
          notes={notes} // for tag accumulation (using the active set of notes)
          activeTag={activeTag}
          onTagSelect={(tag) => {
            setActiveTag(tag);
            setMobileSidebarOpen(false);
          }}
          onLogout={onLogout}
          theme={theme}
          onToggleTheme={onToggleTheme}
        />
      </div>

      {/* Main Content Pane */}
      <div className="main-workspace">
        {/* Header toolbar */}
        <header className="workspace-header">
          <div className="workspace-title-section">
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <button
                className="theme-toggle-btn"
                style={{ display: "none" }} /* Show only on mobile later */
                onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              >
                <Menu size={18} />
              </button>
              <h1 className="workspace-title">{details.title}</h1>
            </div>
            <p className="workspace-subtitle">{details.subtitle}</p>
          </div>

          {/* Search bar */}
          <div className="search-container">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search title, content, or tags..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>

        {/* Note creation section (hide in Trash and Archive) */}
        {currentView === "active" && !activeTag && (
          <NoteCreator onNoteCreate={handleNoteCreate} showNotification={showNotification} />
        )}

        {/* Notes listings */}
        {displayedNotes.length === 0 ? (
          <div className="no-notes-message">
            <FolderOpen className="no-notes-icon" size={48} />
            <p>No notes found in this section.</p>
          </div>
        ) : (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            {/* Show Pinned Section on the main view if there are pinned notes and we are not in pinned/archive/trash view */}
            {currentView === "active" && !activeTag && pinnedNotes.length > 0 && (
              <>
                <h4 className="notes-section-title">Pinned</h4>
                <div className="notes-grid">
                  {pinnedNotes.map((note) => (
                    <NoteCard
                      key={note._id}
                      note={note}
                      onPin={handlePinToggle}
                      onArchive={handleArchiveToggle}
                      onDelete={handleDeleteToggle}
                      onRestore={handleRestoreNote}
                      onEditClick={setSelectedEditNote}
                    />
                  ))}
                </div>
                <h4 className="notes-section-title">Others</h4>
              </>
            )}

            {/* Main grid */}
            <div className="notes-grid">
              {(currentView === "active" && !activeTag && pinnedNotes.length > 0 ? regularNotes : displayedNotes).map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  onPin={handlePinToggle}
                  onArchive={handleArchiveToggle}
                  onDelete={handleDeleteToggle}
                  onRestore={handleRestoreNote}
                  onEditClick={setSelectedEditNote}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Edit Note Modal */}
      {selectedEditNote && (
        <NoteModal
          note={selectedEditNote}
          onClose={() => setSelectedEditNote(null)}
          onNoteUpdate={handleNoteUpdate}
          showNotification={showNotification}
        />
      )}
    </div>
  );
}
