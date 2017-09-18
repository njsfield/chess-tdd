import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './Counter';

// import main styles
import './styles/index.css';

// Main render
document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    React.createElement(Counter),
    document.getElementById('main')
  );
});
