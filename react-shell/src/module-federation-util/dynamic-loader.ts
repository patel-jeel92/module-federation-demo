/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
type Scope = any;
type Factory = () => any;

interface Container {
  init(shareScope: Scope): void;
  get(module: string): Factory;
}

declare const __webpack_init_sharing__: (shareScope: string) => Promise<void>;
declare const __webpack_share_scopes__: { default: Scope };

type ContainerMap = { [key: string]: Container };

const containerMap: ContainerMap = {};
const remoteMap: any = {};

let isDefaultScopeInitialized = false;

export async function lookupExposedModule<T>(
  key: string,
  exposedModule: string
): Promise<T> {
  const container = containerMap[key];
  const factory = await container.get(exposedModule);
  const Module = factory();
  return Module as T;
}

export function loadAndLookupExposedModule<T = any>(
  options: LoadRemoteModuleOptions
) {
  return async () => {
    let key = "";
    if (!options.type) {
      options.type = "script";
    }
    options.type === "script"
      ? (key = options.remoteName)
      : (key = options.remoteEntry);
    await loadRemoteModule(options);

    const container = containerMap[key];
    const factory = await container.get(options.exposedModule);
    const Module = factory();
    return Module as T;
  };
}

async function initRemote(container: Container, key: any) {
  // Do we still need to initialize the remote?
  if (remoteMap[key]) {
    return container;
  }

  // Do we still need to initialize the share scope?
  if (!isDefaultScopeInitialized) {
    await __webpack_init_sharing__("default");
    isDefaultScopeInitialized = true;
  }

  await container.init(__webpack_share_scopes__.default);
  remoteMap[key] = true;
  return container;
}

export type LoadRemoteEntryOptions =
  | LoadRemoteEntryScriptOptions
  | LoadRemoteEntryEsmOptions
  | undefined;

export type LoadRemoteEntryScriptOptions = {
  type?: "script";
  remoteEntry: string;
  remoteName: string;
};

export type LoadRemoteEntryEsmOptions = {
  type: "module";
  remoteEntry: string;
};

export async function loadRemoteEntry(
  remoteEntry: string,
  remoteName: string
): Promise<void>;
export async function loadRemoteEntry(
  options: LoadRemoteEntryOptions
): Promise<void>;
export async function loadRemoteEntry(
  remoteEntryOrOptions: string | LoadRemoteEntryOptions,
  remoteName?: string
): Promise<void> {
  if (typeof remoteEntryOrOptions === "string") {
    const remoteEntry = remoteEntryOrOptions;
    return await loadRemoteScriptEntry(remoteEntry, remoteName || "");
  } else if (remoteEntryOrOptions?.type === "script") {
    const options = remoteEntryOrOptions;
    return await loadRemoteScriptEntry(options.remoteEntry, options.remoteName);
  } else if (remoteEntryOrOptions?.type === "module") {
    const options = remoteEntryOrOptions;
    await loadRemoteModuleEntry(options.remoteEntry);
  }
}

async function loadRemoteModuleEntry(remoteEntry: string): Promise<void> {
  if (containerMap[remoteEntry]) {
    return Promise.resolve();
  }
  return await import(/* webpackIgnore:true */ remoteEntry).then(
    (container) => {
      initRemote(container, remoteEntry);
      containerMap[remoteEntry] = container;
    }
  );
}

async function loadRemoteScriptEntry(
  remoteEntry: string,
  remoteName: string
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    // Is remoteEntry already loaded?
    if (containerMap[remoteName]) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = remoteEntry;
    script.type = "text/javascript";
    script.setAttribute("data-webpack", `${remoteName}`);
    script.async = true;
    script.onerror = reject;

    script.onload = async () => {
      const container = window[remoteName];
      await initRemote(container, remoteName);
      containerMap[remoteName] = container;
      resolve();
    };

    document.getElementsByTagName("head")[0].appendChild(script);
  });
}

export type LoadRemoteModuleOptions =
  | LoadRemoteModuleScriptOptions
  | LoadRemoteModuleEsmOptions;

export type LoadRemoteModuleScriptOptions = {
  type?: "script";
  remoteEntry: string;
  remoteName: string;
  exposedModule: string;
};

export type LoadRemoteModuleEsmOptions = {
  type: "module";
  remoteEntry: string;
  exposedModule: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function loadAndReturnRemoteModule<T = any>(
  options: LoadRemoteModuleOptions
) {
  let loadRemoteEntryOptions: LoadRemoteEntryOptions;
  let key = "";

  // To support legacy API (< ng 13)
  if (!options.type) {
    options.type = "script";
  }

  if (options.type === "script") {
    loadRemoteEntryOptions = {
      type: "script",
      remoteEntry: options.remoteEntry,
      remoteName: options.remoteName,
    };
    key = options.remoteName;
  } else if (options.type === "module") {
    loadRemoteEntryOptions = {
      type: "module",
      remoteEntry: options.remoteEntry,
    };
    key = options.remoteEntry;
  }

  if (options.remoteEntry) {
    await loadRemoteEntry(loadRemoteEntryOptions);
  }

  return await lookupExposedModule<T>(key, options.exposedModule);
}

export async function loadRemoteModule(options: LoadRemoteModuleOptions) {
  let loadRemoteEntryOptions: LoadRemoteEntryOptions;
  if (options.type === "script") {
    loadRemoteEntryOptions = {
      type: "script",
      remoteEntry: options.remoteEntry,
      remoteName: options.remoteName,
    };
  } else if (options.type === "module") {
    loadRemoteEntryOptions = {
      type: "module",
      remoteEntry: options.remoteEntry,
    };
  }

  if (options.remoteEntry) {
    await loadRemoteEntry(loadRemoteEntryOptions);
  }
}
