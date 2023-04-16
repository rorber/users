export interface ApiResponse<T> {
  data: T
  res?: Response
}