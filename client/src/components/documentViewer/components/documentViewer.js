import React from 'react';
import {connect} from 'react-redux'
import '../../../containers/dashboard/dashboard';
import { fetchDocument} from '../action/fetch-document';
import {API_BASE_URL} from '../../../config';

import { Link } from 'react-router-dom'

export class DocumentViewer extends React.Component {

  componentDidMount(){
    const document = fetchDocument(this.props.match);
    console.log(document)
    // this.props.fetchDocuments();

    // hypothetically getting a document
    // this.props.match.params.id -- id from the URL
  }

  render(){
    const { documents, match } = this.props;
    fetch(`${API_BASE_URL}/documents/${match.params.id}`, {
      method: 'GET',
      headers: {
          'content-type': 'application/json'
    },
    body: JSON.stringify()
  })
  //   .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(data => {
      console.log('DATA:', data)
    })
    .catch(err => {
        const {reason, message, location} = err;
       
      })

   
    
    return (
      <div>
        <p>Document Data</p>
          <div>
            <h3>{match.params.id}</h3>
            <h3>{documents}</h3>
          </div>
        <ul>

        </ul>
      </div>
      )
  }

}

const mapStateToProps = (state) =>{
  return {auth:state.auth, documents: state.documents}
}

export default connect(mapStateToProps)(DocumentViewer)

