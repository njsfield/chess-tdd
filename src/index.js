import React from 'react';
import ReactDOM from 'react-dom';

import reducer from './reducer';

// import main styles
import './styles/index.css';

// import reducer from './reducer';

// Main render
document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(<div>Hello world</div>, document.getElementById('main'));
});
