import React from 'react';
import { useParams } from 'react-router-dom';

const BookingEdit = () => {
  const { id } = useParams();

  return (
    <>
      <div>RoomEdit</div>
      <h2>ID: {id}</h2>
    </>
  );
};

export default BookingEdit;
