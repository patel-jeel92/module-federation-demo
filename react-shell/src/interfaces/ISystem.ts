export interface ISystem {
  type?: "script" | "module" | undefined;
  remoteEntry: string;
  exposedModule: string;
  remoteName: string;
}
