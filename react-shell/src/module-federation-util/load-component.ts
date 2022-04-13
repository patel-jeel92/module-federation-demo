/* eslint-disable @typescript-eslint/no-explicit-any */
import { getOrLoadRemote } from "./load-remote";

export const loadComponent = (
  remote: string,
  sharedScope: any,
  module: any,
  url: any
) => {
  return async () => {
    await getOrLoadRemote(remote, sharedScope, url);
    const container = window[remote];
    const factory = await container.get(module);
    const Module = factory();
    return Module;
  };
};
