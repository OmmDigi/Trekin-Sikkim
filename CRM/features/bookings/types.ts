export interface AdditionalInformation {
  order_id: string;
  additional_id: number;
  additional_name: string;
  price_inr: number;
  price_usd: number;
}

export interface BookingDate {
  order_id: string;
  from_date: string; // ISO date string
  to_date: string; // ISO date string
}

export interface IBookingDetails {
  order_id: string;
  trip_type: string;
  user_name: string;
  user_contact_number: string;
  user_email: string;
  package_name: string;
  amount: string;
  transactionid: string;
  number_of_person: string;
  additional_information: AdditionalInformation[];
  booking_dates: BookingDate[];
}
