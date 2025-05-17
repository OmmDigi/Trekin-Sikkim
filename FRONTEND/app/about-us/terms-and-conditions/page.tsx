import React from "react";

export default function page() {
  return (
    <div className="pt-24 bg-gray-100">
      <div className="min-h-screen py-10 px-4 wrapper">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Terms and Conditions
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            Last updated: April 17, 2025
          </p>

          <p className="text-gray-700 mb-4">
            Welcome to Our Website! These terms and conditions outline the rules
            and regulations for the use of our website.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            1. Acceptance of Terms
          </h2>
          <p className="text-gray-700 mb-4">
            By accessing this website, you agree to be bound by these terms and
            conditions. If you disagree with any part, please do not use our
            website.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            2. License
          </h2>
          <p className="text-gray-700 mb-4">
            Unless otherwise stated, we own the intellectual property rights for
            all content on the website. You may use content for personal use,
            but you must not:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Republish material from the website</li>
            <li>Sell, rent or sub-license material</li>
            <li>Reproduce or copy material for commercial purposes</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            3. User Comments
          </h2>
          <p className="text-gray-700 mb-4">
            Certain parts of this website offer users the opportunity to post
            comments. We do not filter, edit, or review comments before they
            appear. Comments do not reflect our views.
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            4. Changes
          </h2>
          <p className="text-gray-700 mb-4">
            We reserve the right to revise these terms at any time. By using
            this website, you are expected to review these terms regularly.
          </p>

          <p className="text-gray-700">
            If you have any questions about these Terms and Conditions, please
            contact us.
          </p>
        </div>
      </div>
    </div>
  );
}
