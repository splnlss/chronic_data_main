import React from 'react';
import {connect} from 'react-redux'
import '../../../containers/dashboard/dashboard';
import { Link } from 'react-router-dom'

export class DocumentViewer extends React.Component {

  componentDidMount(){
    // this.props.fetchDocuments();

    // hypothetically getting a document
    // this.props.match.params.id -- id from the URL
  }

  render(){
    const { documents, match } = this.props;

    // match.params.id
    
    return (
      <div>
        <p>Document Data</p>
          {/* <div>
            <h3>{documents}</h3>
          </div> */}
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

