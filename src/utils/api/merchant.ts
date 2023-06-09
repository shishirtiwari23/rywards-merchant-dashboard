import { API_MERCHANT } from "./config";

export async function addMerchant(data: any) {
  return await API_MERCHANT.post("/signup", data);
}
