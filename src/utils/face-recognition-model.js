import ml5 from 'ml5';

class FaceRecognitionModel {
  face = undefined;
  model = undefined;

  setup = (p5) => {
    const video = p5.createCapture(p5.VIDEO);
    video.hide();

    const faceOptions = {
      withLandmarks: true,
      withExpressions: false,
      withDescriptors: false,
    };
    this.model = ml5.faceApi(video, faceOptions, this.onModelLoad);
  };

  onModelLoad = () => {
    if (this.model.ready) {
      this.model.detect(this.gotFaces);
    }
  };

  gotFaces = (error, result) => {
    if (error) {
      console.log(error);
      return;
    }

    if (result) {
      const [{parts, landmarks}] = result;
      this.face = {parts, landmarks};
      console.log(this.face);
      this.model.detect(this.gotFaces);
    }
  };
}

export default FaceRecognitionModel;
