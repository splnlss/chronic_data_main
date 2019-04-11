import {API_BASE_URL} from '../../../config';
// import {normalizeResponseErrors} from './utils';

export const SET_DOCUMENTS = 'SET_DOCUMENTS';
export const fetchDocuments = () => (dispatch) => {

    //  dispatch({type:"START_CALL"})
    
    console.log('START fetch')
    fetch(`${API_BASE_URL}/documents`, {
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
        //  dispatch({type:"END_CALL"})
        dispatch({type:SET_DOCUMENTS, payload: data})
      })
      .catch(err => {
          const {reason, message, location} = err;
         
        })
}
