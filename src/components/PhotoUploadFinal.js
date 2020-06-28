import React, { useState, useRef } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dropzone from "react-dropzone";
import Paper from '@material-ui/core/Paper';
import { useAuth0 } from "../react-auth0-spa";
import Axios from "axios";
import { useHistory, Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';



const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: 30,
            // minWidth: 400,
            // width: '60vw',
            background: '#FAF5FB'
        },
    },
    form: {
        width: '60vw',
        height: 600
    },
    preview: {
        height: 400,
        width: 400
    },
    dropzone: {
        width: 600,
        marginLeft: 20
    },
    leftEdge: {
        marginLeft: 30
    }
}));

export default function ProfileUpload() {
    const [fileNames, setFileNames] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const [uploadFile, setUploadFile] = useState('');

    const { user } = useAuth0();
    const history = useHistory();

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


            history.push(`/profile/${user.id}`);


    }

    return (
        <Grid container className={classes.gridContainer}>
            <Grid className={classes.leftEdge} item m={1}></Grid>
            <Grid item m={10}>
                <div className={classes.uploadWrapper} onSubmit={handlePostSubmit}>
                    <form className={classes.root} autoComplete="off">
                    <Dropzone className={classes.dropzone} onDrop={handleDrop} accept="image/*" >
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
                                         {/* {/* <div style={{ paddingLeft: "10px" }}> */}
                                             {/* File: {fileNames.map(fileName => (
                                             <li key={fileName}>{fileName}</li>
                                         ))} */}

                                             <div >Preview:</div>
                                             {imageUrls.map(imageUrl => (
                                                 <img className={classes.preview} alt={'uploadedImage'} key={imageUrl} src={imageUrl}  />
                                             ))}
                                         </div>

                                 )
                             }
                             }
                         </Dropzone>
                     {/* </Paper> */}
                     <Button type="submit" variant="contained">
                         Post
                     </Button>


                    </form>
                </div>
            </Grid>
            <Grid item m={1}></Grid>
        </Grid>
    )
}
