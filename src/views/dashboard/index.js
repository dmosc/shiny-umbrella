/* eslint-disable valid-jsdoc */
import React, {Fragment, useEffect, useState, useRef} from 'react';
import FaceRecognitionService from 'utils/face-recognition-model';
import Sketch from 'react-p5';
import {POSES} from 'utils/constants';
import {Tag, Button} from 'antd';
import {
  TextSection,
  Controls,
  Image,
  NotFoundContainer,
  NotFoundText,
  WordSmall,
  CurrentWordSmall,
  KeywordsSection,
} from './elements';
import {
  DownCircleOutlined,
  UpCircleOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
import keywordExtractor from 'keyword-extractor';
import Reader from './reader';

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

const loadKeywords = (text, setKeywords) => {
  const extractedKeywords = keywordExtractor.extract(text, {
    return_chained_words: true,
    remove_duplicates: true,
  });

  const keywordsToSet = extractedKeywords.filter((keyword) => {
    const wordCount = keyword.split(' ').length;
    return (
      keyword[0].toUpperCase() === keyword[0] ||
      (wordCount > 1 && wordCount <= 3)
    );
  });

  setKeywords(keywordsToSet.slice(0, 5));
};

const Dashboard = () => {
  const readerRef = useRef();
  const [FRS, setFRS] = useState();
  const [pose, setPose] = useState();
  const [text, setText] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [speed, setSpeed] = useState(150);

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
      readerRef.current?.play();
    } else {
      readerRef.current?.pause();
    }
  }, [pose]);

  useEffect(() => {
    loadKeywords(text, setKeywords);
  }, [text]);

  console.log(speed);

  return (
    <div style={{width: 500, height: '75vh', overflow: 'scroll'}}>
      {FRS && (
        <Sketch
          setup={FRS.setup}
          keyPressed={onKeyPressed}
          draw={() => setPose(FRS.pose)}
        />
      )}
      {text && (
        <Reader ref={readerRef} autoPlay speed={speed} inputText={text} />
      )}
      {readerRef.current?.state.words.length > 1 ? (
        <>
          <KeywordsSection>
            {keywords.map((keyword) => (
              <Tag color="#f54747" style={{color: 'black'}} key={keyword}>
                {keyword}
              </Tag>
            ))}
          </KeywordsSection>
          <TextSection>
            {readerRef.current?.state.words.map((word, index) =>
              index === readerRef.current?.state.currentPosition - 1 ? (
                <Fragment key={word + index}>
                  <CurrentWordSmall>{word}</CurrentWordSmall>{' '}
                </Fragment>
              ) : (
                <Fragment key={word + index}>
                  <WordSmall>{word} </WordSmall>{' '}
                </Fragment>
              ),
            )}
          </TextSection>
          <Controls>
            <Button
              style={{boxShadow: '0px 5px 5px #0f0f0f'}}
              ghost
              danger
              icon={<DownCircleOutlined />}
              size="large"
              onClick={() => setSpeed((prev) => prev - 25)}
            />
            <Button
              style={{boxShadow: '0px 5px 5px #0f0f0f'}}
              ghost
              danger
              icon={
                !readerRef.current?.state.isPlaying ? (
                  <PlayCircleOutlined />
                ) : (
                  <PauseCircleOutlined />
                )
              }
              size="large"
            />
            <Button
              style={{boxShadow: '0px 5px 5px #0f0f0f'}}
              ghost
              danger
              icon={<UpCircleOutlined />}
              size="large"
              onClick={() => setSpeed((prev) => prev + 25)}
            />
          </Controls>
        </>
      ) : (
        <NotFoundContainer>
          <Image src="./static/no-words.svg" />
          <NotFoundText>No hay texto seleccionado</NotFoundText>
        </NotFoundContainer>
      )}
    </div>
  );
};

export default Dashboard;
