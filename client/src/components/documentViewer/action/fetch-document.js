import {API_BASE_URL} from '../../../config';
// import {normalizeResponseErrors} from './utils';

export const fetchDocument = () => (DocumentID) => {

    console.log('START fetch')
    fetch(`${API_BASE_URL}/documents/${DocumentID}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
      },
      body: JSON.stringify()
    })
    //   .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(data => {
        // console.log('DATA:', data)
      })
    .catch(err => {
          const {reason, message, location} = err;
         
        })
}
