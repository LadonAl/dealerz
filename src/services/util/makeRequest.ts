import { isEmpty, pairs } from "underscore";

import { Product, Record } from "../models";

const apiRoot = "https://fakestoreapi.com";

export interface Params {
  limit?: number;
  offset?: number;
  sort?: "desc" | "asc";
  comparePath?: string | string[];
  titleIncludes?: string;
  priceRange?: [number, number];
}

export type MakeRequest = (model: string, subRoutes: string[], params?: Params) => Promise<Record | Record[]>;

export const makeRequest: MakeRequest = async function formatRouteAndParametersAndUseThemToMakeAGetRequestAndHandleErrors(model, subRoutes, params = {}) {
  const subRoutesString = isEmpty(subRoutes) ? "" : `/${subRoutes.join("/")}`;
  const queryString = new URLSearchParams(pairs(params)).toString();
  const recordsRaw = await fetch(`${apiRoot}/${model}${subRoutesString}?${queryString}`);
  const records = await recordsRaw.json();
  return records as Record | Record[];
};
