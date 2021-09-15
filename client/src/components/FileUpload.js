import React, { Fragment, useState } from 'react';
import Message from './Message';
import axios from 'axios';

export const FileUpload = () => {
    const [file, setFile] = useState('');
    //const [setFilename]= useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({});
    const [message, setMessage] = useState('');

    const onChange = e => {
        setFile(e.target.files[0]);
        //setFilename(e.target.files[0].name)
    }

    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const { fileName, filePath } = res.data;

            setUploadedFile({ fileName, filePath })
            console.log(fileName);

            setMessage('File Uploaded');

        } catch(err) {
            // if(err.response.status === 500) {
            //     setMessage('theres a problem with the server');
            // } else {
            //     setMessage(err.response.data.msg);
            // }
        }
    }

    return (
        <Fragment>
            {message ? <Message msg={message} /> : null}
            <form onSubmit={onSubmit}>
                <div className='input-group'>
                    <input type='file' className='form-control' id='inputGroupFile04' onChange={onChange} />
                    {/* <button className='btn btn-outline-secondary' type='button' id='inputGroupFileAddon04'>Browse</button> */}
                    <label className='custom-file-label' htmlFor='customFile'>
                        
                    </label>
                </div>

                <input 
                type='submit' 
                value='Upload' 
                className='btn btn-primary btn-block mt-4' 
                />
            </form>
            { uploadedFile ? <div className='row mt-5'>
                <div className='col-md-6 m-auto'>
                    <h3 className='text-center'>{ uploadedFile.fileName }</h3>
                    <img style= {{ width: '100%' }} src={uploadedFile.filePath} alt=''/>
                </div>
            </div> : null }
        </Fragment>
    )
}

export default FileUpload