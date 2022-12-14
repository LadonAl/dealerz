import _ from "underscore";
import { Category, Product } from "../models";
import { makeRequest, Params } from "../util/makeRequest";
import { applyFiltersToProducts, getPaginatedProducts, products, sortProducts } from "../util/productDummy";

export type GetCategories = () => Promise<Category[]>;
export const getCategories: GetCategories = function makeARequestOnTheProductsModelToFetchAllCategories() {
  return makeRequest("products", ["categories"]) as Promise<Category[]>;
};

export type GetProducts = (params?: Params) => Promise<Product[]>;
// export const getProducts: GetProducts = function makeARequestOnTheProductsModelToFetchAllProductsWithinACertainRange(params) {
//   return makeRequest("products", [], params) as Promise<Product[]>;
// };

export const getProducts: GetProducts = function dummySinceAPIDoesNotProvidePagination(params) {
  let productsToProcess = products.slice(); // deep copy is needed here

  if (!params) return Promise.resolve(productsToProcess);

  productsToProcess = sortProducts(productsToProcess, params);
  productsToProcess = applyFiltersToProducts(productsToProcess, params);
  return Promise.resolve(getPaginatedProducts(productsToProcess, params));
};

export type GetCategoryProducts = (category: Category, params?: Params) => Promise<Product[]>;
// export const getCategoryProducts: GetCategoryProducts = function makeARequestOnTheProductsModelToFetchAllProductsInACertainCategory(category, params) {
//   if (!category) {
//     return getProducts(params);
//   }
//   return makeRequest("products", [`category/${category}`], params) as Promise<Product[]>;
// };

export const getCategoryProducts: GetCategoryProducts = function dummySinceAPIDoesNotProvidePagination(category, params) {
  if (!category) {
    return getProducts(params);
  }

  let productsToProcess = products.filter((product) => product.category === category);

  if (!params) return Promise.resolve(productsToProcess);

  productsToProcess = sortProducts(productsToProcess, params);
  productsToProcess = applyFiltersToProducts(productsToProcess, params);
  return Promise.resolve(getPaginatedProducts(productsToProcess, params));
};

export type GetProduct = (id: number | string) => Promise<Product>;
// export const getProduct: GetProduct = function makeARequestOnTheProductsModelToFetchASingleProductGivenItsID(id) {
//   return makeRequest("products", [id + ""]) as Promise<Product>;
// };

export const getProduct: GetProduct = function dummySinceAPIDoesNotProvidePagination(id) {
  return Promise.resolve(products.find((product) => product.id === Number(id)) as Product);
};

export async function getProductStats(category: string, params: Params): Promise<{ count: number; min: number; max: number }> {
  // we should not offset here
  let productsToProcess = products.filter((product) => !category || product.category === category);
  productsToProcess = sortProducts(productsToProcess, params);
  productsToProcess = applyFiltersToProducts(productsToProcess, params);

  const prices = productsToProcess.map((product) => product.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const count = prices.length;
  return { min, max, count };
}
