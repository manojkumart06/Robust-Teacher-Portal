import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Table, TableHead, TableBody, TableRow, TableCell, Avatar, Paper, Popover } from '@mui/material';
import { blue } from '@mui/material/colors';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import { deleteDetails, addDetails, editDetails } from '../redux/studentAction';
import StudentModal from './StudentModal';
import './Home.css';

const Home = () => {
  const students = useSelector(state => state.students.students);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

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

  const handleOptionsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOptionsClose = () => {
    setAnchorEl(null);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    handleOptionsClose(); 
  };

  const handleSave = (student) => {
    if (student.index !== undefined) {
      const { index, ...details } = student;
      dispatch(editDetails({ index, details }));
    } else {
      dispatch(addDetails(student));
    }
    setIsModalOpen(false);
    handleOptionsClose(); 
  };

  return (
    <>
      <nav className="navbar">
        <a href="/home" className="nav-logo">
           tailwebs.
        </a>
        <div className="nav-links">
          <a href="/home" className="nav-link">
            Home
          </a>
          <a href="/" className="nav-link">
            Logout
          </a>
        </div>
      </nav>
      <div className='table-container'>
        <Table>
          <TableHead className='table-head' >
            <TableRow>
              <TableCell className="table-cell">Name</TableCell>
              <TableCell className="table-cell">Subject</TableCell>
              <TableCell className="table-cell marks-cell">Marks</TableCell>
              <TableCell className="table-cell">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className='table-body'>
            {students.map((student, index) => (
              <TableRow key={index}>
                <TableCell className="table-cell">
                  <div className="student-name">
                    <Avatar sx={{ marginRight: '10px', bgcolor: blue[500] }}>{student.name.charAt(0)}</Avatar>
                    {student.name}
                  </div>
                </TableCell>
                <TableCell className="table-cell subject-cell">{student.subject}</TableCell>
                <TableCell className="table-cell marks-cell">{student.marks}</TableCell>
                <TableCell className="table-cell">
                  <ArrowDropDownCircleIcon style = {{cursor:'pointer'}} onClick={handleOptionsClick} />
                  <Popover
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={handleOptionsClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'left',
                      horizontal: 'center',
                    }}
                  >
                    <Paper className="options-popover">
                      <Button className="options-button" onClick={() => handleEdit(index)}>Edit</Button>
                      <br />
                      <Button className="options-button" onClick={() => handleDelete(index)}>Delete</Button>
                    </Paper>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className = 'add-btn' >
      <Button onClick={handleAdd}>Add</Button>
        {isModalOpen && <StudentModal student={currentStudent} isModalOpen={isModalOpen} onSave={handleSave} onClose={handleModalClose} />}
      </div>
    </>
  );
};

export default Home;
