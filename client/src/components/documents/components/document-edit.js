import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, focus} from 'redux-form';
import {editDocument} from '../action/edit-document';
import Input from './input';
import {Redirect} from 'react-router-dom'
import {required, nonEmpty} from '../../../validators';
import './documents.css';
import '../../../containers/dashboard/dashboard';

export class DocumentEdit extends React.Component {
  //state = {document:null}

//   componentDidMount(){
//     const { documents, match } = this.props;
//     if(!documents || !documents.length){
//       // redirect somewhere
//       console.log('redirect')
//       this.props.history.push('/Dashboard/Documents');
//       return;
//     }
//     const document =  documents.find( doc => doc.id === match.params.id );
//  }

  onSubmit(values) {
    const {documentName, notes, healthProviderName} = values;
    const {username} = this.props.auth.currentUser;
    const { id } = this.props.match.params;
    const documentUpload = {documentName, notes, healthProviderName, username};
    console.log(documentUpload);
    return this.props
        .dispatch(editDocument(id, documentUpload))
  }
  render() {
    const { documents, match } = this.props;
    if(!documents || !documents.length){
       
      return <Redirect to="/Dashboard/Documents" />;
    }
  return (
        <form className="document-form" onSubmit={this.props.handleSubmit(values =>
          this.onSubmit(values)
      )}>
            <li>
            <ul>
                <label htmlFor="documentName">Document Name:</label>
                <Field
                  component={Input}
                  type="text"
                  name="documentName"
                  id="documentName"
                  value={document.documentName}
                  validate={[required, nonEmpty]}
                />
              </ul>
              <ul>
                <label htmlFor="notes">Notes:</label>
                <Field
                  component={Input}
                  type="text"
                  name="notes"
                  id="notes"
                  value={document.notes}
                  validate={[]}
                />
              </ul>
              <ul>
                <label htmlFor="healthProviderName">Health Provider:</label>
                <Field
                  component={Input}
                  type="text"
                  name="healthProviderName"
                  id="healthProviderName"
                  value={document.healthProviderName}
                  validate={[required, nonEmpty]}
                />
              </ul>
              {/* <ul>
              <label htmlFor="documentFile">Document:</label>
              <input id="documentFile"  type="file" name="documentFile"></input>
             
              </ul> */}
            </li>
            <button disabled={this.props.pristine || this.props.submitting}>
                Add
            </button>
            {/* <button type="button">Cancel</button> */}
        </form>  
    );
  }
}

const mapStateToProps = (state, ownProps) =>{

  const { match } = ownProps; // <- component props
  const { documents } = state;

  // console.log('mapStateToProps', { documents, match })
  if(!documents || !documents.length){
      return {};
    }
  const document =  documents.find( doc => doc.id === match.params.id );
  return {
    documents:state.documents,
    auth:state.auth,
    initialValues: document
  }
}

export default connect(mapStateToProps)(reduxForm({
  form: 'documentform',
  onSubmitFail: (errors, dispatch) => dispatch(focus('documentName', 'healthProviderName'))
})(DocumentEdit))




// export default reduxForm({
//   form: 'documentform',
//   onSubmitFail: (errors, dispatch) => dispatch(focus('documentName', 'healthProviderName'))
// })(connect(mapStateToProps)(DocumentEdit));
