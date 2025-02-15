"use client";

import { useState, useEffect, useRef } from "react";
import { validateTicketForm } from "@/utils/validation"; // Removed sendTicketEmail import
import { FormStep, TicketFormData, ValidationErrors } from "@/types";
import { downloadTicket } from "@/utils/ticket-download";
import FormStep1 from "./useForm/ticket-selection"; // Fixed import path
import FormStep2 from "./useForm/attendee-details"; // Fixed import path
import FormStep3 from "./useForm/Ready"; // Fixed import path
import { useStateContext } from "@/context/state-context";

export default function Home() {
  const { isLoading, setIsLoading, showSuccess } = useStateContext();
  const [error, setError] = useState<ValidationErrors | null>(null);

  const [currentStep, setCurrentStep] = useState<FormStep>(
    FormStep.TicketSelection
  );
  const [formData, setFormData] = useState<TicketFormData>({
    ticketType: "REGULAR",
    quantity: 1,
    fullName: "",
    email: "",
    avatarUrl: "",
    aboutProject: "",
    price: 0,
  });

  const handleResetForm = () => {
    setFormData({
      ticketType: "REGULAR",
      quantity: 1,
      fullName: "",
      email: "",
      avatarUrl: "",
      aboutProject: "",
      price: 0,
    });
  };

  const handleUpdateFormData = (data: Partial<TicketFormData>) => {
    setFormData((prevData) => ({
      ...prevData,
      ...data,
    }));

    if (error && Object.keys(data)[0]) {
      const fieldName = Object.keys(data)[0] as keyof TicketFormData;
      setError((prevError) => {
        if (!prevError) return null;
        const newError = { ...prevError };
        delete newError[fieldName];
        return Object.keys(newError).length > 0 ? newError : null;
      });
    }
  };

  const ticketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedData = localStorage.getItem("ticketFormData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("ticketFormData", JSON.stringify(formData));
  }, [formData]);

  const handleNext = async () => {
    // console.log("Form Data:", formData);
    const errors = validateTicketForm(formData, currentStep);
    console.log("ERROR", errors);

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    if (currentStep === FormStep.Complete) {
      setIsLoading(true);
      try {
        if (ticketRef.current) {
          const ticketImage = await downloadTicket(ticketRef.current);
          const tickets = JSON.parse(localStorage.getItem("tickets") || "[]");
          tickets.push({ ...formData, ticketImage });
          localStorage.setItem("tickets", JSON.stringify(tickets));
          showSuccess("Ticket booked successfully!");
        }
      } catch (error) {
        console.log(error);
        setError({ general: "Failed to process ticket. Please try again." });
        return;
      } finally {
        setIsLoading(false);
      }
    }

    setCurrentStep((prev) => (prev + 1) as FormStep);
  };

  const handleBack = () => {
    setCurrentStep((prev) => (prev - 1) as FormStep);
  };

  return (
    <main className="text-white md:p-4 max-w-4xl mx-auto">
      <div className="">
        <div className="min-w-2xl mx-auto rounded-3xl border border-slate-500 p-6 md:p-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl md:text-4xl font-serif">
              {currentStep === FormStep.TicketSelection && "Ticket Selection"}
              {currentStep === FormStep.AttendeeDetails && "Attendee Details"}
              {currentStep === FormStep.Complete && "Ready"}
            </h2>
            <span>Step {currentStep}/3</span>
          </div>
          <div className="rounded-3xl">
            <div className="relative w-full h-1 bg-gray-700 rounded mb-8 overflow-hidden">
              <div
                className="absolute h-full bg-teal-500 rounded"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              />
            </div>

            {isLoading && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-teal-900 p-6 rounded-lg">
                  <div className="animate-spin w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full" />
                </div>
              </div>
            )}
            {/* <AnimatePresence>
							{error && (
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -20 }}
									className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg"
								>
									{error}
								</motion.div>
							)}
						</AnimatePresence> */}
            
              <div className="bg-[radial-gradient(ellipse_at_top_left,_#07373F_0%,_#0A0C11_140%)] border border-slate-500 backdrop-blur-sm rounded-3xl p-4 md:p-6 shadow-xl min-w-4xl">
                {currentStep === FormStep.TicketSelection && (
                  <FormStep1
                    formData={formData}
                    updateFormData={handleUpdateFormData}
                    errors={error || undefined}
                  />
                )}

                {currentStep === FormStep.AttendeeDetails && (
                  <FormStep2
                    formData={formData}
                    updateFormData={handleUpdateFormData}
                    errors={error || undefined}
                  />
                )}

                {currentStep === FormStep.Complete && (
                  <div ref={ticketRef}>
                    <FormStep3
                      formData={formData}
                      onDownload={() => downloadTicket(ticketRef.current!)}
                      onResetForm={handleResetForm}
                    />
                  </div>
                )}

                {currentStep !== FormStep.Complete && (
                  <div className="flex flex-col md:flex-row justify-between mt-6 gap-4">
                    <button
                      onClick={
                        currentStep === FormStep.TicketSelection
                          ? () => window.location.reload()
                          : handleBack
                      }
                      className="px-6 py-2 border border-slate-500 text-slate-300 rounded-lg w-full"
                      disabled={isLoading}
                    >
                      {currentStep === FormStep.TicketSelection
                        ? "Cancel"
                        : "Back"}
                    </button>

                    <button
                      onClick={handleNext}
                      className="px-6 py-2 bg-teal-500 text-white rounded-lg w-full"
                      disabled={isLoading}
                    >
                      {currentStep === FormStep.TicketSelection
                        ? "Next"
                        : "Get My Free Ticket"}
                    </button>
                  </div>
                )}
              </div>
           
          </div>
        </div>
      </div>
    </main>
  );
}
