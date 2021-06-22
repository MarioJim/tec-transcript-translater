import React from 'react';
import ReactDOM from 'react-dom';

import Popup from './Popup';

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById('root'),
);

if ((module as any).hot) (module as any).hot.accept();
