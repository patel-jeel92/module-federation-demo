export interface IRoute {
  name: string;
  path: string;
  remoteName: string;
  remoteEntry: string;
  exposedModule: string;
  type: string;
}

export const Routes: IRoute[] = [
  {
    name: "User",
    path: "/user",
    remoteName: "user",
    remoteEntry: "http://localhost:3005/remoteEntry.js",
    exposedModule: "./App",
    type: "script",
  },
  {
    name: "product",
    path: "/product",
    remoteName: "product",
    remoteEntry: "http://localhost:3006/remoteEntry.js",
    exposedModule: "./App",
    type: "script",
  },
  {
    name: "Cart",
    path: "/cart",
    remoteName: "cart",
    remoteEntry: "http://localhost:8080/remoteEntry.js",
    exposedModule: "./App",
    type: "script",
  },
  {
    name: "Angular App",
    path: "/angular",
    remoteName: "angular1",
    remoteEntry: "http://localhost:4202/remoteEntry.js",
    exposedModule: "./web-components",
    type: "script",
  },
];
