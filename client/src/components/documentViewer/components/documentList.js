import React from 'react';
import {connect} from 'react-redux'
import './documentList.css';
import '../../../containers/dashboard/dashboard';
import { fetchDocuments } from '../action/fetch-documents';
import { Link } from 'react-router-dom'

export class DocumentList extends React.Component {

  componentDidMount(){
    this.props.fetchDocuments();
  }

  render(){
    const { documents } = this.props;
    return (
      <div className="document">
        <p>Document Data</p>
        <ul>
        { documents && documents.map(document => (
          <div key={document.id}>
            <li><h4>Title: <Link to={`/documents/${document.id}`}>{document.documentName}</Link></h4></li>
          </div>
        ))}
        </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(DocumentList)

