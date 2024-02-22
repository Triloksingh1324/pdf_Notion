const express = require('express');
const multer = require('multer');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const cors = require('cors');
const sizeOf = require('image-size'); // Importing image-size library

const app = express();
app.use(cors());

// Set up Multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.post('/convertToPdf', upload.array('images'), (req, res) => {
  try {
    const images = req.files;

    // Initialize PDF document
    const pdfDoc = new PDFDocument();
    const pdfBufferArray = [];

    if (images.length === 0) {
      // No images uploaded, respond with an error
      res.status(400).send('No images uploaded.');
      return;
    }

    // Process each image
    images.forEach((image, index) => {
      console.log("Image:", image); // Debugging: Log the image object
      const dimensions = sizeOf(image.buffer); // Get dimensions of the image
      const width = dimensions.width;
      const height = dimensions.height;

      if (width && height) { // Check if width and height are available
        console.log("Image dimensions:", width, "x", height);

        // Calculate aspect ratio
        const aspectRatio = width / height;

        // Calculate new width and height to fit within the page
        let newWidth, newHeight;
        if (aspectRatio > 1) {
          newWidth = pdfDoc.page.width - 72; // Page width minus 2cm margin on each side (2cm = 72 points)
          newHeight = newWidth / aspectRatio;
        } else {
          newHeight = pdfDoc.page.height - 72;
          newWidth = newHeight * aspectRatio;
        }

        // Start a new page for each image
        if (index > 0) {
          pdfDoc.addPage();
        }

        // Calculate position to center the image
        const x = (pdfDoc.page.width - newWidth) / 2;
        const y = (pdfDoc.page.height - newHeight) / 2;

        pdfDoc.image(image.buffer, x, y, { width: newWidth, height: newHeight });
      } else {
        console.error(`Image ${index + 1} dimensions not found.`);
      }
    });

    // Generate PDF
    pdfDoc.on('data', chunk => {
      pdfBufferArray.push(chunk);
    });

    pdfDoc.on('end', () => {
      const pdfBuffer = Buffer.concat(pdfBufferArray);
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="converted.pdf"'
      });
      res.send(pdfBuffer);
    });

    pdfDoc.end();
  } catch (error) {
    console.error('Error converting images to PDF:', error);
    res.status(500).send('Error converting images to PDF');
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
