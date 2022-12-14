import { User } from "../models";
import { makeRequest } from "../util/makeRequest";

export type GetUser = (id: number | string) => Promise<User>;
export const getUser: GetUser = function makeARequestOnTheUsersModelToFetchASingleUserGivenItsID(id) {
  return makeRequest("users", [id + ""]) as Promise<User>;
};
