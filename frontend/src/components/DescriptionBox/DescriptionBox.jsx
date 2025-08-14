import React from 'react';
import './DescriptionBox.css';

function DescriptionBox() {
  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box active">Description</div>
        <div className="descriptionbox-nav-box fade">Review (122)</div>
      </div>

      <div className="descriptionbox-description">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, quam!
          Impedit quae esse aperiam non ad dolore nam molestias asperiores nisi autem?
          Praesentium nobis cumque quaerat, officia reprehenderit veniam odit.
        </p>
      </div>
    </div>
  );
}

export default DescriptionBox;
