import React, { useState, useEffect } from "react";
import Stepper from "../components/SellerRegistration/Stepper";

/* Import Steps */
import Step1Personal from "../components/SellerRegistration/steps/Step1Personal";
import Step2Business from "../components/SellerRegistration/steps/Step2Business";
import Step3Store from "../components/SellerRegistration/steps/Step3Store";
import Step4Bank from "../components/SellerRegistration/steps/Step4Bank";

import { useSellerForm } from "../components/SellerRegistration/context/SellerFormContext";

export default function SellerRegistration() {
  const { formData, update } = useSellerForm();

  // Step is loaded from context so UI restores the user’s last step
  const [step, setStep] = useState(formData.currentStep || 1);

  // List of steps the user already visited (for allowing jump)
  const [completedSteps, setCompletedSteps] = useState([]);

  /* -------------------------
     UI STEP NUMBER MAPPING
     -------------------------
     Internal Steps → UI steps
     1  = Personal
     2  = Business
     9  = Store Setup
     10 = Bank Info
  ------------------------- */
  const uiStepMap = {
    1: 1,
    2: 2,
    9: 3,
    10: 4,
  };

  /* -------------------------
     Navigation functions
  ------------------------- */

  const next = () => {
    setStep((s) => {
      if (s === 2) return 9;     // Step2 → Step3
      if (s === 9) return 10;    // Step3 → Step4
      return s + 1;
    });
  };

  const prev = () => {
    setStep((s) => {
      if (s === 10) return 9;    // Step4 → Step3
      if (s === 9) return 2;     // Step3 → Step2
      return s - 1;
    });
  };

  // Jump to any completed step in stepper
  const goto = (uiStep) => {
    let actual = Object.keys(uiStepMap).find(
      (key) => uiStepMap[key] === uiStep
    );

    actual = parseInt(actual);

    if (completedSteps.includes(uiStep)) {
      setStep(actual);
      update("currentStep", actual);
    }
  };

  /* -------------------------------------
     Mark step as completed on every change
  -------------------------------------- */
  useEffect(() => {
    const currentUiStep = uiStepMap[step];

    setCompletedSteps((prev) =>
      Array.from(new Set([...prev, currentUiStep]))
    );

    update("currentStep", step);
  }, [step]);

  /* -------------------------
     RENDER ACTIVE STEP
  ------------------------- */
  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1Personal next={next} />;

      case 2:
        return <Step2Business next={next} prev={prev} />;

      case 9:
        return <Step3Store next={next} prev={prev} />;

      case 10:
        return <Step4Bank next={next} prev={prev} />;

      default:
        return <Step1Personal next={next} />;
    }
  };

  /* -------------------------
          MAIN RETURN
  ------------------------- */

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* STEP NAVIGATION BAR */}
      <Stepper
        mainStep={uiStepMap[step]}
        completedSteps={completedSteps}
        goto={goto}
      />

      {/* ACTIVE FORM STEP */}
      <div className="mt-8">{renderStep()}</div>
    </div>
  );
}
