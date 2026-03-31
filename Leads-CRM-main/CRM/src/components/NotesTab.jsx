import { useState, useEffect } from "react";
import {
  FaStickyNote,
  FaRegClock,
  FaTrash,
  FaUserCircle,
  FaPaperPlane,
} from "react-icons/fa";

// Import API functions
import {
  getNotes,
  createNote,
  deleteNote,
} from "../api/leadApi"; // path adjust if needed

export default function NotesTab({ leadId }) {
  const [noteContent, setNoteContent] = useState("");
  const [notes, setNotes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch Notes
  const fetchNotes = async () => {
    try {
      const res = await getNotes(leadId);
      setNotes(res.data);
    } catch (err) {
      console.error("Error loading notes");
    }
  };

  useEffect(() => {
    if (leadId) fetchNotes();
  }, [leadId]);

  // Add Note
  const handleAddNote = async (e) => {
    e.preventDefault();

    if (!noteContent.trim()) return;

    setIsSubmitting(true);

    try {
      await createNote({
        leadId,
        content: noteContent,
      });

      setNoteContent("");
      fetchNotes();
    } catch (err) {
      alert("Could not save note");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Note
  const handleDelete = async (id) => {
    if (window.confirm("Delete this note?")) {
      try {
        await deleteNote(id);
        fetchNotes();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-4">
      {/* Input Box */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8">
        <div className="flex gap-3">
          <FaUserCircle className="text-3xl text-gray-300 mt-1" />

          <div className="flex-1">
            <textarea
              value={noteContent}
              onChange={(e) =>
                setNoteContent(e.target.value)
              }
              placeholder="Add a comment or internal note..."
              className="w-full border-none focus:ring-0 text-sm text-gray-700 resize-none min-h-[80px]"
            />

            <div className="flex justify-end pt-2 border-t border-gray-50 mt-2">
              <button
                onClick={handleAddNote}
                disabled={isSubmitting}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all disabled:opacity-50"
              >
                <FaPaperPlane size={12} />
                {isSubmitting
                  ? "Saving..."
                  : "Post Note"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-gray-200 before:via-gray-100 before:to-transparent">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 px-2">
          History
        </h4>

        {notes.length === 0 ? (
          <div className="text-center py-10 text-gray-400 italic text-sm">
            No notes found for this lead.
          </div>
        ) : (
          notes.map((n) => (
            <div
              key={n._id}
              className="relative pl-12 group"
            >
              <div className="absolute left-0 w-10 h-10 bg-white border-2 border-indigo-500 rounded-full flex items-center justify-center z-10 shadow-sm">
                <FaStickyNote className="text-indigo-500 text-xs" />
              </div>

              <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-bold text-gray-800">
                    {n.author || "User"}
                  </span>

                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-gray-400 flex items-center gap-1">
                      <FaRegClock />
                      {new Date(
                        n.createdAt
                      ).toLocaleString()}
                    </span>

                    <button
                      onClick={() =>
                        handleDelete(n._id)
                      }
                      className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                </div>

                <p className="text-sm text-gray-600 whitespace-pre-wrap">
                  {n.content}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}