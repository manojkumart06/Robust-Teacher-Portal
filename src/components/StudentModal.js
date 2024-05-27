import React, { useState, useEffect } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const StudentModal = ({ isModalOpen, student, onSave, onClose }) => {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [marks, setMarks] = useState('');

  useEffect(() => {
    if (student) {
      setName(student.name);
      setSubject(student.subject);
      setMarks(student.marks);
    }
  }, [student]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const studentData = { name, subject, marks: parseInt(marks) };
    if (student && student.index !== undefined) {
      studentData.index = student.index;
    }
    onSave(studentData);
  };

  return (
    <Dialog open={isModalOpen} onClose={onClose}>
      <DialogTitle>{student ? 'Edit Student' : 'Add Student'}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth required />
          <TextField label="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} fullWidth required />
          <TextField type="number" label="Marks" value={marks} onChange={(e) => setMarks(e.target.value)} fullWidth required />
          <DialogActions>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
            <Button onClick={onClose} variant="outlined" color="primary">
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default StudentModal;
