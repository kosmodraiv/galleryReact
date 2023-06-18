import React, { useState } from 'react';
import '../../index.scss';
import {AddPhotoForm} from './AddPhotoForm'

export const AddPhoto = ({ categories }) => {
  const [popupVisible, setPopupVisible] = useState(false);

  const handleAddButtonClick = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  return (
    <div className="add-content">
      <button className="add-button" onClick={handleAddButtonClick}>
        <p>+</p>
      </button>

      {popupVisible && (
        <AddPhotoForm categories={categories} onClose={closePopup} />
      )}
    </div>
  );
};