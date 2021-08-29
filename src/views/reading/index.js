/*eslint-disable */

import React from 'react';
import Sketch from 'react-p5';
import ml5 from 'ml5';
import FaceRecognitionService from 'utils/face-recognition-model';

let faceapi;
let face;

const FaceRecognition = () => {
  const gotFaces = (error, result) => {
    if (error) {
      console.log(error);
      return;
    }

    if (result) {
      const [{parts, landmarks}] = result;
      face = {parts, landmarks};
      console.log(face);
      faceapi.detect(gotFaces);
    }
  };

  const onModelLoad = () => {
    if (faceapi.ready) {
      faceapi.detect(gotFaces);
    }
  };

  const setup = (p5) => {
    const video = p5.createCapture(p5.VIDEO);
    video.hide();

    const faceOptions = {
      withLandmarks: true,
      withExpressions: false,
      withDescriptors: false,
    };
    faceapi = ml5.faceApi(video, faceOptions, onModelLoad);
  };

  return <Sketch setup={setup} />;
};

const Reading = () => {
  const FRS = new FaceRecognitionService();

  return (
    <>
      <Sketch setup={FRS.setup} />
      <div>Reading view</div>
    </>
  );
};

export default Reading;
