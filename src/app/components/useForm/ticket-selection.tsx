/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { TicketFormData } from "@/types";

interface FormStep1Props {
  formData: TicketFormData;
  updateFormData: any;
  errors?: any;
}

const FormStep1: React.FC<FormStep1Props> = ({
  formData,
  updateFormData,
  errors,
}) => {
  const tickets = [
    {
      type: "REGULAR" as const,
      label: "REGULAR ACCESS",
      price: 0,
      remaining: 20,
      capacity: 52,
    },
    {
      type: "VIP" as const,
      label: "VIP ACCESS",
      price: 50,
      remaining: 20,
      capacity: 52,
    },
    {
      type: "VVIP" as const,
      label: "VVIP ACCESS",
      price: 150,
      remaining: 20,
      capacity: 52,
    },
  ];

  const handleTicketTypeChange = (type: string, price: number) => {
    updateFormData({ ticketType: type, price });
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFormData({ quantity: Number(e.target.value) });
  };

  return (
    <div className="space-y-6 ">
      <div className="bg-[radial-gradient(ellipse_at_top_left,_#07373F_0%,_#0A0C11_140%)] rounded-lg p-4 md:p-6 text-center border border-slate-600">
        <div className="md:px-8">
          <h1 className=" text-4xl md:text-7xl font-roadRage mb-2">
            Techember Fest &apos;&apos;25
          </h1>
          <div className="text-gray-300 text-sm md:text-lg mb-2 font-roboto md:w-[70%] text-center mx-auto">
            <p>
              Join us for an unforgettable experience at Techember Fest. Secure
              your spot now.
            </p>
            <p className="text-sm">
              📍 04 Rumens road, Ikoyi, Lagos || March 15, 2025 | 7:00 PM
            </p>{" "}
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-lg text-gray-300">Select Ticket Type:</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 border border-slate-600 p-4 rounded-2xl">
          {tickets.map((ticket) => (
            <button
              key={ticket.type}
              onClick={() => handleTicketTypeChange(ticket.type, ticket.price)}
              className={`p-3 rounded-lg border transition-all ${
                formData.ticketType === ticket.type
                  ? "border-teal-500 bg-teal-700/50"
                  : "border-gray-600 hover:border-teal-500"
              }`}
            >
              <div className="flex flex-col justify-between items-start mb-2 gap-1">
                <span className="font-medium">
                  {ticket.price === 0 ? "Free" : `$${ticket.price}`}
                </span>
                <span className="text-teal-400 text-sm">{ticket.label}</span>

                <div className="text-sm text-gray-400">
                  {ticket.remaining} / {ticket.capacity}
                </div>
              </div>
            </button>
          ))}
        </div>
        {errors?.ticketType && (
          <p className="text-red-500 text-sm">{errors?.ticketType}</p>
        )}
      </div>
      <div className="space-y-4">
        <label htmlFor="ticket-quantity" className="text-lg text-gray-300">
          Number of Tickets
        </label>
        <select
          id="ticket-quantity"
          value={formData.quantity}
          onChange={handleQuantityChange}
          className="w-full bg-transparent border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num} className="bg-teal-900">
              {num}
            </option>
          ))}
        </select>
        {errors?.quantity && (
          <p className="text-red-500 text-sm">{errors.quantity}</p>
        )}
      </div>
    </div>
  );
};

export default FormStep1;
