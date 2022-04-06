import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Stepper from "@mui/material/Stepper";
import React, { useEffect, useRef, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
// eslint-disable-next-line import/no-unresolved
const ProductApp = React.lazy(() => import("PRODUCT/App"));
// eslint-disable-next-line import/no-unresolved
const UserApp = React.lazy(() => import("USER/App"));

// eslint-disable-next-line import/no-unresolved
const AngularApp = React.lazy(() => import("ANGULAR/ParentModule"));

export default function HorizontalNonLinearStepper() {
  let history = useHistory();
  // eslint-disable-next-line react/prop-types
  const routes = [
    {
      name: "One",
      path: "/one",
    },
    {
      name: "Two",
      path: "/two",
    },
    {
      name: "Three",
      path: "/three",
    },
  ];
  const [activeStep, setActiveStep] = useState(0);
  const [count, setCount] = useState(0);
  const [completed, setCompleted] = useState({});
  const stateRef = useRef();
  stateRef.current = activeStep;

  useEffect(() => {
    // subscribe event
    window.addEventListener("back", handleBack);
    window.addEventListener("save-and-complete", handleComplete);
    return () => {
      // unsubscribe event
      window.removeEventListener("back", handleBack);
      window.removeEventListener("save-and-complete", handleComplete);
    };
  }, []);

  // Whenever count changes (handle back and handle next) navigate to either prev or next state depending on the activeStep
  useEffect(() => {
    const nextState = routes[activeStep];
    if (nextState) {
      history.push(nextState.path);
    }
  }, [count]);

  const totalSteps = () => {
    return routes.length;
  };

  function getStepContent() {
    const step = stateRef.current;
    switch (step) {
      case 0:
        return (
          <React.Suspense fallback="Loading...">
            <AngularApp />
          </React.Suspense>
        );
      case 1:
        return (
          <React.Suspense fallback="Loading...">
            <ProductApp />
          </React.Suspense>
        );
      case 2:
        return (
          <React.Suspense fallback="Loading...">
            <UserApp />
          </React.Suspense>
        );
      default:
        return "Unknown step";
    }
  }

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          routes.findIndex((step, i) => !(i in completed))
        : stateRef.current + 1;

    setActiveStep(newActiveStep);
    setCount((prevCount) => prevCount + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setCount((prevCount) => prevCount - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[stateRef.current] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  //   const handleReset = () => {
  //     setActiveStep(0);
  //     setCompleted({});
  //   };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper nonLinear activeStep={activeStep}>
        {routes.map((label, index) => (
          <Step key={label.name} completed={completed[index]}>
            <NavLink
              to={label.path.toLowerCase().replace(/\s/g, "")}
              style={{ textDecoration: "none" }}
            >
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label.name}
              </StepButton>
            </NavLink>
          </Step>
        ))}
      </Stepper>
      <div>
        <React.Fragment>{getStepContent()}</React.Fragment>
      </div>
    </Box>
  );
}
