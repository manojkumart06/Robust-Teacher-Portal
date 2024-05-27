import React from 'react';
import { Link } from '@mui/material';

const Home = () => {
 
  return (
    <div>
        <nav>
        <Link href="/home" variant="body2" style={{ color: '#329BFA', marginLeft: '330px', textDecoration: 'none', fontWeight: '400' }}>
            Home
        </Link>
        <Link href="/" variant="body2" style={{ color: '#329BFA', marginLeft: '330px', textDecoration: 'none', fontWeight: '400' }}>
            Logout
        </Link>
        </nav>
      <h1>Welcome to the Home Screen!</h1>
      <h2>Student Listing</h2>
      
    </div>
  );
};

export default Home;
