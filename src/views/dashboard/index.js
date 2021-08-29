/* eslint-disable valid-jsdoc */
import React, {Fragment, useEffect, useState} from 'react';
import FaceRecognitionService from 'utils/face-recognition-model';
import Sketch from 'react-p5';
import {POSES} from 'utils/constants';
import {Tag, Button} from 'antd';
import {
  WordSection,
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
  DownOutlined,
  UpOutlined,
  PauseOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
import keywordExtractor from 'keyword-extractor';

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

const wordsPerMinuteToMs = (wpm) => {
  return 600000 / wpm;
};

const Dashboard = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const [FRS, setFRS] = useState();
  const [pose, setPose] = useState();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [words, setWords] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [pause, setPause] = useState(true);
  const [wpm, setWpm] = useState(wordsPerMinuteToMs(200));

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
      setPause(false);
    } else {
      console.log('Pause');
      setPause(true);
    }
  }, [pose]);

  useEffect(() => {
    const wordsToSet = text?.split(' ');
    setCurrentWord(wordsToSet?.[0]);
    setWords(wordsToSet);
    loadKeywords(text, setKeywords);
  }, [text]);

  useEffect(() => {
    console.log(wpm);
    if (words.length) {
      const interval = setInterval(() => {
        setPause((isPaused) => {
          if (currentWordIndex < words.length && !isPaused) {
            setCurrentWordIndex((prev) => {
              setCurrentWord(words[prev]);
              return prev + 1;
            });
          }
          return isPaused;
        });
      }, wpm);

      return () => clearInterval(interval);
    }

    return () => {};
  }, [words, wpm]);

  return (
    <div style={{width: 500, height: 900, overflow: scroll}}>
      {FRS && (
        <Sketch
          setup={FRS.setup}
          keyPressed={onKeyPressed}
          draw={() => setPose(FRS.pose)}
        />
      )}
      {words.length > 1 ? (
        <>
          <WordSection>{currentWord}</WordSection>
          <KeywordsSection>
            {keywords.map((keyword) => (
              <Tag color="#87d068" key={keyword}>
                {keyword}
              </Tag>
            ))}
          </KeywordsSection>
          <TextSection>
            {words.map((word, index) =>
              index === currentWordIndex ? (
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
              ghost
              danger
              icon={<DownOutlined />}
              size="large"
              onClick={() => setWpm(wordsPerMinuteToMs(wpm - 25))}
            />
            <Button
              ghost
              danger
              icon={!pause ? <PlayCircleOutlined /> : <PauseOutlined />}
              size="large"
            />
            <Button
              ghost
              danger
              icon={<UpOutlined />}
              size="large"
              onClick={() => setWpm(wordsPerMinuteToMs(wpm - 25))}
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
