/* eslint-disable valid-jsdoc */
/* eslint-disable */

import React, {Fragment, useEffect, useRef, useState} from 'react';
import FaceRecognitionService from 'utils/face-recognition-model';
import Sketch from 'react-p5';
import {POSES} from 'utils/constants';
import {Button, message, Tag} from 'antd';
import {
  Controls,
  CurrentWordSmall,
  Image,
  InformationSection,
  KeywordsSection,
  NotFoundContainer,
  NotFoundText,
  TextSection,
  WordSmall,
} from './elements';
import {
  DownCircleOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  UpCircleOutlined,
} from '@ant-design/icons';
import keywordExtractor from 'keyword-extractor';
import Reader from './reader';

const onKeyPressed = (p5, event, setSpeed, setShouldRead, readerRef) => {
  if (!p5 || !event) return;

  if (event.key === 'p') {
    setShouldRead(!readerRef.current?.state.isPlaying);
  }

  if (event.key === 'ArrowRight') {
    setSpeed((prev) => Math.max(prev + 25, 25));
  }

  if (event.key === 'ArrowLeft') {
    setSpeed((prev) => Math.max(prev - 25, 25));
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

const shouldScroll = (textRef, id) => {
  const lastWord = document.getElementById(id);
  const textLocation = textRef.current?.getBoundingClientRect();
  const lastWordLocation = lastWord?.getBoundingClientRect();

  if (textLocation && lastWordLocation) {
    if (textLocation.bottom <= lastWordLocation.top) {
      const ref = textRef.current;
      ref.scrollTop += 50;
    }
  }
};

const onFinish = () => {
  message.success('Your reading is done!');
  setTimeout(() => {
    window.close();
  }, 3000);
};

const Dashboard = () => {
  const readerRef = useRef();
  const textRef = useRef();
  const [FRS, setFRS] = useState();
  const [pose, setPose] = useState();
  const [text, setText] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [speed, setSpeed] = useState(150);
  const [shouldRead, setShouldRead] = useState(false);

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
    if (pose === POSES.FACING_FRONT && shouldRead) {
      readerRef.current?.play();
    } else {
      readerRef.current?.pause();
    }
  }, [pose, shouldRead]);

  useEffect(() => {
    loadKeywords(text, setKeywords);
  }, [text]);

  return (
    <div style={{width: 500, height: '75vh', overflow: 'scroll'}}>
      {FRS && (
        <Sketch
          setup={FRS.setup}
          keyPressed={(p5, event) =>
            onKeyPressed(p5, event, setSpeed, setShouldRead, readerRef)
          }
          draw={() => setPose(FRS.pose)}
        />
      )}
      {text && (
        <Reader
          ref={readerRef}
          speed={speed}
          inputText={text}
          onFinish={onFinish}
        />
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
          <TextSection ref={textRef}>
            {readerRef.current?.state.words.map((word, index) => {
              const id = word + index;
              if (index === readerRef.current?.state.currentPosition - 1) {
                shouldScroll(textRef, id);
                return (
                  <Fragment key={id}>
                    <CurrentWordSmall id={id}>{word}</CurrentWordSmall>
                  </Fragment>
                );
              } else {
                return (
                  <Fragment key={id}>
                    <WordSmall
                      id={id}
                      onClick={() => {
                        readerRef.current?.setCurrentPosition(index);
                      }}
                    >
                      {word}{' '}
                    </WordSmall>{' '}
                  </Fragment>
                );
              }
            })}
          </TextSection>
          <InformationSection>WPM: {speed}</InformationSection>
          <Controls>
            <Button
              style={{boxShadow: '0px 5px 5px #0f0f0f'}}
              ghost
              danger
              icon={<DownCircleOutlined />}
              size="large"
              onClick={() => setSpeed((prev) => Math.max(prev - 25, 25))}
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
              onClick={() => setShouldRead(!readerRef.current?.state.isPlaying)}
            />
            <Button
              style={{boxShadow: '0px 5px 5px #0f0f0f'}}
              ghost
              danger
              icon={<UpCircleOutlined />}
              size="large"
              onClick={() => setSpeed((prev) => Math.max(prev + 25, 25))}
            />
          </Controls>
        </>
      ) : (
        <NotFoundContainer>
          <Image src="/static/no-words.svg" />
          <NotFoundText>No hay texto seleccionado</NotFoundText>
        </NotFoundContainer>
      )}
    </div>
  );
};

export default Dashboard;
