import {SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../../../config';
import {normalizeResponseErrors} from './utils';

export const awsUpload = documentUpload => dispatch => {
    console.log(documentUpload)
  return fetch(`${API_BASE_URL}/documents`, {
      method: 'POST',
      headers: {
          'content-type': 'application/json'
      },
      body: JSON.stringify(documentUpload)
  })
      .then(res => normalizeResponseErrors(res))
      .then(res => res.json())
      .catch(err => {
          const {reason, message, location} = err;
          if (reason === 'ValidationError') {
              // Convert ValidationErrors into SubmissionErrors for Redux Form
              return Promise.reject(
                  new SubmissionError({
                      [location]: message
                  })
              );
          }
      });
};