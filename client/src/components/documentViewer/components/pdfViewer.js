import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Redirect, withRouter} from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import axios from 'axios';

import {AWS_BASE_URL} from '../../../config';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
 
class PDFViewer extends Component {
  
  state = {
    numPages: null,
    pageNumber: 1,
  }
 
  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }
 
  render() {
    const { pageNumber, numPages } = this.state;
    const imgUrl = AWS_BASE_URL+this.props.match.params.id;
    console.log(imgUrl);

    return (
      <div>
        <Document
          file={imgUrl}
          onLoadSuccess={this.onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>Page {pageNumber} of {numPages}</p>
      </div>
    );
  }
}

// const mapStateToProps = (state) =>{
//   return {auth:state.auth, 
//     documents: state.documents}
// }


// export default withRouter(connect(mapStateToProps)(PDFViewer))
export default PDFViewer;