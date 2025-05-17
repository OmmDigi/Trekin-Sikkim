import axios from "axios";
import crypto from "crypto-js";
import { PaymentResponse } from "../types";

interface ICreateOrderPayload {
  merchantUserId: string;
  mobileNumber: string;
  amount: number;
  merchantTransactionId: string;
  redirectUrl: string;
  redirectMode: "POST" | "GET";
  paymentInstrument: object;
}

interface ICreateOrderResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    merchantId: string;
    merchantTransactionId: string;
    instrumentResponse: {
      type: string;
      redirectInfo: {
        url: string;
        method: "POST" | "GET";
      };
    };
  };
}

export class PhonePe {
  private MERCHANT_KEY: string | null = null;
  private MERCHANT_ID: string | null = null;
  private PHONEPE_MERCHANT_BASE_URL: string | null = null;
  private PHONEPE_MERCHANT_STATUS_URL: string | null = null;

  constructor(
    merchant_key: string,
    merchant_id: string,
    merchant_base_url: string,
    merchant_status_url: string
  ) {
    if (merchant_key === "") throw new Error("merchant_key is required");
    if (merchant_id === "") throw new Error("merchant_id is required");
    if (merchant_base_url === "")
      throw new Error("merchant_base_url is required");
    if (merchant_status_url === "")
      throw new Error("merchant_status_url is required");

    this.MERCHANT_KEY = merchant_key;
    this.MERCHANT_ID = merchant_id;
    this.PHONEPE_MERCHANT_BASE_URL = merchant_base_url;
    this.PHONEPE_MERCHANT_STATUS_URL = merchant_status_url;
  }

  createOrder = async (
    paymentPayload: ICreateOrderPayload
  ): Promise<ICreateOrderResponse> => {
    if (this.MERCHANT_KEY === null)
      throw new Error("PHONEPE_MERCHANT_KEY is required");
    if (this.PHONEPE_MERCHANT_BASE_URL === null)
      throw new Error("PHONEPE_MERCHANT_BASE_URL is required");

    const newPaymentPayload = {
      merchantId: this.MERCHANT_ID,
      ...paymentPayload,
    };

    const payload = Buffer.from(JSON.stringify(newPaymentPayload)).toString(
      "base64"
    );
    const keyIndex = 1;
    const string = payload + "/pg/v1/pay" + this.MERCHANT_KEY;
    crypto.SHA256(string);
    // const sha256 = crypto.createHash('sha256').update(string).digest('hex')
    const sha256 = crypto.SHA256(string).toString();
    const checksum = sha256 + "###" + keyIndex;

    const axiosOptions = {
      method: "POST",
      url: this.PHONEPE_MERCHANT_BASE_URL,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
      },
      data: {
        request: payload,
      },
    };

    const response = await axios.request(axiosOptions);
    // return response.data.data.instrumentResponse.redirectInfo.url;
    return response.data;
  };

  checkStatus = async (
    merchantTransactionId: string
  ): Promise<PaymentResponse> => {
    if (this.MERCHANT_KEY === null)
      throw new Error("PHONEPE_MERCHANT_KEY is required");
    if (this.MERCHANT_ID === null) throw new Error("MERCHANT_ID is required");
    if (this.PHONEPE_MERCHANT_STATUS_URL === null)
      throw new Error("PHONEPE_MERCHANT_STATUS_URL is required");

    const keyIndex = 1;
    const string = `/pg/v1/status/${this.MERCHANT_ID}/${merchantTransactionId}` +this.MERCHANT_KEY;
    // const sha256 = crypto.createHash('sha256').update(string).digest('hex')
    const sha256 = crypto.SHA256(string).toString();
    const checksum = sha256 + "###" + keyIndex;

    const option = {
      method: "GET",
      url: `${this.PHONEPE_MERCHANT_STATUS_URL}/${this.MERCHANT_ID}/${merchantTransactionId}`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
        "X-MERCHANT-ID": this.MERCHANT_ID,
      },
    };

    return (await axios.request(option)).data;
  };
}
