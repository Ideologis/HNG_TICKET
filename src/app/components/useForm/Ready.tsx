import React, { useState } from "react";
import Image from "next/image";
import { TicketFormData } from "@/types";
import Link from "next/link";

interface FormStep3Props {
  formData: TicketFormData;
  onDownload: () => Promise<void>;
  onResetForm: () => void;
}

const FormStep3: React.FC<FormStep3Props> = ({
  formData,
  onDownload,
  onResetForm,
}) => {
  const [showModal, setShowModal] = useState(false);

  const saveTicketToLocalStorage = () => {
    const tickets = JSON.parse(localStorage.getItem("tickets") || "[]");
    tickets.push(formData);
    localStorage.setItem("tickets", JSON.stringify(tickets));
  };

  const generateBarcode = () => {
    return Math.floor(
      1000000000000000000 + Math.random() * 90000000000
    ).toString();
  };

  const barcodeNumber = generateBarcode();

  const handleDownload = async () => {
    saveTicketToLocalStorage();
    await onDownload();
    setShowModal(true);
  };
  const handleBookAnotherTicket = () => {
    onResetForm();
    window.location.reload();
  };

  return (
    <div className="max-w-xl mx-auto space-y-4 sm:space-y-8 md:px-4 sm:px-0">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Your Ticket is Booked!
        </h2>
        <p className="text-sm sm:text-base text-gray-300">
          Check your email for a copy or you can download
        </p>
      </div>

      <div className="block sm:hidden">
        <div className="bg-gradient-to-b from-teal-900/50 to-teal-800/30 rounded-xl p-4 m:dp-6">
          <div className="space-y-6">
            <div className="text-center space-y-3">
              <h3 className="text-xl font-bold text-white">
                Techember Fest &apos;25
              </h3>
              <div className="flex flex-col gap-2 text-gray-300 text-sm">
                <div className="flex items-center justify-center gap-2 bg-teal-800/30 py-2 rounded-lg">
                  <span>📍</span> 04 Rumens road, Ikoyi, Lagos
                </div>
                <div className="flex items-center justify-center gap-2 bg-teal-800/30 py-2 rounded-lg">
                  <span>📅</span> March 15, 2025 | 7:00 PM
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-36 h-36 bg-teal-400/20 rounded-lg overflow-hidden ring-2 ring-teal-500/30">
                <Image
                  src={formData.avatarUrl || "/api/placeholder/96/96"}
                  alt="Event Avatar"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="bg-teal-900/50 rounded-xl p-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-gray-400 text-xs">Your name</p>
                    <p className="text-white text-xs font-medium truncate">
                      {formData.fullName || "Avi Chukwu"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-400 text-xs">Your email</p>
                    <p className="text-white text-xs font-medium truncate">
                      {formData.email || "User@email.com"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-400 text-xs">Ticket Type</p>
                    <p className="text-white text-xs font-medium">
                      {formData.ticketType || "VIP"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-400 text-xs">Ticket for</p>
                    <p className="text-white text-xs font-medium">
                      {formData.quantity || "1"}
                    </p>
                  </div>
                </div>
                <div className="space-y-1 pt-2 border-t border-teal-600/30">
                  <p className="text-gray-400 text-xs">Special request</p>
                  <p className="text-white text-xs">
                    {formData.aboutProject || "No Request"}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <svg className="w-full h-8">
                <rect x="0" y="0" width="100%" height="100%" fill="none" />
                {Array.from({ length: 30 }).map((_, i) => (
                  <rect
                    key={i}
                    x={`${(i * 100) / 30}%`}
                    y="0"
                    width="2"
                    height="100%"
                    fill="white"
                    opacity={Math.random() > 0.5 ? "1" : "0.3"}
                  />
                ))}
              </svg>
              <div className="text-center text-white text-xs">
                {barcodeNumber}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="hidden sm:block w-full h-full relative aspect-[1/1.5] bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/Subtract.png')" }}
      >
        {/* Keep your existing desktop layout here */}
        <div className="p-8 h-full flex flex-col justify-center items-center">
          <div className="space-y-4 flex-1">
            <h3 className="text-2xl font-bold text-white text-center">
              Techember Fest &apos;25
            </h3>
            <div className="space-y-2 text-gray-300 text-center text-base">
              <p className="flex items-center gap-2 justify-center">
                <span>📍</span> 04 Rumens road, Ikoyi, Lagos
              </p>
              <p className="flex items-center gap-2 justify-center">
                <span>📅</span> March 15, 2025 | 7:00 PM
              </p>
            </div>
            <div className="flex justify-center items-center py-4">
              <div className="w-48 h-48 bg-teal-400/20 rounded-lg overflow-hidden">
                <Image
                  src={formData.avatarUrl || "/api/placeholder/96/96"}
                  alt="Event Avatar"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="bg-teal-400/20 rounded-xl p-6">
              <div className="border border-teal-600/50 rounded-xl p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="border-b border-teal-600/50 pb-3">
                    <p className="text-gray-400">Your name</p>
                    <p className="text-white truncate">
                      {formData.fullName || "Avi Chukwu"}
                    </p>
                  </div>
                  <div className="border-b border-teal-600/50 pb-3">
                    <p className="text-gray-400">Your email</p>
                    <p className="text-white truncate">
                      {formData.email || "User@email.com"}
                    </p>
                  </div>
                  <div className="border-b border-teal-600/50 pb-3">
                    <p className="text-gray-400">Ticket Type:</p>
                    <p className="text-white">{formData.ticketType || "VIP"}</p>
                  </div>
                  <div className="border-b border-teal-600/50 pb-3">
                    <p className="text-gray-400">Ticket for:</p>
                    <p className="text-white">{formData.quantity || "1"}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-gray-400 text-sm">Special request?</p>
                  <p className="text-white text-sm">
                    {formData.aboutProject || "No Request"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 pb-4">
            <svg className="w-full h-12">
              <rect x="0" y="0" width="100%" height="100%" fill="none" />
              {Array.from({ length: 30 }).map((_, i) => (
                <rect
                  key={i}
                  x={`${(i * 100) / 30}%`}
                  y="0"
                  width="2"
                  height="100%"
                  fill="white"
                  opacity={Math.random() > 0.5 ? "1" : "0.3"}
                />
              ))}
            </svg>
            <div className="text-center text-white text-sm mt-2">
              {barcodeNumber}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <button
          onClick={handleBookAnotherTicket}
          className="py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg border border-teal-500 text-teal-500 hover:bg-teal-500/10 transition-colors text-sm sm:text-base"
        >
          Book Another Ticket
        </button>
        <button
          onClick={handleDownload}
          className="py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg bg-teal-500 text-white hover:bg-teal-600 transition-colors text-sm sm:text-base"
        >
          Download & Save Ticket
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg text-center w-full max-w-xs sm:max-w-md">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">
              Welcome, Guest!
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-2">
              Your ticket has been successfully downloaded.
            </p>
            <Link
              href="/"
              onClick={handleBookAnotherTicket}
              className="mt-4 px-4 sm:px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition text-sm sm:text-base"
            >
              Book Another Ticket
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormStep3;
