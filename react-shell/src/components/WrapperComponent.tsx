import React, { FunctionComponent } from "react";
import { ISystem } from "../interfaces/ISystem";
import { loadComponent } from "../module-federation-util/load-component";
interface IWrapperComponent {
  system: ISystem;
}

const WrapperComponent: FunctionComponent<IWrapperComponent> = ({ system }) => {
  if (!system) {
    return <h2>No system specified</h2>;
  }

  const Component = React.lazy(
    loadComponent(
      system.remoteName,
      "default",
      system.exposedModule,
      system.remoteEntry
    )
  );

  return (
    <React.Suspense fallback="Loading System">
      <Component />
    </React.Suspense>
  );
};

export default WrapperComponent;
