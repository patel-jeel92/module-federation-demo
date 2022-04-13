import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Stepper from "@mui/material/Stepper";
import React, { useEffect, useRef, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { ISystem } from "../interfaces/ISystem";
import WrapperComponent from "./WrapperComponent";

export default function HorizontalNonLinearStepper() {
  const history = useHistory();
  // eslint-disable-next-line react/prop-types
  const routes = [
    {
      name: "user",
      path: "/user",
      remoteName: "user",
      remoteEntry: "http://localhost:3005/remoteEntry.js",
      exposedModule: "./App",
    },
    {
      name: "product",
      path: "/product",
      remoteName: "product",
      remoteEntry: "http://localhost:3006/remoteEntry.js",
      exposedModule: "./App",
    },
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [count, setCount] = useState(0);
  const [system, setSystem] = React.useState<ISystem>({
    remoteName: "user",
    remoteEntry: "http://localhost:3005/remoteEntry.js",
    exposedModule: "./App",
  } as ISystem);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [completed, setCompleted] = useState({});
  const stateRef = useRef<number>(activeStep);
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
  });

  // Whenever count changes (handle back and handle next) navigate to either prev or next state depending on the activeStep
  useEffect(() => {
    const nextState = routes[activeStep];
    if (nextState) {
      history.push(nextState.path);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const totalSteps = () => {
    return routes.length;
  };

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

  const handleStep = (step: number) => () => {
    setActiveStep(step);
    const item = routes[step];
    console.log("ITEM", item);
    setSystem({
      remoteEntry: item.remoteEntry,
      remoteName: item.remoteName,
      exposedModule: item.exposedModule,
    });
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
        <WrapperComponent system={system}> </WrapperComponent>
      </div>
    </Box>
  );
}
