/* eslint-disable valid-jsdoc */
import React, {useEffect, useState} from 'react';
import FaceRecognitionService from 'utils/face-recognition-model';
import Sketch from 'react-p5';
import {POSES} from 'utils/constants';
import {WordSection} from './elements';

const onKeyPressed = (p5, event) => {
  if (!p5 || !event) return;

  if (event.key === 'p') {
    console.log('Play/Pause');
  }

  if (event.key === 'ArrowRight') {
    console.log('Increase speed');
  }

  if (event.key === 'ArrowLeft') {
    console.log('Decrease speed');
  }
};

const Dashboard = () => {
  const [FRS, setFRS] = useState();
  const [pose, setPose] = useState();
  const [currentWord, setCurrentWord] = useState();
  const [text, setText] = useState('');
  const [words, setWords] = useState([]);

  const getText = () => {
    const message = {message: 'GET_SELECTED_TEXT'};

    const queryInfo = {
      active: true,
      currentWindow: true,
    };

    /**
     * We can't use "chrome.runtime.sendMessage" for sending messages from React.
     * For sending messages from React we need to specify which tab to send it to.
     */
    chrome.tabs?.query(queryInfo, (tabs) => {
      const currentTabId = tabs[0].id;
      /**
       * Sends a single message to the content script(s) in the specified tab,
       * with an optional callback to run when a response is sent back.
       *
       * The runtime.onMessage event is fired in each content script running
       * in the specified tab for the current extension.
       */
      chrome.tabs.sendMessage(currentTabId, message, (response) => {
        setText(response);
      });
    });
  };

  useEffect(getText, []);

  useEffect(() => {
    setFRS(new FaceRecognitionService());
  }, []);

  useEffect(() => {
    if (pose === POSES.FACING_FRONT) {
      console.log('Play');
    } else {
      console.log('Pause');
    }
  }, [pose]);

  useEffect(() => {
    const wordsToSet = text?.split(' ');
    setCurrentWord(wordsToSet?.[0]);
    setWords(wordsToSet);
    console.log(words);
  }, [text]);

  return (
    <div style={{width: 500, height: 1000}}>
      {FRS && (
        <Sketch
          setup={FRS.setup}
          keyPressed={onKeyPressed}
          draw={() => setPose(FRS.pose)}
        />
      )}
      <WordSection>{currentWord}</WordSection>
      {/* <TextSection>{text}</TextSection> */}
    </div>
  );
};

export default Dashboard;
