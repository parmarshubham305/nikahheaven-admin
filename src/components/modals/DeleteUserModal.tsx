import React from 'react';
import { FaSpinner, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

interface deleteModalProps {
  row: any;
  title?: string;
  handleDelete: any;
  loading?: boolean;
}

const DeleteModal: React.FC<deleteModalProps> = ({ title = 'Do you want to delete the user?', row, handleDelete, loading=false }) => {
  const OnDelete = () => {
    Swal.fire({
      title: title,
      showCancelButton: true,
      confirmButtonText: `Delete`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await handleDelete(row);
        if (response.status === 'Delete') {
          Swal.fire('Deleted!', '', 'success');
        } else {
          Swal.fire("Something Wen't wrong", '', 'error');
        }
      }
    });
  };
  return (
    <button className="h-4 w-4" onClick={() => OnDelete()}>
      <FaTrash />
    </button>
  );
};

export default DeleteModal;
