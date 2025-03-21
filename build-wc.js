const fs = require("fs-extra");
const concat = require("concat");

const build = async () => {
  const files = [
    "./dist/questionset-editor-library-wc/runtime.js",
    "./dist/questionset-editor-library-wc/polyfills.js",
    "./dist/questionset-editor-library-wc/scripts.js",
    "./dist/questionset-editor-library-wc/main.js"
  ];

  const filesToExclude = [
    "dist/questionset-editor-library-wc/index.html",
    "dist/questionset-editor-library-wc/runtime.js",
    "dist/questionset-editor-library-wc/polyfills.js",
    "dist/questionset-editor-library-wc/scripts.js",
    "dist/questionset-editor-library-wc/main.js"
  ]
  const filter = file => {
     return !filesToExclude.includes(file);
  }

  await fs.ensureDir("dist/questionset-editor-library-wc");
  
  if (!fs.existsSync('web-component')){
    fs.mkdirSync('web-component');
  }

  await concat(files, "web-component/sunbird-questionset-editor.js");
  await fs.copy("./dist/questionset-editor-library-wc/", "web-component/", {filter});

  await concat(files, "web-component-examples/vanilla-js/sunbird-questionset-editor.js");
  await fs.copy("./dist/questionset-editor-library-wc/", "web-component-examples/vanilla-js/", {filter});
  await fs.copy("README.md", "web-component/README.md")
  console.log("Files concatenated successfully!!!");
};
build();
