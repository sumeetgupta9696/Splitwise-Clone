import axios from 'axios';
import { RECENT_ACTIVITY } from '../constant-types';
import apiHost from '../../apiHost';

const getRecentActivity = () => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common.authorization = localStorage.getItem('idToken');
  axios.get(`${apiHost}/api/user/recentactivity`)
    .then((response) => response.data.groupDetails)
    .then((recentactivity) => dispatch({
      type: RECENT_ACTIVITY,
      payload: recentactivity,
    }))
    .catch((error) => dispatch({
      type: RECENT_ACTIVITY,
      payload: error.response.data,
    }));
};

export default getRecentActivity;
