import React from 'react';
import {connect} from 'react-redux'
import './documentViewer.css';
import '../../../containers/dashboard/dashboard';
import { fetchDocuments } from '../action/fetch-documents';
import { Link } from 'react-router-dom'

export class DocumentViewer extends React.Component {

  componentDidMount(){
    this.props.fetchDocuments();
  }

  render(){
    const { documents } = this.props;
    return (
      <div>
        <p>Document Data</p>
        { documents && documents.map(document => (
          <div>
            <h1>Title: <Link to={`/document/${document.id}`}>{document.documentName}</Link></h1>
          </div>
        ))}
      </div>
      )
  }

}

const mapStateToProps = (state) =>{
  return {auth:state.auth, documents: state.documents}
}
const mapDispatchToProps = (dispatch) => {
  return {fetchDocuments: () => { // this.props.fetchDocuments
    dispatch(fetchDocuments())
  }}
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentViewer)

