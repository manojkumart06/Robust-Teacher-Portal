import React, { useState, lazy, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Table, TableHead, TableBody, TableRow, TableCell, Avatar, Paper, Popover, TextField } from '@mui/material';
import { blue } from '@mui/material/colors';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import { deleteDetails, addDetails, editDetails } from '../../redux/studentAction';
import './Home.css';

// Lazy load the StudentModal component
const StudentModal = lazy(() => import('../Modal/StudentModal'));

const Home = () => {
  // Get the list of students from the Redux store
  const students = useSelector(state => state.students.students);
  const dispatch = useDispatch();

  // State to control the modal open/close
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State to hold the current student data being edited or added
  const [currentStudent, setCurrentStudent] = useState(null);
  // State to manage the popover anchor element
  const [anchorEl, setAnchorEl] = useState(null);
  // State for search query
  const [searchQuery, setSearchQuery] = useState('');

  // Handler for opening the modal to add a new student
  const handleAdd = () => {
    setCurrentStudent(null);
    setIsModalOpen(true);
  };

  // Handler for opening the modal to edit an existing student
  const handleEdit = (index) => {
    const editedStudent = { ...students[index], index };
    setCurrentStudent(editedStudent);
    setIsModalOpen(true);
  };

  // Handler for deleting a student
  const handleDelete = (index) => {
    dispatch(deleteDetails(index));
  };

  // Handler for opening the options popover
  const handleOptionsClick = (event, index) => {
    setAnchorEl({ anchor: event.currentTarget, index });
  };

  // Handler for closing the options popover
  const handleOptionsClose = () => {
    setAnchorEl(null);
  };

  // Handler for closing the modal
  const handleModalClose = () => {
    setIsModalOpen(false);
    handleOptionsClose(); 
  };

  // Handler for saving the student details (both add and edit)
  const handleSave = (student) => {
    const trimmedStudent = {
      ...student,
      name: student.name.trim(),
      subject: student.subject.trim(),
    };
    if (trimmedStudent.index !== undefined) {
      const { index, ...details } = trimmedStudent;
      dispatch(editDetails({ index, details }));
    } else {
      dispatch(addDetails(trimmedStudent));
    }
    setIsModalOpen(false);
    handleOptionsClose();
  };

  // Filter students based on search query
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    student.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <nav className="navbar">
        <a href="/home" className="nav-logo">
           tailwebs.
        </a>
        <div className='search-container'>
        <TextField 
          variant="outlined"
          fullWidth
          placeholder="Search by name or subject..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>
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
          <TableHead className='table-head'>
            <TableRow>
              <TableCell className="table-cell">Name</TableCell>
              <TableCell className="table-cell">Subject</TableCell>
              <TableCell className="table-cell marks-cell">Marks</TableCell>
              <TableCell className="table-cell no-border">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className='table-body'>
            {filteredStudents.map((student, index) => (
              <TableRow key={index}>
                <TableCell className="table-cell">
                  <div className="student-name">
                    <Avatar sx={{ marginRight: '10px', bgcolor: blue[500], fontFamily:'Cambria'}}>{student.name.charAt(0)}</Avatar>
                    {student.name}
                  </div>
                </TableCell>
                <TableCell className="table-cell subject-cell">{student.subject}</TableCell>
                <TableCell className="table-cell marks-cell">{student.marks}</TableCell>
                <TableCell className="table-cell action-cell">
                  <ArrowDropDownCircleIcon 
                    style={{ cursor: 'pointer'}} 
                    onClick={(event) => handleOptionsClick(event, index)} 
                  />
                  <Popover
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl?.anchor}
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
                      <Button className="options-button" onClick={() => handleEdit(anchorEl?.index)}>Edit</Button>
                      <br />
                      <Button className="options-button" onClick={() => handleDelete(anchorEl?.index)}>Delete</Button>
                    </Paper>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {filteredStudents.length === 0 && (
      <div className="no-records-found">
        <img src='https://cdn-icons-png.flaticon.com/256/11355/11355638.png' alt='No records found'/>
        <h1>No records found. </h1>
      </div>
      )}
      <div className='add-btn'>
        <Button onClick={handleAdd}>Add</Button>
        <Suspense fallback={<div>Loading...</div>}>
          {isModalOpen && <StudentModal student={currentStudent} isModalOpen={isModalOpen} onSave={handleSave} onClose={handleModalClose} />}
        </Suspense>
      </div>
    </>
  );
};

export default Home;
