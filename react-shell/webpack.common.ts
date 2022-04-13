import ESLintPlugin from "eslint-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { Configuration, container } from "webpack";
import { dependencies } from "./package.json";
import paths from "./paths";

const commonConfig: Configuration = {
  entry: [paths.src + "/index.tsx"],

  // Where webpack outputs the assets and bundles
  output: {
    path: paths.build,
    filename: "[name].bundle.js",
  },

  // Determine how modules within the project are treated
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      // Images: Copy image files to build folder
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: "asset/resource" },

      // Fonts and SVGs: Inline files
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: "asset/inline" },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    // Module Federation to load different micro apps
    new container.ModuleFederationPlugin({
      name: "mfe-react-shell",
      filename: "remoteEntry.js",
      remotes: {},
      shared: [
        {
          ...dependencies,
          react: { requiredVersion: dependencies.react, singleton: true },
          "react-dom": {
            requiredVersion: dependencies["react-dom"],
            singleton: true,
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      title: "React shell",
      favicon: paths.public + "/favicon.ico",
      template: paths.public + "/index.html", // template file
      filename: "index.html", // output file
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new ESLintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
    }),
  ],
};

export default commonConfig;
