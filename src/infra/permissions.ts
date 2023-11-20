export const ALL_PERMISSIONS = [
  // users
  "users:roles:write", // Allowed to add a role to a user
  "users:roles:delete", // Allowed to remove a role from a user

  // roles
  "roles:write",

  // some logic data
  "data:write",
  "data:read",
  "data:delete",
  "data:edit-own",
] as const;

export const ALL_USER_PERMISSIONS = {
  role: "users",
  read: {
    users: true,
    roles: true,
  },
  update: {
    users: true,
    roles: true,
  },
  delete: {
    users: true,
    roles: true,
  },
  create: {
    users: true,
    roles: true,
  },
};

export const PERMISSIONS = ALL_PERMISSIONS.reduce(
  (acc, permission) => {
    acc[permission] = permission;

    return acc;
  },
  {} as Record<
    (typeof ALL_PERMISSIONS)[number],
    (typeof ALL_PERMISSIONS)[number]
  >,
);

export const USER_ROLE_PERMISSIONS = [
  PERMISSIONS["data:write"],
  PERMISSIONS["data:read"],
];

export const SYSTEM_ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  APPLICATION_USER: "APPLICATION_USER",
};
