import { gql } from "@apollo/client";

const getProfileHandler = gql`
  query getProfileHandler($email: String) {
    getProfileHandler(email: $email) {
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

const recentactivityHandler = gql`
  query recentactivityHandler($email: String) {
    recentactivityHandler(email: $email) {
      name,
      bills,
      message,
      status,
    }
  }
`;

const getAllUsersHandler = gql`
  query getAllUsersHandler($email: String) {
    getAllUsersHandler(email: $email) {
      name,
      email,
      message,
      status,
    }
  }
`;

const getGroupDetailsHandler = gql`
  query getGroupDetailsHandler($email: String, $groupName: String) {
    getGroupDetailsHandler(email: $email, groupName: $groupName) {
      groupName,
      groupImage,
      members,
      bills,
      message,
      status,
    }
  }
`;

const getGroupInvitesHandler = gql`
  query getGroupInvitesHandler($email: String) {
    getGroupInvitesHandler(email: $email) {
      groupName,
      groupImage,
      message,
      status,
    }
  }
`;

const getGroupMembershipsHandler = gql`
  query getGroupMembershipsHandler($email: String) {
    getGroupMembershipsHandler(email: $email) {
      groupName,
      groupImage,
      message,
      status,
    }
  }
`;

export {
  getProfileHandler,
  recentactivityHandler,
  getAllUsersHandler,
  getGroupDetailsHandler,
  getGroupInvitesHandler,
  getGroupMembershipsHandler,
};
