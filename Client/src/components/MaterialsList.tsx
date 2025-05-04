import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';

type Material = {
  _id: string;
  nameCours: string;
  videoPath: string;
};

const MaterialsList: React.FC = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [newName, setNewName] = useState<string>('');

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const response = await axios.get<Material[]>('http://localhost:5000/api/materials');
      setMaterials(response.data);
    } catch (error) {
      console.error('Failed to fetch materials:', error);
    }
  };

  const handleRename = async (id: string) => {
    if (!newName.trim()) {
      alert("נא להזין שם חדש");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/materials/${id}/update-name`, {
        newVideoName: newName
      });
      alert("השם עודכן בהצלחה");
      setEditId(null);
      setNewName('');
      fetchMaterials();
    } catch (error) {
      console.error("Rename failed:", error);
      alert("נכשל עדכון השם");
    }
  };

  const cancelEdit = () => {
    setEditId(null);
    setNewName('');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>🎬 רשימת סרטונים</h2>
      {materials.map((mat) => (
        <div
          key={mat._id}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '10px',
            border: '1px solid #ccc',
            padding: '8px',
            borderRadius: '8px'
          }}
        >
          {editId === mat._id ? (
            <>
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="שם חדש כולל .mp4"
                style={{ flexGrow: 1, marginRight: '10px' }}
              />
              <FaSave
                onClick={() => handleRename(mat._id)}
                style={{ cursor: 'pointer', color: 'green', marginRight: '10px' }}
              />
              <FaTimes
                onClick={cancelEdit}
                style={{ cursor: 'pointer', color: 'red' }}
              />
            </>
          ) : (
            <>
              <span style={{ flexGrow: 1 }}>{mat.videoPath}</span>
              <FaEdit
                onClick={() => {
                  setEditId(mat._id);
                  setNewName(mat.videoPath);
                }}
                style={{ cursor: 'pointer', color: '#007bff' }}
              />
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default MaterialsList;
