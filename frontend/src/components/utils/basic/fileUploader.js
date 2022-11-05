import React from 'react';
import { FaFileUpload } from 'react-icons/fa'

const FileUploader = props => {
  // Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef(null);
  
  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file 
  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    props.handleFile(fileUploaded);
  };
  return (
    <>
      <div className='btn' onClick={handleClick}>
        <FaFileUpload 
          size='50'
          color='#52c7c1'
        />
      </div>

      <input
        type="file"
        accept='image/*'
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{display: 'none'}}
      />
    </>
  );
}

export default FileUploader;