import MainWrapper from "@/components/MainWrapper";
import React from "react";

export default function page() {
  return (
    <MainWrapper className="wrapper pt-5">
      <h3
        id="Overview"
        className="text-2xl font-semibold bg-accent text-white p-1.5 px-7 inline-block rounded-tr-lg rounded-bl-lg"
      >
        Booking and Cancelation Terms & Conditions
      </h3>

      <div
        className="prose"
        dangerouslySetInnerHTML={{
          __html: `<p><strong>Terms and Conditions &nbsp;of Glaciers Treks and Adventure.&nbsp;</strong></p>
                    <p>At Glaciers Trek and Adventure Company, we are looking forward to the great opportunity to become the travel booking agent for all your travel related needs. The below mentioned ,</p>
                    <p>Terms and Condition act as an agreement that help in describing the kind of services expected from us while you make a purchase for all your travel related services through our organization as well as offer obligations as a customer.</p>
                    <p>All the terms We, Us You, our is referred to Glaciers Trek and Adventure Company whereas the terms you are referred to the User or the customer visiting the website for making a travel booking or using the services.</p>
                    <p><strong>1 Booking Rules</strong></p>
                    <p><strong>1.1</strong>&nbsp;By making a booking for a tour you acknowledge that you have read and agree all the terms and conditions, privacy policies and rules. If the booking is made on behalf of any third party you guarantee to have the authority to accept and read all the Terms and Conditions on behalf of the Third party.</p>
                    <p><strong>1.2</strong>&nbsp;In order to make a booking you should be atleast eighteen years of age. You agree to provide complete details about your information to the Tour operator and our in-house travel agents.</p>
                    <p><strong>1.3</strong>&nbsp;All the bookings for various treks offered at Glaciers Trek and Adventure Company is to be made 5 days prior to the beginning of the trek. For every trek, the booking for the group starts before 5 days and it is recommended to make the booking by then.</p>
                    <p><strong>2. Booking Payments</strong></p>
                    <p><strong>2.1</strong>For any kind of Fixed or Customized Trek you are required to make atleast 20% payment at the initial level on the day of booking. Also, 20% of the trek fees has to be paid in advance. Rest of the amount can be paid at the beginning of the Trek as this will ensure the booking in the group.</p>
                    <p><strong>2.2</strong>&nbsp;All the payments can be done through Online Transfer or Cash/Draft as per the convenience and feasibility of the customers.</p>
                    <p><strong>2.3</strong>&nbsp;For any kind of hotel or train related reservations you need to make full payment in advance.</p>
                    <p><strong>3. Special Requirements</strong></p>
                    <p>At the time of booking any kind of special requirements must be disclosed to the tour operators so that all the special requirements can be accommodated at reasonable prices. Though the Tour Operator will take extra effort to help you visit the destinations that you want during the trek but as some parts are in accessible and are not possible for the planned itinerary there might be chances that the requests are not fulfilled.</p>
                    <p>If there are any kind of food-related allergies or restriction that you face you should immediately informed to the Tour Operator during the time of booking. However, the Tour operator cannot 100% assure or guarantee that such kind of dietary requirements can be adjusted. Any kind of special requirements or requests do not suffix under the booking contract and agreement. Neither the Tour Operator can guarantee the accommodation of such kind of special demands and requests.</p>
                    <p><strong>4. Cancellation Policies</strong></p>
                    <p>&middot;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; If any kind of cancellation for the trek is done before 5 days of the beginning of the trek then after a deduction of 10% amount the remaining amount will be refunded.</p>
                    <p>&middot;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Any cancellation of the trek if happened due to natural calamities or floods won&rsquo;t be refunded.</p>
                    <ul>
                    <li>Any kind of refund of payment won&rsquo;t be entertained in the cases where the people having sickness for high altitudes will come return midway from the trek. However, they can be offered a chance to carry out the trek in the next trekking season.</li>
                    </ul>
                    <p>5.&nbsp;<strong>Documents and Medical Certificates</strong></p>
                    <p>It is essential to deposit all the relevant documents and medical certificates prior to the beginning of the trek. Medical Certificates are necessary in order for the Tour Operator to know if the customer is undergoing or facing any kind of medical ailment. Owing to your medical condition the Tour Operator has a full right to deny permission to carry out the trekking expedition with us.</p>
                    <p>Wherever necessary the Tour Operator at GTA has full right to ask for further information on professional medical details in order to check whether you are able to get the better facilities on the trek or not.</p>
                    <p><strong>Mandatory Documents</strong></p>
                    <p>&middot;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Passport size Photograph</p>
                    <p>&middot;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Valid Photo ID</p>
                    <p><strong>Mandatory Documents for Foreign Officials</strong></p>
                    <p>&middot;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Valid Passport</p>
                    <p>&middot;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Visa Details</p>
                    <p>&middot;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Passport Size Photo</p>
                    <p><strong>6. Other Terms and Conditions</strong></p>
                    <p>We are not entitled or responsible for any kind of delay for the trek from your end. We will start the trek at the day and the time mentioned in the travel itinerary provided during the booking. We don&rsquo;t offer any kind of insurance policies incase of theft, damage or loss of property. Visitors are asked to take insurance cover from their home countries.</p>
`,
        }}
      ></div>
    </MainWrapper>
  );
}
