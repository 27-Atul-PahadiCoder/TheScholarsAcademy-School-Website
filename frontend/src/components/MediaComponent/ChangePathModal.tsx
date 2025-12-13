
import React, { useState } from 'react';
import Modal from './Modal';

interface ChangePathModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChangePath: (newPath: string) => void;
  oldPath: string;
}

const ChangePathModal: React.FC<ChangePathModalProps> = ({ isOpen, onClose, onChangePath, oldPath }) => {
  const [newPath, setNewPath] = useState('');

  const handleChangePath = () => {
    onChangePath(newPath);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Change Image Path</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fromPath">
          From
        </label>
        <input
          type="text"
          id="fromPath"
          value={oldPath}
          readOnly
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="toPath">
          To (New Path)
        </label>
        <input
          type="text"
          id="toPath"
          value={newPath}
          onChange={(e) => setNewPath(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter the new file path"
        />
      </div>
      <button onClick={handleChangePath} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Change Path
      </button>
    </Modal>
  );
};

export default ChangePathModal;
