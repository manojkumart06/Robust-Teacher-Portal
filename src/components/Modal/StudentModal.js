import React, { useState, useEffect } from 'react';
import './StudentModal.css';
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  Box,
  Typography
} from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SubjectIcon from '@mui/icons-material/Subject';
import BookmarkBorderSharpIcon from '@mui/icons-material/BookmarkBorderSharp';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

const StudentModal = ({ isModalOpen, student, onSave, onClose }) => {
  // State to manage form fields
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [marks, setMarks] = useState('');
  // State to manage error messages
  const [errors, setErrors] = useState({});

  // Effect to populate the form fields when a student is being edited
  useEffect(() => {
    if (student) {
      setName(student.name);
      setSubject(student.subject);
      setMarks(student.marks);
    }
  }, [student]);

  // Validation logic for form fields
  const validate = () => {
    const newErrors = {};

    // Check if name is empty
    if (!name) {
      newErrors.name = 'Name is required';
    }

    // Check if subject is empty
    if (!subject) {
      newErrors.subject = 'Subject is required';
    }

    // Check if marks is empty or not a valid number between 0 and 100
    if (!marks) {
      newErrors.marks = 'Mark is required';
    } else if (isNaN(marks) || marks < 0 || marks > 100) {
      newErrors.marks = 'Marks must be a number between 0 and 100';
    }

    // Update errors state
    setErrors(newErrors);

    // Return true if no errors, false otherwise
    return Object.keys(newErrors).length === 0;
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form fields before submitting
    if (validate()) {
      const studentData = { name, subject, marks: parseInt(marks) };
      // If editing, include the student's index
      if (student && student.index !== undefined) {
        studentData.index = student.index;
      }
      onSave(studentData);
    }
  };

  return (
    <Dialog open={isModalOpen} onClose={onClose}>
      <DialogTitle className="dialog-title">{student ? 'Edit Student' : 'Add Student'}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Box className="form-box">
            <Typography variant="body1" className="typography-body">Name</Typography>
            <TextField
              variant="outlined"
              fullWidth
              className="text-field"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={!!errors.name} 
              helperText={errors.name} 
              InputProps={{
                className: 'text-field-input',
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon />
                    <HorizontalRuleIcon className="horizontal-rule-icon" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box className="form-box">
            <Typography variant="body1" className="typography-body">Subject</Typography>
            <TextField
              variant="outlined"
              fullWidth
              className="text-field"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              error={!!errors.subject} // Show error state if subject is invalid
              helperText={errors.subject} // Show error message if subject is invalid
              InputProps={{
                className: 'text-field-input',
                startAdornment: (
                  <InputAdornment position="start">
                    <SubjectIcon />
                    <HorizontalRuleIcon className="horizontal-rule-icon" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box className="form-box">
            <Typography variant="body1" className="typography-body">Marks</Typography>
            <TextField
              variant="outlined"
              type='number'
              fullWidth
              className="text-field"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              error={!!errors.marks} 
              helperText={errors.marks} // Show error message if marks are invalid
              InputProps={{
                className: 'text-field-input',
                startAdornment: (
                  <InputAdornment position="start">
                    <BookmarkBorderSharpIcon />
                    <HorizontalRuleIcon className="horizontal-rule-icon" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <DialogActions className="submit-button">
            <Button type="submit" variant="contained">
              {student ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default StudentModal;
