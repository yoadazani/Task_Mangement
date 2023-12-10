export interface ErrorResponse {
    status: "error"
    error: string
}

export interface SuccessResponse {
    status: "success"
    message: string
}