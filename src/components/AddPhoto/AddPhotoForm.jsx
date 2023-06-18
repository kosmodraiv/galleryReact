import React, { useState } from 'react';
import axios from 'axios';
import '../../index.scss';

export const AddPhotoForm = ({ categories, onClose }) => {
  const [photoData, setPhotoData] = useState({
    category: '',
    name: '',
    photos: []
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPhotoData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const categoryNumber = getCategoryNumber(photoData.category);
    if (categoryNumber !== null) {
      const formattedData = {
        ...photoData,
        category: categoryNumber,
        photos: photoData.photos.split(',').map((url) => url.trim())
      };
      axios
        .post('https://644e81781b4567f4d5896097.mockapi.io/catalogphoto/photos', formattedData)
        .then((response) => {
          console.log('Photo added successfully:', response.data);
          setPhotoData({
            category: '',
            name: '',
            photos: []
          });
          onClose();
        })
        .catch((error) => {
          console.error('Error adding photo:', error);
        });
    } else {
      console.error('Invalid category');
    }
  };

  const getCategoryNumber = (category) => {
    switch (category) {
      case 'Море':
        return 1;
      case 'Горы':
        return 2;
      case 'Архитектура':
        return 3;
      case 'Города':
        return 4;
      default:
        return null;
    }
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>

        <form onSubmit={handleSubmit}>
          <label className='form-category'>
            Category:
            <select name="category" value={photoData.category} onChange={handleInputChange}>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>

          <label className='form-name'>
            Name:
            <input type="text" name="name" value={photoData.name} onChange={handleInputChange} />
          </label>

          <label className='form-photos'>
            Photos:
            <input type="text" name="photos" value={photoData.photos} onChange={handleInputChange} />
          </label>

          <button className='form-add' type="submit">Add Photo</button>
        </form>
      </div>
    </div>
  );
};