import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Stepper from "@mui/material/Stepper";
import React, { useEffect, useRef, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { IRoute, Routes } from "../configs/routes";
import { ISystem } from "../interfaces/ISystem";
import WrapperComponent from "./WrapperComponent";

export default function HorizontalNonLinearStepper() {
  const history = useHistory();
  const [routes] = useState<IRoute[]>(Routes);
  const [activeStep, setActiveStep] = useState(0);
  const [system, setSystem] = React.useState<ISystem>({} as ISystem);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [completed, setCompleted] = useState({});
  const stateRef = useRef<number>(activeStep);
  stateRef.current = activeStep;

  useEffect(() => {
    const initial = routes[0];
    setSystem(initial);

    addEventListener("save-and-complete", () => handleComplete());
    return () => {
      // unsubscribe event
      removeEventListener("save-and-complete", () => handleComplete());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // // Whenever count changes (handle back and handle next) navigate to either prev or next state depending on the activeStep
  useEffect(() => {
    const nextState = routes[activeStep];
    if (nextState) {
      setSystem(nextState);
      history.push(nextState.path);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateRef.current]);

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
          routes.findIndex((step, i): boolean => !(i in completed))
        : stateRef.current + 1;

    setActiveStep(newActiveStep);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[stateRef.current] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  return (
    <Box>
      <h2 className="pl-4">{routes[activeStep].name}</h2>
      <Stepper nonLinear activeStep={activeStep} alternativeLabel>
        {routes.map((label, index) => (
          <Step key={label.name} completed={completed[index]}>
            <NavLink to={label.path.toLowerCase().replace(/\s/g, "")}>
              <StepButton
                sx={{
                  "& .MuiStepLabel-root .Mui-completed": {
                    color: "#09B119", // circle color (COMPLETED)
                  },
                  "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                    {
                      color: "black", // Just text label (COMPLETED)
                    },
                  "& .MuiStepLabel-root .Mui-active": {
                    color: "#E20074", // circle color (ACTIVE)
                  },
                  "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
                    {
                      color: "black", // Just text label (COMPLETED)
                    },
                  "& .MuiStepButton-root": {
                    outline: "none",
                    "box-shadow": "none",
                  },
                }}
                onClick={handleStep(index)}
              >
                {label.name}
              </StepButton>
            </NavLink>
          </Step>
        ))}
      </Stepper>
      <div className="content">
        <WrapperComponent system={system} />
      </div>
    </Box>
  );
}
