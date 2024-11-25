// src/components/CustomPagination.js
import React, { useEffect, useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';

const CustomPagination = ({ page, rowsPerPage, count, onPageChange, onRowsPerPageChange }) => {
  
  const [inputPage, setInputPage] = useState(page + 1); 
  const totalPages = Math.ceil(count / rowsPerPage);
  useEffect(() => {
    setInputPage(page + 1);
  }, [page])
  const handlePageInputChange = (e) => {
    const value = e.target.value;
    
    if (/^\d*$/.test(value)) {
      setInputPage(value === '' ? '' : parseInt(value, 10));
    }
  };

  const handlePageInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (inputPage > 0 && inputPage <= totalPages) {
        onPageChange(inputPage - 1); 
      } else {
        setInputPage(page + 1); 
      }
    }
  };

  return (
    <Grid container spacing={2} alignItems="center" justifyContent="flex-end">
      <Grid item>
        <Typography variant="body1">
          Total Count {count}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1">
          Page {page + 1} of {totalPages}
        </Typography>
      </Grid>
      <Grid item>
        <Button
          onClick={() => onPageChange(0)}
          disabled={page === 0}
          sx={{color:'black'}}
        >
          First
        </Button>
      </Grid>
      <Grid item>
        <Button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 0}
          sx={{color:'black'}}
        >
          Previous
        </Button>
      </Grid>
      {/* <Grid item>
        <input
          type="number"
          value={inputPage}
          onChange={handlePageInputChange}
          onKeyDown={handlePageInputKeyDown}
          min="1"
          max={totalPages}
          style={{ width: '100px', textAlign: 'center' }}
        />
      </Grid> */}
      <Grid item>
        <Button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages - 1}
          sx={{color:'black'}}
        >
          Next
        </Button>
      </Grid>
      <Grid item>
        <Button
          onClick={() => onPageChange(totalPages - 1)}
          disabled={page >= totalPages - 1}
          sx={{color:'black'}}
        >
          Last
        </Button>
      </Grid>
    </Grid>
  );
};

export default CustomPagination;
