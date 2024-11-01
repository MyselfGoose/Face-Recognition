let referenceImage = null;
let imageToCheck = null;

function storeFiles(){
  const referenceInput = document.getElementById('reference-upload').files[0];
  const checkInput = document.getElementById('check-upload').files[0];

  if(referenceInput){
    referenceImage = referenceInput;
    displayImage(referenceImage, "reference-container");
    document.getElementById("first-input-container").classList.add('hidden');
  }
  if(checkInput){
    imageToCheck = checkInput;
    displayImage(imageToCheck, "check-container");
    document.getElementById("second-input-container").classList.add('hidden');
  }

  console.log(referenceImage);
  console.log("Reference Image File: " + referenceImage);
  console.log("Image to check: " + imageToCheck);
}

function displayImage(imageFile, containerClass){
  const img = document.createElement('img');
  img.src = URL.createObjectURL(imageFile);
  img.alt = imageFile.name;
  img.classList.add('img-fluid', 'mb-2');
  const container = document.querySelector(`.${containerClass}`);
  container.innerHTML = ``;
  container.appendChild(img);
}