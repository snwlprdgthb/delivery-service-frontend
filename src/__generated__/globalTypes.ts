/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum UserRole {
  Client = "Client",
  Delivery = "Delivery",
  Owner = "Owner",
}

export enum odrerStatus {
  Cooked = "Cooked",
  Cooking = "Cooking",
  Delivered = "Delivered",
  Pending = "Pending",
  PickedUp = "PickedUp",
}

export interface CreateAccountInput {
  email: string;
  password: string;
  role: UserRole;
}

export interface CreateOrderInput {
  restaId: number;
  items: CreateOrderItemInput[];
}

export interface CreateOrderItemInput {
  dishId: number;
  options?: OrderItemOptionInputType[] | null;
}

export interface CreateRestaurantInput {
  name: string;
  bgImg: string;
  adress?: string | null;
  categoryName: string;
}

export interface DishChoiceInputType {
  name: string;
  extra?: number | null;
}

export interface DishOptionsInputType {
  name: string;
  choices?: DishChoiceInputType[] | null;
  extra?: number | null;
}

export interface EditOrderInput {
  id: number;
  status: odrerStatus;
}

export interface EditProfileInput {
  email?: string | null;
  password?: string | null;
}

export interface GetOrderInput {
  id: number;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface MyRestaurantInput {
  id: number;
}

export interface OrderItemOptionInputType {
  name: string;
  choice?: string | null;
}

export interface RestaurantsInput {
  page?: number | null;
}

export interface TakeOrderInput {
  id: number;
}

export interface UpdateOrderInput {
  id: number;
}

export interface VerifyEmailInput {
  code: string;
}

export interface createDishInput {
  name: string;
  price: number;
  description: string;
  options?: DishOptionsInputType[] | null;
  restaurantId: number;
}

export interface findCategInput {
  page?: number | null;
  slug: string;
}

export interface getRestaByIdInput {
  id: number;
}

export interface getRestaByQueryInput {
  page?: number | null;
  query: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
