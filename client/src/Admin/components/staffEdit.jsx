import React from 'react';
import { useParams } from 'react-router-dom';

const StaffEdit = () => {
  const { id } = useParams();

  return (
    <>
      <div>StaffEdit</div>
      <h2>ID: {id}</h2>
    </>
  );
};

export default StaffEdit;
