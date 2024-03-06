import React from 'react'
import './cards.css'
import { Link } from 'react-router-dom'

function Cards(props) {
  return (
    <>
    <div className='container-card'>
      <div className={`heading ${props.mode}`}>
    <h3>
    Every tool you need to work with PDFs in one place
Every tool you need to use PDFs, at your fingertips. All are 100% FREE and easy to use! Merge, split, compress, convert, rotate, unlock and watermark PDFs with just a few clicks.
    </h3>
    </div>
    <div className="cards">
      <div className={`outer-${props.mode}`}>
        <div className="image"><img src="https://cdn.investintech.com/wp-content/uploads/2018/10/converting-jpeg-to-pdf.png" alt="jpg to pdf" /></div>
        <div className="content">
          <h4>IMG TO PDF</h4>
          <p>A tool that converts your images to pdf in seconds</p>
        </div>
        <Link to="/jpgtopdf"><div className="button"><button type="button">IMG To PDF</button></div></Link>
      </div>
      <div className={`outer-${props.mode}`}>
        <div className="image"><img src="https://www.webproeducation.org/wp-content/uploads/2020/09/merge-pdf-online.png" alt="jpg to pdf" /></div>
        <div className="content">
          <h4>MERGE PDF</h4>
          <p>A tool that merge the pdf in seconds</p>
        </div>
        <Link to="/merge"><div className="button"><button type="button">Merge Pdf</button></div></Link>
      </div>
      <div className={`outer-${props.mode}`}>
        <div className="image"><img src="https://th.bing.com/th/id/R.c7327d38d7ea9a0423fa1ef72fa40971?rik=JnuJc99RYyCQMQ&riu=http%3a%2f%2fwww.mydocumentconverter.com%2fpics%2ficon-splitpdf.png&ehk=Sh4HKGLv7cbEQJz1p8t2wZBR2eHCwKx04XIuBBwhrI4%3d&risl=&pid=ImgRaw&r=0" alt="jpg to pdf" /></div>
        <div className="content">
          <h4>Split Pdf</h4>
          <p>A tool that split the pdf in seconds</p>
        </div>
        <Link to="/split"><div className="button"><button type="button">Split PDF</button></div></Link>
      </div>
      <div className={`outer-${props.mode}`}>
        <div className="image"><img src="https://i.ytimg.com/vi/c6u6z41LUos/maxresdefault.jpg" alt="jpg to pdf" /></div>
        <div className="content">
          <h4>Remove Page</h4>
          <p>A tool that converts your images to pdf in seconds</p>
        </div>
        <Link to="/removepage"><div className="button"><button type="button">Remove Page</button></div></Link>
      </div>
    </div>
    </div>
    </>
  )
}

export default Cards