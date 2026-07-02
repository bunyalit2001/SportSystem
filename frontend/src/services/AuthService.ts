type UserRole = "member" | "staff";

const isAuthenticatedAs = (role: UserRole) => {
  return Boolean(localStorage.getItem("token")) && localStorage.getItem("role") === role;
};

export { isAuthenticatedAs };
