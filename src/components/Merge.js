// import React, { useState } from "react";
import "./merge.css";
// import { PDFDocument } from 'pdf-lib';

// const Merge = (props) => {
//   const [pdfFiles, setFile] = useState([]);
//   const [mergedPdfBase64, setMergedPdfBase64] = useState("");

//   const handlePDFChange = (event) => {
//     const files = event.target.files;
//     handleFiles(files);
//   };

//   const handleDrop = (event) => {
//     event.preventDefault();
//     const files = event.dataTransfer.files;
//     handleFiles(files);
//   };

//   const handleFiles = (files) => {
//     const filesArray = Array.from(files);
//     setFile(prevFiles => [...prevFiles, ...filesArray]);
//   };

//   const mergePDFs = async () => {
//     try {
//       if (pdfFiles.length < 2) {
//         alert('Please select at least two PDF files to merge.');
//         return;
//       }
  
//       const mergedPdf = await PDFDocument.create();
  
//       for (const pdfFile of pdfFiles) {
//         const existingPdfBytes = await pdfFile.arrayBuffer();
//         const pdfDoc = await PDFDocument.load(existingPdfBytes);
  
//         const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
//         copiedPages.forEach((page) => {
//           mergedPdf.addPage(page);
//         });
//       }
  
//       const mergedPdfBytes = await mergedPdf.save();
//       const mergedPdfBuffer = new Uint8Array(mergedPdfBytes);
//       const mergedPdfBase64 = arrayBufferToBase64(mergedPdfBuffer);
//       setMergedPdfBase64(mergedPdfBase64);
//     } catch (error) {
//       console.error('Error merging PDFs:', error);
//     }
//   };
  
//   const handleDownloadPDF = () => {
//     const blob = new Blob([Buffer.from(mergedPdfBase64, 'base64')], { type: 'application/pdf' });
//     const url = window.URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.setAttribute("download", "merged.pdf");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };
//   const arrayBufferToBase64 = (buffer) => {
//     let binary = '';
//     const bytes = new Uint8Array(buffer);
//     for (let i = 0; i < bytes.byteLength; i++) {
//       binary += String.fromCharCode(bytes[i]);
//     }
//     return window.btoa(binary);
//   };
  

//   const handleDragOver = (event) => {
//     event.preventDefault();
//   };

//   return (
//     <>
//       <div className="pdf-header" onDragOver={handleDragOver} onDrop={handleDrop}>
//         <div className={`upload-heading ${props.mode}`}>
//           UPLOAD YOUR PDFs HERE
//         </div>
//         <div className="uploading">
//           <div className="upload-content">
//             <div className="icon">
//               <label htmlFor="file-upload">
//                 <div className="margin">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="currentColor"
//                     className="bi bi-cloud-upload"
//                     viewBox="0 0 16 16"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383"
//                     />
//                     <path
//                       fillRule="evenodd"
//                       d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708z"
//                     />
//                   </svg>
//                 </div>
//               </label>
//               <input
//                 id="file-upload"
//                 type="file"
//                 accept="application/pdf"
//                 onChange={handlePDFChange}
//                 multiple
//               />
//             </div>
//             <div className="drag">
//               <h3>DRAG AND DROP FILES OR BROWSE </h3>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="pdf-grid">
//         {pdfFiles.map((pdf, index) => (
//           <embed
//             key={index}
//             src={URL.createObjectURL(pdf)}
//             type="application/pdf"
//             className="selected-pdf"
//           />
//         ))}
//       </div>

//       <div className="container">
//         <div className="des_button" onClick={mergePDFs}>
//           MERGE PDFs
//         </div>
//       </div>

//       {mergedPdfBase64 && (
//         <div>
//           <button onClick={handleDownloadPDF}>Download Merged PDF</button>
//         </div>
//       )}
//     </>
//   );
// };

// export default Merge;
import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';


const Merge = (props) => {
  const [pdfFiles, setPdfFiles] = useState([]);

  const [mergedPdfBase64, setMergedPdfBase64] = useState("");

  const handlePDFChange = (event) => {
    const files = event.target.files;
    if (files.length === 1) {
      setPdfFiles([...pdfFiles, files[0]]);
    } else {
      setPdfFiles([...pdfFiles, ...files]);
    }
  };
  

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    const filesArray = Array.from(files);
    setPdfFiles((prevFiles) => [...prevFiles, ...filesArray]);

  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const removePdfFile = (index) => {
    const updatedFiles = pdfFiles.filter((_, i) => i !== index);
    setPdfFiles(updatedFiles);
  };

  const mergePDFs = async () => {
    try {
      if (pdfFiles.length < 2) {
        alert('Please select at least two PDF files to merge.');
        return;
      }

      const mergedPdf = await PDFDocument.create();

      for (const pdfFile of pdfFiles) {
        const existingPdfBytes = await pdfFile.arrayBuffer();
        const pdfDoc = await PDFDocument.load(existingPdfBytes);

        const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
        copiedPages.forEach((page) => {
          mergedPdf.addPage(page);
        });
      }

      const mergedPdfBytes = await mergedPdf.save();
      const mergedPdfBase64 = await arrayBufferToBase64(mergedPdfBytes);
      setMergedPdfBase64(mergedPdfBase64);
    } catch (error) {
      console.error('Error merging PDFs:', error);
    }
  };

  const handleDownloadPDF = () => {
    const blob = new Blob([base64ToArrayBuffer(mergedPdfBase64)], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "merged.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const base64ToArrayBuffer = (base64) => {
    const binaryString = window.atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  };

  const arrayBufferToBase64 = async (buffer) => {
    const blob = new Blob([buffer], { type: 'application/pdf' });
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result.split(',')[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  return (
    <>
      <div className="pdf-header" onDragOver={handleDragOver} onDrop={handleDrop}>
        <div className={`upload-heading ${props.mode}`}>
          UPLOAD YOUR PDFs HERE
        </div>
        <div className="uploading">
          <div className="upload-content">
            <div className="icon">
              <label htmlFor="file-upload">
                <div className="margin">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="bi bi-cloud-upload"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383"
                    />
                    <path
                      fillRule="evenodd"
                      d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708z"
                    />
                  </svg>
                </div>
              </label>
              <input
                id="file-upload"
                type="file"
                accept="application/pdf"
                onChange={handlePDFChange}
                multiple
              />
            </div>
            <div className="drag">
              <h3>DRAG AND DROP FILES OR BROWSE </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="pdf-grid">
        {pdfFiles.map((pdf, index) => (
          <embed
            key={index}
            src={URL.createObjectURL(pdf)}
            type="application/pdf"
            className="selected-pdf"
          />
        ))}
      </div>

      <div className="container">
        <div className="des_button" onClick={mergePDFs}>
          MERGE PDFs
        </div>
      </div>
    <div className="down">
    {mergedPdfBase64 && (
        <div>
          <div className="indown" onClick={handleDownloadPDF}>Download Merged PDF</div>
        </div>
      )}
    </div>
     
    </>
  );
};


export default Merge;
