import React from 'react';
import { useParams } from 'react-router-dom';

const GuestEdit = () => {
  const { id } = useParams();

  return (
    <>
      <div>guestEdit</div>
      <h2>ID: {id}</h2>
    </>
  );
};

export default GuestEdit;
