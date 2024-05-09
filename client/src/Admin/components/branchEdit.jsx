import React from 'react';
import { useParams } from 'react-router-dom';

const BranchEdit = () => {
  const { id } = useParams();

  return (
    <>
      <div>BranchEdit</div>
      <h2>ID: {id}</h2>
    </>
  );
};

export default BranchEdit;
