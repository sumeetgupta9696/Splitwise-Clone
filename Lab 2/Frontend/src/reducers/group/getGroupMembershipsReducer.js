import { GET_GROUP_MEMBERSHIPS } from '../../actions/constant-types';

const initState = {
  groupMemberships: {},
};

const getGroupMembershipsReducer = (state = initState, action) => {
  console.log("-------action.payload---------", action.payload)
  switch (action.type) {
    case GET_GROUP_MEMBERSHIPS:
      return {
        ...state,
        groupMemberships: action.payload,
      };
    default:
      return state;
  }
};

export default getGroupMembershipsReducer;
