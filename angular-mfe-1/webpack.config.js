const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(path.join(__dirname, "tsconfig.json"), [
  /* mapped paths to share */
]);

module.exports = {
  output: {
    uniqueName: "angular-mfe-1",
    publicPath: "auto",
  },
  optimization: {
    runtimeChunk: false,
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "remote1",
      filename: "remoteEntry.js",
      exposes: {
        "./AngularTileComponent":
          ".//src/app/angular-tile/angular-tile.component.ts",
        "./StaticAngularComponent":
          ".//src/app/static-angular/static-angular.component.ts",
        "./ParentModule": ".//src/app/parent/parent.module.ts",
      },
      shared: {
        "@angular/core": { singleton: true, strictVersion: true },
        "@angular/common": { singleton: true, strictVersion: true },
        "@angular/common/http": { singleton: true, strictVersion: true },
        "@angular/router": { singleton: true, strictVersion: true },
        bootstrap: { singleton: true, strictVersion: true },
        jquery: { singleton: true, strictVersion: true },
        ...sharedMappings.getDescriptors(),
      },
    }),
    sharedMappings.getPlugin(),
  ],
};
