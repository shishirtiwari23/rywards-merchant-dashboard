import { API_ADMIN } from "./config";

export async function getStatistics(data: any) {
  const res = await API_ADMIN.post("/get-stats", data);
  return res.data;
}
export async function addCategory(data: any) {
  const res = await API_ADMIN.post("/add-category", data);
  return res.data;
}
export async function addSubCategory(data: any) {
  const res = await API_ADMIN.post("/add-sub-category", data);
  return res.data;
}
export async function addTags(data: any) {
  const res = await API_ADMIN.post("/add-tag", data);
  return res.data;
}
export async function getCategories(data: any) {
  const res = await API_ADMIN.post("/get-categories", data);
  return res.data;
}
export async function getSubCategories(data: any) {
  const res = await API_ADMIN.post("/get-sub-categories", data);
  return res.data;
}
export async function getTags(data: any) {
  const res = await API_ADMIN.post("/get-tags", data);
  return res.data;
}
