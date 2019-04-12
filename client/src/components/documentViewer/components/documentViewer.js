import React from 'react';
import {connect} from 'react-redux'
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
    .then(document => {    //how to convert this to useable format??
        this.setState({document:document})
      })
      .catch(err => {
          const {reason, message, location} = err;
        
        })
      // const document = fetchDocument(this.props.match);
      // this.props.fetchDocuments();

      // hypothetically getting a document
      // this.props.match.params.id -- id from the URL
    }
  }

  delete(){
    //handle delete and js popup
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
                  <p>edit</p>
                  <p>delete</p> 
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

export default connect(mapStateToProps)(DocumentViewer)

