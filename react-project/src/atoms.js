import { atom } from "recoil";

export const loggedInState = atom({
  key: "loggedInState",
  default: false,
});

export const userState = atom({
  key: "userState",
  default: null,
});

export const shelvesState = atom({
  key: "shelvesState",
  default: [],
});
