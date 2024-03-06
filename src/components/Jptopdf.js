
import React, { useState } from "react";
import { PDFDocument, rgb } from "pdf-lib";
import "./jpg.css";

function Jptopdf(props) {
  const [selectedImages, setSelectedImages] = useState([]);
  const [pdfUrl, setPdfUrl] = useState("");

  const handleImageChange = (event) => {
    const files = event.target.files;
    handleFiles(files);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const imageFiles = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith("image/")) {
        const imageUrl = URL.createObjectURL(file);
        imageFiles.push({ url: imageUrl, file });
      }
    }

    setSelectedImages([...selectedImages, ...imageFiles]);
  };
  const convertToPdf = async () => {
    try {
      const pdfDoc = await PDFDocument.create();
  
      for (let i = 0; i < selectedImages.length; i++) {
        const image = selectedImages[i];
        const imageBytes = await fetch(image.url).then((response) =>
          response.arrayBuffer()
        );
        const img = await pdfDoc.embedJpg(imageBytes); 
        const { width, height } = img.scale(1);
  
        const page = pdfDoc.addPage([width, height]);
        page.drawImage(img, {
          x: 0,
          y: 0,
          width: width,
          height: height,
          opacity: 1,
        });
      }
  
      const pdfBytes = await pdfDoc.save();
      const pdfUrl = URL.createObjectURL(new Blob([pdfBytes], { type: "application/pdf" }));
      setPdfUrl(pdfUrl);
    } catch (error) {
      console.error("Error converting images to PDF:", error);
    }
  };
  

  const handleDownloadPdf = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.setAttribute("download", "converted.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="img-header">
        <div
          className="img-header"
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop}
        >
          <div className={`upload-heading ${props.mode}`}>UPLOAD YOUR IMAGES HERE</div>
          <div className="uploading">
            <div className="upload-content">
              <div className="icon">
                <label htmlFor="file-upload">
                  <div className="margin">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      class="bi bi-cloud-upload"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708z"
                      />
                    </svg>
                  </div>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  multiple
                />
              </div>
              <div className="drag">
                <h3>DRAG AND DROP FILES OR BROWSE </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="image-grid">
        {selectedImages.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={`Image ${index}`}
            className="selected-image"
          />
        ))}
      </div>

      <div class="container">
        <div class="des_button" onClick={convertToPdf}>
          Convert to PDF
        </div>
      </div>
    <div className="down">
      {pdfUrl && (
        <div>
          <div className="indown" onClick={handleDownloadPdf}>Download PDF</div>
        </div>
      )}
       </div>
    </>
  );
}
export default Jptopdf;
