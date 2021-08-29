/* eslint-disable no-invalid-this */
import {POSES} from 'utils/constants';
import ml5 from 'ml5';

class FaceRecognitionModel {
  face = undefined;
  model = undefined;
  pose = POSES.FACING_FRONT;

  setup = (p5) => {
    p5.createCanvas(0, 0);
    const video = p5.createCapture(p5.VIDEO);
    video.size(0, 0);
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

    if (result?.[0]) {
      const [{parts, landmarks}] = result;
      this.face = {parts, landmarks};

      if (this.isFacingAway()) {
        this.pose = POSES.FACING_AWAY;
      } else if (this.isSmiling()) {
        this.pose = POSES.SMILING;
      } else {
        this.pose = POSES.FACING_FRONT;
      }
    }

    this.model.detect(this.gotFaces);
  };

  isFacingAway = () => {
    const {jawOutline} = this.face.parts;
    const threshold = 145;
    const size = jawOutline.length - 1;
    const pointsToTest = 3;

    let i = 0;
    while (i < pointsToTest) {
      if (Math.abs(jawOutline[size - i]._x - jawOutline[i]._x) > threshold) {
        return false; // At least one comparison is within threshold.
      }
      ++i;
    }

    return true;
  };

  isSmiling = () => {
    const {mouth} = this.face.parts;
    const threshold = 2;
    const pairsToTest = [
      [0, 2],
      [4, 6],
    ];

    if (mouth) {
      for (let i = 0; i < pairsToTest.length; ++i) {
        const [a, b] = pairsToTest[i];
        if (Math.abs(mouth[a]._y - mouth[b]._y) > threshold) {
          return false; // At least one comparison is within threshold.
        }
      }

      return true;
    }

    return false;
  };
}

export default FaceRecognitionModel;
