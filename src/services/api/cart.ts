import { Cart } from "../models";
import { makeRequest } from "../util/makeRequest";

export type GetCart = (user_id: number | string) => Promise<Cart>;
export const getCart: GetCart = async function makeARequestOnTheCartsModelToFetchASingleCartGivenItsUserId(user_id) {
  const carts = (await makeRequest("carts", ["user", user_id + ""], { sort: "desc", limit: 1 })) as Cart[];
  return carts[0] as Cart;
};
