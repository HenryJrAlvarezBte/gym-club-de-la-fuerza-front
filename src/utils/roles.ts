export type Role = "usuario" | "profesor" | "admin";

export const rolePermissions = {
  usuario: ["view_routines"],
  profesor: ["view_routines", "create_routines", "edit_routines"],
  admin: ["view_routines", "create_routines", "edit_routines", "delete_routines"],
};
