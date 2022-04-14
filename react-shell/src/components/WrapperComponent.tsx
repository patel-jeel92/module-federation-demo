/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { FunctionComponent } from "react";
import { ISystem } from "../interfaces/ISystem";
import { lookupExposedModule2 } from "../module-federation-util/dynamic-loader";
interface IWrapperComponent {
  system: ISystem;
}

const WrapperComponent: FunctionComponent<IWrapperComponent> = ({ system }) => {
  const Component2 = React.lazy(
    lookupExposedModule2({
      type: system.type,
      remoteEntry: system.remoteEntry,
      remoteName: system.remoteName,
      exposedModule: system.exposedModule,
    })
  );

  return (
    <React.Suspense fallback="Loading System">
      <Component2 />
    </React.Suspense>
  );
};

export default WrapperComponent;
