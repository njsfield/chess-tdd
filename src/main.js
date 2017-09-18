import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './Counter';

// Main render
document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    React.createElement(Counter),
    document.getElementById('main')
  );
});
