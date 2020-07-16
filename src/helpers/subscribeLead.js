import axios from 'axios';

export const subscribeLead = (data, listUid, replyTo) => {
  const url = `http://localhost:4001/api/subscribe/${listUid}`;
  const params = {
    listUid,
    replyTo
  }

  return axios.post(url, data, { params }).then(res => res.data);
}