import React, { useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Axios from 'axios';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const activeStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};


export default function StyledDropzone(props) {
    const {
        getRootProps,
        acceptedFiles,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({ accept: ['image/jpeg', 'image/png'] });

    const [uploadFile, setUploadFile] = useState('');

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    const handleFileChange = async (ev) => {
        console.log('file change handler activated')
        setUploadFile(ev.target.files[0]);
        const uploadRes = await Axios({
            url: 'http://localhost:8080/aws/image-upload',
            method: 'post',
            data: {
                image: uploadFile
            }
        });
        console.log('uploadRes: ', uploadRes);
    }

    const handleUpload = async (ev) => {
        const uploadRes = await Axios({
            url: 'http://localhost8080/aws/image-upload',
            method: 'post',
            data: {
                image: uploadFile
            }
        });
        console.log('uploadRes: ', uploadRes);
    }
    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    return (
        <div className="container">
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} onChange={handleFileChange} />
                <p>Drag 'n' drop some files here, or click to select files</p>
                <button onClick={handleUpload}>Confirm Upload</button>
            </div>
            <aside>
                <h4>Files</h4>
                <ul>{files}</ul>
            </aside>
        </div>
    );
}