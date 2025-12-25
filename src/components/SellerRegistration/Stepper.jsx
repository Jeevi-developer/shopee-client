import React from "react";
import {
  User,
  Building2,
  Store,
  CreditCard,
} from "lucide-react";

const icons = {
  personal: User,
  business: Building2,
  store: Store,
  bank: CreditCard,
};

export default function Stepper({ mainStep, completedSteps, goto }) {
  const steps = [
    { id: 1, label: "Personal Info", icon: "personal" },
    { id: 2, label: "Business Info", icon: "business" },
    { id: 3, label: "Store Setup", icon: "store" },
    { id: 4, label: "Bank & Submit", icon: "bank" },
  ];

  return (
    <div className="flex justify-between items-center mb-10 px-6">
      {steps.map((step, index) => {
        const Icon = icons[step.icon];
        const isActive = mainStep === step.id;

        // 🔒 DISABLE CLICK FOR FUTURE STEPS
        const isClickable = step.id === 1 || completedSteps.includes(step.id - 1);

        return (
          <div
            key={step.id}
            className={`flex flex-col items-center relative flex-1 
              ${isClickable ? "cursor-pointer" : "cursor-not-allowed opacity-50"}
            `}
            onClick={() => {
              if (isClickable) goto(step.id);
            }}
          >
            <div
              className={`w-14 h-14 flex items-center justify-center rounded-full border transition 
                ${
                  isActive
                    ? "bg-blue-600 text-white border-blue-600 shadow"
                    : "bg-gray-100 text-gray-600 border-gray-300"
                }
              `}
            >
              <Icon size={28} />
            </div>

            <p
              className={`mt-2 text-sm font-medium ${
                isActive ? "text-blue-600" : "text-gray-600"
              }`}
            >
              {step.label}
            </p>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="absolute top-7 left-full w-full h-0.5 bg-gray-300"></div>
            )}
          </div>
        );
      })}
    </div>
  );
}
