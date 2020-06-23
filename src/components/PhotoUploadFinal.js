import React, { useState, useRef } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dropzone from "react-dropzone";
import Paper from '@material-ui/core/Paper';
import { useAuth0 } from "../react-auth0-spa";
import Axios from "axios";


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            minWidth: 400,
            width: '60vw',
            background: '#FAF5FB'
        },
    },
    form: {
        width: '60vw'
    }
}));

export default function ProfileUpload() {
    const [fileNames, setFileNames] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const [uploadFile, setUploadFile] = useState('');

    const { user } = useAuth0();

    //grab ref to image form data
    const imageData = useRef(new FormData());

    const { getTokenSilently } = useAuth0();

    const classes = useStyles();

    //drop handler
    const handleDrop = async (acceptedFiles) => {

        imageData.current.append(`image`, acceptedFiles[0]);
        console.log('imageData: ', imageData);
        console.log('acc files: ', acceptedFiles[0])

        setUploadFile(acceptedFiles[0]);
        setFileNames(acceptedFiles.map(file => file.name));
        //sets temp image url in state for photo preview
        setImageUrls(acceptedFiles.map(file => URL.createObjectURL(file)));
    }

    /**/
    const handlePostSubmit = async (e) => {
        e.preventDefault();

        //makes sure a photo was uploaded
        if (imageUrls.length === 0) {
            alert('please upload a photo');
            return;
        }

        const token = await getTokenSilently();
        debugger;

        const uploadRes = await Axios({
            url: `http://localhost:8080/aws/image-upload/${user.id}`,
            method: 'post',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            },
            data: imageData.current
        });
        console.log('uploadRes: ', uploadRes);

        // if (upLoadRes.ok) {
        //     window.location.href = '/'
        // }

    }

    return (
        <div id="new-post-form-container" onSubmit={handlePostSubmit} >
            < Paper >
                <form className={`${classes.root} new-post-form`} autoComplete="off">
                    {/* dropzone component comes from react-dropzone
                and allows client to drag/drop or upload an image to post */}
                    <Paper className="drop-zone" color="secondary" className="MuiFormControl-root">
                        <Dropzone onDrop={handleDrop} accept="image/*" >
                            {({ getRootProps,
                                getInputProps,
                                isDragActive,
                                isDragAccept,
                                isDragReject
                            }) => {
                                const additionalClass = isDragAccept
                                    ? "accept"
                                    : isDragReject
                                        ? "reject"
                                        : "";
                                return (
                                    <div
                                        {...getRootProps({
                                            className: `dropzone ${additionalClass} dropzone-container`
                                        })}
                                    >
                                        <input {...getInputProps()} />
                                        <div className="dropzone-text">
                                            <p >Drag/drop image, or click to select image</p>
                                        </div>
                                        <div style={{ paddingLeft: "10px" }}>
                                            File: {fileNames.map(fileName => (
                                            <li key={fileName}>{fileName}</li>
                                        ))}

                                            <div>Preview:</div>
                                            {imageUrls.map(imageUrl => (
                                                <img alt={'uploadedImage'} key={imageUrl} src={imageUrl} width="100%" />
                                            ))}
                                        </div>
                                    </div>
                                )
                            }
                            }
                        </Dropzone>
                    </Paper>
                    <Button type="submit" variant="contained">
                        Post
                    </Button>
                </form>
            </Paper >
        </div >
    );
}
