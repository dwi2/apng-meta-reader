import parseAPNG from "apng-js";
import filesize from "filesize";

const defaultText = "Please drag and drop APNG file here";
const notPNGText = "Not a PNG";

const isPNG = item => {
  return item && item.kind === "file" && item.type === "image/png";
};

const metaOutput = document.querySelector('#meta-output');
const preview = document.querySelector('#preview');
const erase = reason => {
  revokeImageObject();
  preview.innerHTML = '';
  metaOutput.textContent = `${reason}, ${defaultText}`;
};
const revokeImageObject = () => {
  const currentImageElem = preview.querySelector('img');
  if (currentImageElem) {
    URL.revokeObjectURL(currentImageElem.src);
  }
}

const previewAPNG = file => {
  revokeImageObject();
  preview.innerHTML = '';
  const objectURL = URL.createObjectURL(file);
  const img = document.createElement('img');
  img.src = objectURL;
  preview.appendChild(img);
}

const parseFile = file => {
  if (!file || !(file instanceof File)) {
    return;
  }
  let meta = {
    filename: file.name,
    filesize: file.size
  };

  file.arrayBuffer().then(buffer => {
    const apng = parseAPNG(buffer);
    if (apng instanceof Error) {
      erase("Not an APNG")
      return;
    }

    Object.assign(meta, apng);
    metaOutput.textContent = `
      file name: ${meta.filename}
      file size: ${filesize(meta.filesize)}
      duration (1 loop): ${meta.playTime / 1000} s
      loop: ${meta.numPlays === 0 ? 'infinite' : meta.numPlays}
      number of frames : ${meta.frames.length}
      width: ${meta.width} px
      height: ${meta.height} px`;

    previewAPNG(file);
  });

};

const handler = evt => {
  evt.preventDefault();
  if (
    evt.dataTransfer.items &&
    evt.dataTransfer.items[0] &&
    isPNG(evt.dataTransfer.items[0])
  ) {
    const file = evt.dataTransfer.items[0].getAsFile();
    parseFile(file);
  } else {
    erase(notPNGText);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  ["dragover", "drop"].forEach(evtType => {
    document.addEventListener(evtType, handler);
  });
});
