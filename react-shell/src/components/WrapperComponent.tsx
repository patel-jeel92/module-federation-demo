/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { FunctionComponent } from "react";
import { ISystem } from "../interfaces/ISystem";
import { loadAndLookupExposedModule } from "../module-federation-util/dynamic-loader";
import ErrorBoundary from "./ErrorBoundary";

interface IWrapperComponent {
  system: ISystem;
}

const WrapperComponent: FunctionComponent<IWrapperComponent> = ({ system }) => {
  const Component = React.lazy(
    loadAndLookupExposedModule({
      type: system.type,
      remoteEntry: system.remoteEntry,
      remoteName: system.remoteName,
      exposedModule: system.exposedModule,
    })
  );

  return (
    <ErrorBoundary>
      <React.Suspense fallback="Loading System">
        <Component />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default WrapperComponent;
