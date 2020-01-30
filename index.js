import parseAPNG from "apng-js";
import stringifyObject from "stringify-object";

const defaultText = "Drag and drop APNG file here";
const notPNGText = "Not a PNG";

const isPNG = item => {
  return item && item.kind === "file" && item.type === "image/png";
};

const erase = () => {
  document.querySelector(
    "#meta-output"
  ).textContent = `${notPNGText}, ${defaultText}`;
};

const handler = evt => {
  evt.preventDefault();
  if (evt.type === "drop") {
    console.log(evt.dataTransfer.items);
    if (
      evt.dataTransfer.items &&
      evt.dataTransfer.items[0] &&
      isPNG(evt.dataTransfer.items[0])
    ) {
      const file = evt.dataTransfer.items[0].getAsFile();
      file.arrayBuffer().then(buffer => {
        const apng = parseAPNG(buffer);
        const output = stringifyObject(apng);
        console.log(output);
        document.querySelector("#meta-output").textContent = output;
      });
    } else {
      erase();
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  ["dragover", "drop"].forEach(evtType => {
    document.addEventListener(evtType, handler);
  });
});
