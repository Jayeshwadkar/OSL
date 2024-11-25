import React, { useEffect } from 'react';
import Swal from 'sweetalert2';

const ConfirmationDialog = ({ open, onClose, onConfirm, messages }) => {
  useEffect(() => {
    if (open) {
      Swal.fire({
        html: `
          <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-triangle">
              <path d="M12 9v2m0 4h.01"></path>
              <circle cx="12" cy="12" r="10"></circle>
            </svg>
            ${messages.map((message, index) => `${message}<br/>`).join('')}
          </div>
        `,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          onConfirm();
        } else {
          onClose();
        }
      });
    }
  }, [open, onClose, onConfirm, messages]);

  return null; 
};

export default ConfirmationDialog;
