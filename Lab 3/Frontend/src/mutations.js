import { gql } from "@apollo/client";

const loginHandler = gql`
  mutation loginHandler($email: String, $password: String) {
    loginHandler(email: $email, password: $password) {
      name,
      email,
      phone,
      language,
      currency,
      timezone,
      image,
      _id,
      message,
      status,
    }
  }
`;

const signUpHandler = gql`
  mutation signUpHandler($name: String, $email: String, $password: String) {
    signUpHandler(email: $email, password: $password, name: $name) {
      name,
      email,
      phone,
      language,
      currency,
      timezone,
      image,
      _id,
      status,
      message,
    }
  }
`;

const updateProfileHandler = gql`
  mutation updateProfileHandler($email: String) {
    updateProfileHandler(email: $email) {
      _id,
      status,
      message,
    }
  }
`;

const addcommenthandler = gql`
  mutation addcommenthandler($billid: String, $email: String, $comment: String) {
    addcommenthandler(email: $email, billid: $billid, comment: $comment) {
      status,
      message,
    }
  }
`;

const addExpenseHandler = gql`
  mutation addExpenseHandler($email: String, $groupname: String, $description: String, $billAmount: Float) {
    addExpenseHandler(email: $email, groupname: $groupname, description: $description, billAmount: $billAmount ) {
      status,
      message,
    }
  }
`;

const createGroupHandler = gql`
mutation createGroupHandler($groupName: String, $email: String, $invitedMembers: List) {
  createGroupHandler(groupName: $groupName, email: $email, invitedMembers: $invitedMembers) {
      message,
      status,
    }
  }
`;

const acceptInviteHandler = gql`
mutation acceptInviteHandler($groupName: String, $email: String) {
    acceptInviteHandler(groupName: $groupName, email: $email) {
      message,
      status,
    }
  }
`;

const rejectInviteHandler = gql`
mutation rejectInviteHandler($groupName: String, $email: String) {
    rejectInviteHandler(groupName: $groupName, email: $email) {
      message,
      status,
    }
  }
`;

const leaveGroupHandler = gql`
mutation leaveGroupHandler($groupName: String, $email: String) {
  leaveGroupHandler(groupName: $groupName, email: $email) {
      message,
      status,
    }
  }
`;

export {
  loginHandler,
  signUpHandler,
  updateProfileHandler,
  addcommenthandler,
  addExpenseHandler,
  createGroupHandler,
  acceptInviteHandler,
  rejectInviteHandler,
  leaveGroupHandler,
};
