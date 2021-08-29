/* eslint-disable valid-jsdoc */
import React, {useState, useEffect} from 'react';

const Dashboard = () => {
  const [selectedText, setSelectedText] = useState();

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
        console.info(response);
        setSelectedText(response);
      });
    });
  };

  useEffect(getText, []);

  return <div>{selectedText}</div>;
};

export default Dashboard;
