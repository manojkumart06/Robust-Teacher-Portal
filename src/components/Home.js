import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { deleteDetails, addDetails, editDetails } from '../redux/studentAction';
import StudentModal from './StudentModal';

const Home = () => {
  const students = useSelector(state => state.students.students);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);

  const handleAdd = () => {
    setCurrentStudent(null);
    setIsModalOpen(true);
  };

  const handleEdit = (index) => {
    const editedStudent = { ...students[index], index };
    setCurrentStudent(editedStudent);
    setIsModalOpen(true);
  };

  const handleDelete = (index) => {
    dispatch(deleteDetails(index));
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSave = (student) => {
    if (student.index !== undefined) {
      const { index, ...details } = student;
      dispatch(editDetails({ index, details }));
    } else {
      dispatch(addDetails(student));
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1>Teacher Portal</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Subject</TableCell>
            <TableCell>Marks</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student, index) => (
            <TableRow key={index}>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.subject}</TableCell>
              <TableCell>{student.marks}</TableCell>
              <TableCell>
                <Button variant="contained" onClick={() => handleEdit(index)}>Edit</Button>
                <Button variant="contained" onClick={() => handleDelete(index)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button variant="contained" onClick={handleAdd}>Add New Student</Button>
      {isModalOpen && <StudentModal student={currentStudent} isModalOpen={isModalOpen} onSave={handleSave} onClose={handleModalClose} />}
    </div>
  );
};

export default Home;
