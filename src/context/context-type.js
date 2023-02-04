export const user_type = {
  id: "",
  name: "",
  email: "",
  imageUrl: "",
  address: "",
  gander: "",
  status: "",
  role: "",
}
export const context_user = {
  currentUser: user_type,
  isLoggedIn: false,
  token: "",
  login: (token) => {},
  logout: () => {},
}

export const menu_type = {
  id: "",
  packageName: "",
  mainCourse: "",
  salad: "",
  soup: "",
  dessert: "",
  drink: "",
  packageImage: "",
}
export const order_type = {
  id: "",
  orderBy: user_type,
  preparedBy: user_type,
  deliveredBy: user_type,
  mealPackage: menu_type,
  orderOn: "",
  orderStatus: "",
}
