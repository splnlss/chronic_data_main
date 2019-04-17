import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, focus} from 'redux-form';
import {editDocument} from '../action/edit-document';
import Input from './input';
import {required, nonEmpty} from '../../../validators';
import './documents.css';
import '../../../containers/dashboard/dashboard';

export class DocumentEdit extends React.Component {
  state = {document:null}

  componentDidMount(){
  const { documents, match } = this.props;
  const document = documents.find( doc => doc.id === match.params.id );
 }

  onSubmit(values) {
  const {documentName, notes, healthProviderName} = values;
  const {username} = this.props.auth.currentUser;
  const documentUpload = {documentName, notes, healthProviderName, username};
  console.log(documentUpload);
  return this.props
      .dispatch(editDocument(documentUpload))
  }
  render() {
 
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

const mapStateToProps = (state) =>{
return {auth:state.auth}
}



export default reduxForm({
  form: 'documentform',
  onSubmitFail: (errors, dispatch) => dispatch(focus('documentName', 'healthProviderName'))
})(connect(mapStateToProps)(DocumentEdit));
