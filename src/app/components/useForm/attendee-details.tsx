import React, { useRef } from "react";
import { TicketFormData } from "@/types";
import { Upload } from "lucide-react";
import Image from "next/image";

interface FormStep2Props {
  formData: TicketFormData;
  updateFormData: (data: Partial<TicketFormData>) => void;
  errors?: Partial<Record<keyof TicketFormData, string>>;
}

const FormStep2: React.FC<FormStep2Props> = ({
  formData,
  updateFormData,
  errors,
}) => {
  // console.log("ERROR", errors);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "hng-task");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/digm76oyr/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();

        updateFormData({
          ...formData,
          avatarUrl: data.secure_url,
        });
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleInputChange = (field: keyof TicketFormData, value: string) => {
    updateFormData({
      [field]: value,
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#001A1F] rounded-3xl p-8">
        <h3 className="text-white mb-6">Upload Profile Photo</h3>
        <div className="flex justify-center">
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`relative cursor-pointer size-50 md:size-64 rounded-3xl bg-[#002A30] flex flex-col items-center justify-center border-2 border-dashed ${
              errors?.avatarUrl ? "border-red-500" : "border-teal-500/30"
            } hover:border-teal-500 transition-colors`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
              title="Upload Image"
            />
            {formData.avatarUrl ? (
              <Image
                src={formData.avatarUrl}
                alt="Uploaded Image"
                width={256}
                height={256}
                className="w-full h-full rounded-3xl object-cover"
              />
            ) : (
              <div className="flex flex-col items-center p-6 text-center">
                <div className="w-12 h-12 mb-4 rounded-full bg-teal-500/10 flex items-center justify-center">
                  <Upload className="w-6 h-6 text-teal-500" />
                </div>
                <p className="text-white text-sm mb-1">
                  Drag & drop or click to
                </p>
                <p className="text-white text-sm">upload</p>
              </div>
            )}
          </div>
        </div>
        {errors?.avatarUrl && (
          <p className="text-red-500 text-sm mt-2 text-center">
            {errors.avatarUrl}
          </p>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-gray-300 mb-2">Enter your name *</label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
            className={`w-full bg-transparent border ${
              errors?.fullName ? "border-red-500" : "border-gray-600"
            } rounded-lg p-3 text-gray-300 focus:border-teal-500 focus:ring-1 focus:ring-teal-500`}
            placeholder="Enter your name"
          />
          {errors?.fullName && (
            <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Enter your email *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={`w-full bg-transparent border ${
              errors?.email ? "border-red-500" : "border-gray-600"
            } rounded-lg p-3 text-gray-300 focus:border-teal-500 focus:ring-1 focus:ring-teal-500`}
            placeholder="Enter your email"
          />
          {errors?.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Special Request *</label>
          <textarea
            value={formData.aboutProject}
            onChange={(e) => handleInputChange("aboutProject", e.target.value)}
            className={`w-full bg-transparent border ${
              errors?.aboutProject ? "border-red-500" : "border-gray-600"
            } rounded-lg p-3 text-gray-300 focus:border-teal-500 focus:ring-1 focus:ring-teal-500`}
            rows={4}
            placeholder="Describe your request in detail"
          />
          {errors?.aboutProject && (
            <p className="text-red-500 text-sm mt-1">{errors.aboutProject}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormStep2;
