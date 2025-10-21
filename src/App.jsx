import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const API_URL = import.meta.env.VITE_NOTE_API_URL;
  // console.log("API URL:", import.meta.env);

  const fetchNotes = async () => {
    try {
      const res = await axios.get(API_URL);
      const data = res.data.payload?.datas?.[0] || [];
      setNotes(data);
    } catch (err) {
      console.error("Gagal ambil data:", err);
    }
  };

  const handleAdd = async () => {
    if (!note.trim()) return;
    try {
      await axios.post(API_URL, { note });
      setNote("");
      fetchNotes();
    } catch (err) {
      console.error("Error menambah note:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchNotes();
    } catch (err) {
      console.error("Error menghapus note:", err);
    }
  };

  const handleEdit = (id, note) => {
    setEditId(id);
    setEditValue(note);
  };

  const handleUpdate = async (id) => {
    if (!editValue.trim()) return;
    try {
      await axios.put(`${API_URL}/${id}`, { note: editValue });
      setEditId(null);
      setEditValue("");
      fetchNotes();
    } catch (err) {
      console.error("Error mengupdate note:", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-gray-800/90 backdrop-blur-md px-10 py-6 flex items-center justify-between shadow-md">
        <h1 className="text-4xl font-extrabold text-white flex items-center gap-3">
          📝 Notes App
        </h1>
      </header>

      {/* Main content */}
      <main className="flex-1 px-10 py-8 overflow-y-auto">
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <input
            type="text"
            placeholder="Tulis catatan..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="flex-1 border border-gray-700 bg-gray-800 text-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all"
          >
            Tambah
          </button>
        </div>

        {/* Notes grid */}
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-rows-min">
          {notes.length === 0 ? (
            <p className="text-center text-gray-500 italic col-span-full">
              Belum ada catatan, ayo tulis sesuatu ✨
            </p>
          ) : (
            notes.map((n) => (
              <div
                key={n.id}
                className="bg-gray-800/80 border border-gray-700 rounded-xl p-4 shadow-md hover:shadow-xl transition-all hover:scale-[1.02] flex flex-col justify-between"
              >
                {editId === n.id ? (
                  <>
                    <textarea
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="w-full bg-gray-700 text-gray-100 p-2 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleUpdate(n.id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-sm font-semibold"
                      >
                        Simpan
                      </button>
                      <button
                        onClick={() => setEditId(null)}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded-lg text-sm font-semibold"
                      >
                        Batal
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <p className="text-lg font-medium text-gray-100 break-words">
                        {n.content}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(n.created_at).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex justify-end gap-2 mt-3">
                      <button
                        onClick={() => handleEdit(n.id, n.content)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg text-sm font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(n.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm font-semibold"
                      >
                        Hapus
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800/90 backdrop-blur-md text-gray-400 text-center py-4 text-sm">
        ✨ Tulislah catatanmu
      </footer>
    </div>
  );
}
