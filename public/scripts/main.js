const run = async () => {
  // Load face-api models
  await Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri('./models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.ageGenderNet.loadFromUri('/models'),
  ]);

  const referenceFace = document.getElementById('reference-image');
  const facesToCheck = document.getElementById('check-image');
  const canvas = document.getElementById('canvas');

  // Match canvas dimensions to the image being checked
  faceapi.matchDimensions(canvas, facesToCheck);

  // Detect faces in both images
  const referenceAIdata = await faceapi
    .detectAllFaces(referenceFace)
    .withFaceLandmarks()
    .withFaceDescriptors();
  
  let facesToCheckAIdata = await faceapi
    .detectAllFaces(facesToCheck)
    .withFaceLandmarks()
    .withFaceDescriptors();

  const faceMatcher = new faceapi.FaceMatcher(referenceAIdata);

  // Resize results to match the image being checked
  facesToCheckAIdata = faceapi.resizeResults(facesToCheckAIdata, facesToCheck);

  // Draw bounding boxes on the canvas
  facesToCheckAIdata.forEach((face) => {
    const { detection, descriptor } = face;
    const label = faceMatcher.findBestMatch(descriptor).toString();

    console.log(label);

    if (!label.includes('unknown')) {
      const name = document.getElementById('reference-name');
      const options = { label: name.innerHTML };
      const drawBox = new faceapi.draw.DrawBox(detection.box, options);
      drawBox.draw(canvas);
    }
  });
};

run();
