import React, { useState, useEffect } from 'react';
import {
  getImageData,
  updateImageData,
  deleteImageData,
  addImageData,
  ImageData,
} from '../MediaComponent/ImageRepository';

const PhotoManagement: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [editingImage, setEditingImage] = useState<ImageData | null>(null);
  const [newPath, setNewPath] = useState('');
  const [newImage, setNewImage] = useState({ name: '', location: '', path: '' });

  useEffect(() => {
    setImages(getImageData());
  }, []);

  const handleEdit = (image: ImageData) => {
    setEditingImage(image);
    setNewPath(image.path);
  };

  const handleSave = () => {
    if (editingImage) {
      updateImageData(editingImage.id, newPath);
      setImages(getImageData());
      setEditingImage(null);
      setNewPath('');
    }
  };

  const handleCancel = () => {
    setEditingImage(null);
    setNewPath('');
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      deleteImageData(id);
      setImages(getImageData());
    }
  };

  const handleAddImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewImage((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddImage = (e: React.FormEvent) => {
    e.preventDefault();
    addImageData(newImage);
    setImages(getImageData());
    setNewImage({ name: '', location: '', path: '' });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Photo Management</h1>

      <div className="mb-8 p-4 border rounded">
        <h2 className="text-xl font-bold mb-2">Add New Image</h2>
        <form onSubmit={handleAddImage} className="flex flex-col space-y-2">
          <input
            type="text"
            name="name"
            value={newImage.name}
            onChange={handleAddImageChange}
            placeholder="Photo Name"
            className="border p-2"
            required
          />
          <input
            type="text"
            name="location"
            value={newImage.location}
            onChange={handleAddImageChange}
            placeholder="Location (e.g., Home Page)"
            className="border p-2"
            required
          />
          <input
            type="text"
            name="path"
            value={newImage.path}
            onChange={handleAddImageChange}
            placeholder="Path (e.g., /images/uploadMediaManager/new-image.jpg)"
            className="border p-2"
            required
          />
          <button type="submit" className="bg-green-500 text-white p-2 rounded">
            Add Image
          </button>
        </form>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Photo Name</th>
              <th className="py-2 px-4 border-b">Location</th>
              <th className="py-2 px-4 border-b">Path</th>
              <th className="py-2 px-4 border-b">Photo</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {images.map((image) => (
              <tr key={image.id}>
                <td className="py-2 px-4 border-b">{image.name}</td>
                <td className="py-2 px-4 border-b">{image.location}</td>
                <td className="py-2 px-4 border-b">
                  {editingImage?.id === image.id ? (
                    <input
                      type="text"
                      value={newPath}
                      onChange={(e) => setNewPath(e.target.value)}
                      className="border p-1 w-full"
                    />
                  ) : (
                    image.path
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  <img src={image.path} alt={image.name} className="w-20 h-20 object-cover" />
                </td>
                <td className="py-2 px-4 border-b">
                  {editingImage?.id === image.id ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(image)}
                        className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(image.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PhotoManagement;