import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {awsUpload} from '../action/awsUpload';
import Input from './input';
import {required, nonEmpty} from '../../../validators';
import './documents.css';
import '../../../containers/dashboard/dashboard';

export class DocumentForm extends React.Component {
    onSubmit(values) {
      const {documentName, notes, healthProviderName, documentSelector} = values;
      // const document = {documentName, notes, healthProviderName, documentSelector};
      const documentUpload = {documentName, notes, healthProviderName, documentSelector};
      return this.props
          .dispatch(awsUpload(documentUpload))
          // .then(() => this.props.dispatch(login(username, password)));
        // event.preventDefault(
        //   //dispatch props!!   return this.props.dispatch(
        // );
    }
    render() {
      // let error;
      // if (this.props.error) {
      //     error = (
      //         <div className="form-error" aria-live="polite">
      //             {this.props.error}
      //         </div>
      //     );
      // }
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
                  <ul>
                  <label htmlFor="documentSelector">Document:</label>
                  <input type="file"></input>
                  {/* <Field
                    name="documentSelector" 
                    component="input" 
                    type="file" 
                    value={null} /> */}
                  </ul>
                </li>
                <button disabled={this.props.pristine || this.props.submitting}>
                    Add
                </button>
                {/* <button type="button">Cancel</button> */}
            </form>  
        );
    }
}

export default reduxForm({
  form: 'documentform',
  onSubmitFail: (errors, dispatch) => dispatch(focus('documentName', 'healthProviderName'))
})(DocumentForm);
// export default requiresLogin()(connect(mapStateToProps)(Dashboard));
