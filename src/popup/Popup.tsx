import React from 'react';

const removeWatermark = () => {
  console.log('removing watermark...');
};

const translatePage = () => {
  console.log('translating page...');
};

const Popup: React.FC = () => (
  <div>
    <button onClick={removeWatermark}>Quitar la marca de agua</button>
    <button onClick={translatePage}>Traducir página</button>
  </div>
);

export default Popup;
