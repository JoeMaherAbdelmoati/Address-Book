import Grid from '@material-ui/core/Grid';
import React from "react";
import Avatar from '@material-ui/core/Avatar';
import ReactCrop from 'react-image-crop';
import {withStyles} from '@material-ui/core';

const useStyles = () => ({
    cropper: {
        minWidth: 200
    },
    avatar: {
        width: '200px',
        height: '200px',
        'box-shadow': '#acacac 0px 0px 10px',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#eee',
            opacity: .65,
            transition: '.5s',
        },
    },
});

class ImageCropper extends React.Component {
    onSelectFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () =>
                this.setState({src: reader.result})
            );
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    onImageLoaded = (image, pixelCrop) => {
        this.imageRef = image;
    };

    onCropComplete = (crop, pixelCrop) => {
        this.makeClientCrop(crop, pixelCrop);
    };

    onCropChange = (crop) => {
        this.setState({crop});
    };

    async makeClientCrop(crop, pixelCrop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                pixelCrop,
                'newFile.jpeg'
            );
            this.setState({croppedImageUrl});

            let base64Image = await this.toDataURL(croppedImageUrl);
            this.props.onProcessImage(base64Image);
        }
    }

    getCroppedImg(image, pixelCrop, fileName) {
        const canvas = document.createElement('canvas');
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob((blob) => {
                if (!blob) {
                    //reject(new Error('Canvas is empty'));
                    console.error('Canvas is empty');
                    return;
                }
                blob.name = fileName;
                //here get the blob
                this.setState({blob});
                window.URL.revokeObjectURL(this.fileUrl);
                this.fileUrl = window.URL.createObjectURL(blob);
                resolve(this.fileUrl);
            }, 'image/jpeg');
        });
    };

    toDataURL = function (url) {
        return fetch(url).then(function (response) {
            return response.blob();
        }).then(function (blob) {
                return new Promise(function (resolve, reject) {
                        const reader = new FileReader();
                        reader.onerror = reject;
                        reader.readAsDataURL(blob);
                        reader.onloadend = function () {
                            return resolve(reader.result);
                        }
                    }
                )
            }
        )
    }
    state = {
        src: null,
        crop: {
            aspect: 1,
            width: 200,
            height: 200,
            maxWidth: 200,
            maxHeight: 200,
            x: 0,
            y: 0,
        },
    };

    render() {
        const {classes, processedImage, image} = this.props;
        const {src, crop} = this.state;
        return (
            <React.Fragment>
                <Grid item xs>
                    <label htmlFor="upload-logo">
                        <Avatar alt="Logo"
                                src={image || '/man-user.png'}
                                className={classes.avatar}/>
                        <input id="upload-logo" className="d-none" type="file"
                               onChange={this.onSelectFile}/>
                    </label>
                </Grid>
                <Grid item xs className={classes.cropper}>
                    {src && (
                        <ReactCrop
                            src={src}
                            crop={crop}
                            onImageLoaded={this.onImageLoaded}
                            onComplete={this.onCropComplete}
                            onChange={this.onCropChange}
                            className="circle"
                        />
                    )}
                </Grid>
                <Grid item xs>{processedImage && (
                    <img alt="Crop" className="rounded-circle croped-image"
                         style={{maxWidth: '200px'}} src={processedImage}/>
                )}</Grid>
            </React.Fragment>
        );
    }
};
export default withStyles(useStyles)(ImageCropper)