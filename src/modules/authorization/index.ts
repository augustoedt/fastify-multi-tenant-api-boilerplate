interface Authorization {
  role: string;
  create: Record<string, boolean>;
  read: Record<string, boolean>;
  update: Record<string, boolean>;
  delete: Record<string, boolean>;
}

class AuthorizationModule {
  constructor(private auth: Authorization | null | undefined) {
    if (!auth) {
      this.auth = {
        role: "",
        create: {},
        read: {},
        update: {},
        delete: {},
      };
    }
  }

  static createRole(role: string) {
    const auth: Authorization = {
      role,
      create: {},
      read: {},
      update: {},
      delete: {},
    };

    return new AuthorizationModule(auth);
  }

  can(action: keyof Authorization, resource: string) {
    return (this.auth[action] as Record<string, boolean>)[resource];
  }

  read(resource: string) {
    this.putAction("read", resource);
  }

  create(resource: string) {
    this.putAction("create", resource);
  }

  update(resource: string) {
    this.putAction("update", resource);
  }

  delete(resource: string) {
    this.putAction("delete", resource);
  }

  all(resource: string) {
    this.read(resource);
    this.create(resource);
    this.update(resource);
    this.delete(resource);
  }

  putAction(action: keyof Authorization, resource: string) {
    (this.auth[action] as Record<string, boolean>)[resource] = true;
  }
}
