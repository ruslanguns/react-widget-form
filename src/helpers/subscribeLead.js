import axios from 'axios';

export const subscribeLead = (data, listUid, replyTo) => {
  const url = `https://contact-api.iclick.tk/api/subscribe`;
  const params = {
    listUid,
    replyTo
  }

  return axios.post(url, data, { params }).then(res => res.data);
}