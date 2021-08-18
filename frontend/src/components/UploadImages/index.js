import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";

function UploadImages() {
  const [newImage, setnewImage] = useState(null);
  const [uploadImage, { data }] = useMutation(gql`
    mutation singleUpload($file: Upload) {
      singleUpload(file: $file)
    }
  `);
  console.log(data);
  return (
    <div>
      <input type="file" onChange={(e) => setnewImage(e.target.files[0])} />
      <button
        onClick={() => {
          uploadImage({
            variables: {
              file: newImage,
            },
          });
        }}
      >
        SEND IMAGE
      </button>
    </div>
  );
}

export default UploadImages;
