import path from "path";

export default {
  // Source files
  src: path.join(__dirname, "/src"),

  // Production build files
  build: path.join(__dirname, "/dist"),

  // Static files that get copied to build folder
  public: path.join(__dirname, "/public"),
};
