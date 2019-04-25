import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, focus} from 'redux-form';
// import {Button, Icon} from 'semanitc-ui-react';
import {submitDocument} from '../action/submit-document';
import Input from './input';
import {API_BASE_URL} from '../../../config'
import axios from 'axios';
import {required, nonEmpty} from '../../../validators';
import './documents.css';
import '../../../containers/dashboard/dashboard';

export class DocumentForm extends React.Component {
    constructor(props){
      super(props);
      this.fileInputEl = React.createRef();
    }
    onSubmit(values) {
      const {documentName, notes, healthProviderName, documentFile} = values;
      const {username} = this.props.auth.currentUser;
      const documentUpload = {documentName, notes, healthProviderName, documentFile, username};

      //uploading imagefile to aws
      let formData = new FormData();
      const imagefile = this.fileInputEl.current.files[0];
      console.log(imagefile);
      formData.append("image", imagefile);
      console.log(formData);

      axios.post(`${API_BASE_URL}/aws/image-upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
      })
      .then((results)=>{
        console.log(results.data.imageUrl)
      })
      .catch((err)=>{
        console.log(err)
      })
      // attach results.data.image.Url to documentUpload

      return this.props
          .dispatch(submitDocument(documentUpload))
          .then(() =>{
            console.log("dispatch submitted")
          })
          .then(()=>{
            this.props.history.push('/Dashboard/Documents');
          })
        //   .then(() => this.props.dispatch(login(username, password)));
        // event.preventDefault(
          //dispatch props!!   return this.props.dispatch(
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
         <div className="document">
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
                    <br></br>
                    <Field
                      component="textarea" 
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
                  <label htmlFor="documentFile">Document:</label>
                  <input 
                    ref={this.fileInputEl}
                    id="documentFile"  type="file" name="documentFile"/>
                 
                  </ul>
                </li>
                <button disabled={this.props.pristine || this.props.submitting}>
                    Add
                </button>
                {/* <button type="button">Cancel</button> */}
            </form>  
          </div>
        );
    }
}

const mapStateToProps = (state) =>{
  return {auth:state.auth}
}

export default reduxForm({
  form: 'documentform',
  onSubmitFail: (errors, dispatch) => dispatch(focus('documentName', 'healthProviderName'))
})(connect(mapStateToProps)(DocumentForm));

// export default requiresLogin()(connect(mapStateToProps)(Dashboard));
