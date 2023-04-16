import { ApiResponse } from "../types/ApiResponse";
import { User } from "../types/User";

const GET_USERS_URL = `https://jsonplaceholder.typicode.com/users`;

export async function getUsers(): Promise<ApiResponse<User[]>> {
  const res = await fetch(GET_USERS_URL);

  if (!res.ok) {
    throw new Error(`Failed to get users`);
  }
  const data = await res.json();

  return {
    data,
    res,
  };
}
