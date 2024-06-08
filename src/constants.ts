export enum Roles {
  CUSTOMER = "customer",
  ADMIN = "admin",
  MANAGER = "manager",
}

export function getOrder(order: string) {
  return order == "asc" ? 1 : -1;
}
