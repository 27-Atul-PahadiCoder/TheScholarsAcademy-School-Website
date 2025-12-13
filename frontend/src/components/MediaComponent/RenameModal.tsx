
import React, { useState } from 'react';
import Modal from './Modal';

interface RenameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRename: (newPath: string) => void;
  oldPath: string;
}

const RenameModal: React.FC<RenameModalProps> = ({ isOpen, onClose, onRename, oldPath }) => {
  const [newPath, setNewPath] = useState('');

  const handleRename = () => {
    onRename(newPath);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Rename Image</h2>
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
          To (New Name)
        </label>
        <input
          type="text"
          id="toPath"
          value={newPath}
          onChange={(e) => setNewPath(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter the new file name"
        />
      </div>
      <button onClick={handleRename} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Rename
      </button>
    </Modal>
  );
};

export default RenameModal;
