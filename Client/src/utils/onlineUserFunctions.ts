
export function AddOnlineUser(onlineUser: string[], user: string): string[] {
  const result: string[] = [...onlineUser, user];
  return result;
}
export function RemoveOnlineUser(onlineUser: string[], user: string): string[] {
  return onlineUser.filter((u) => u !== user);
}