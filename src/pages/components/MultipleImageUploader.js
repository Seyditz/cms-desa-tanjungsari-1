import { Button } from "bootstrap";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import ImagesUploader from "react-images-upload";
import { useDispatch } from "react-redux";
import { setUmkmInputData } from "../../redux/umkmSlice";

const MultipleImageUploader = ({ setObjectImages, prevImages }) => {
  console.log(prevImages);
  const dispatch = useDispatch();
  const [images, setImages] = useState(prevImages);
  const [prevUploadedImages, setPrevImages] = useState([])
  console.log(prevUploadedImages)

  const handleDrop = (droppedFiles) => {
    setImages([...images, ...droppedFiles]);
  };

  const handleUpload = (images) => {
    setObjectImages(images);
  };

  const handleRemove = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setObjectImages(images);
  };

  useEffect(() => {
    setPrevImages(images)
  }, [images])
  

  return (
    <>
      <Dropzone accept="image/*" onDrop={handleDrop} maxFiles={5}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
          </div>
        )}
      </Dropzone>
      <ImagesUploader
        withIcon={true}
        withPreview={true}
        buttonText="Pilih Gambar"
        onChange={handleUpload}
        imgExtension={[".jpg", ".png", ".jpeg"]}
        maxFileSize={5242880}
        withLabel={false}
        singleImage={false}
        defaultImages={images.map((image) => URL.createObjectURL(image))}
        onDelete={handleRemove}
      />
    </>
  );
};

export default React.memo(MultipleImageUploader);
