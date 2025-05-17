import { Request } from "express";

export interface IError extends Error {
  code?: number;
  message: string;
  statusCode: number;
  isOperational: boolean;
  isCustomError: boolean;
  key?: string;
}

export interface PgError extends Error {
  code?: string; // PostgreSQL error code
  detail?: string; // Additional error details
  hint?: string; // Hint for resolving the error
}

export interface IGAuth {
  access_token: string;
  id_token: string;
}

export interface IGAuthProfile {
  id: string;
  email: string;
  name: string;
  picture: string;
}

export interface IUserToken {
  role: string;
  name: string;
  id: number;
  google_oauth_access_token?: string;
}

export interface CustomRequest extends Request {
  user_info?: IUserToken; // You can type this more specifically (e.g., `{ id: string, role: string }`)
}

// phone pe types

interface PaymentData {
  merchantId: string;
  merchantTransactionId: string;
  transactionId: string;
  amount: number;
  state: string;
  responseCode: string;
  paymentInstrument: PaymentInstrument;
}

interface PaymentInstrument {
  type: string;
  cardType: string;
  bankTransactionId: string | null;
  arn: string;
  authRefId: string;
  bankId: string | null;
  brn: string;
}

export interface PaymentResponse {
  success: boolean;
  code: string;
  message: string;
  data: PaymentData;
}
