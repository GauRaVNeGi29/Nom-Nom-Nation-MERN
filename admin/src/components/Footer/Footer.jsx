import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="admin-footer">
        Copyright {new Date().getFullYear()} © Admin Panel - Nom Nom Nation - All Right Reserved
    </footer>
  );
};

export default Footer;