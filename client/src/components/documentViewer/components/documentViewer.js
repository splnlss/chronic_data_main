import React from 'react';
import {connect} from 'react-redux'
import {Redirect, withRouter} from 'react-router-dom';

import '../../../containers/dashboard/dashboard';
import {API_BASE_URL} from '../../../config';

import { Link } from 'react-router-dom'

export class DocumentViewer extends React.Component {
  state = {document:null}

  componentDidMount(){
  const { documents, match } = this.props;
  const document = documents.find( doc => doc.id === match.params.id );
  if(!document){
    fetch(`${API_BASE_URL}/documents/${match.params.id}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
      },
      body: JSON.stringify()
      })
    //   .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(document => {
        this.setState({document:document})
      })
      .catch(err => {
          const {reason, message, location} = err;
        
        })
    }
  }

  editHandler = (documentID) => {
    this.props.history.push(`/documents/edit/${documentID}`);
  }

  deleteHandler = () => {
    const { match } = this.props;
    fetch(`${API_BASE_URL}/documents/${match.params.id}`, {
      method: 'Delete',
      headers: {
          'content-type': 'application/json'
    },
    body: JSON.stringify()
    })
    .then(responses  => {
      console.log("delete:" + responses)
    })
    .then(()=>{
      this.props.history.push('/Dashboard/Documents');
    }
    )
  }

  render(){
  
    let {document} = this.state;
    const {documents, match} = this.props;
    if(!document){
      document = documents.find( doc => doc.id === match.params.id );
    }
    return (
      <div>
        <p>Document Data</p>
          <div>
            <h3>{document ? document.documentName : ''}</h3>
            {document ? 
                <div className="Document">
                  <div className="Edit">
                    <p>
                      {/* <button onClick={this.editHandler(document.id)}>Edit</button> */}
                      <Link to={`/documents/edit/${document.id}`} component="button"><button type="button">Edit</button></Link>
                      <button onClick={ () => {
                         if(window.confirm('Are you sure you want to delete this document?')){
                           this.deleteHandler()
                          }}}>Delete</button></p> 
                  </div>
                  <p>Health Provider: {document.healthProviderName}</p>
                  <p>Notes: {document.notes}</p>
                </div>
              : ''}
          </div>
        <ul>

        </ul>
      </div>
      )
  }

}

const mapStateToProps = (state) =>{
  return {auth:state.auth, 
    documents: state.documents}
}

export default withRouter(connect(mapStateToProps)(DocumentViewer))

