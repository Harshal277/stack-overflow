// in MessageParser.js
import React from 'react';
import searchData from './GoogleSearch.js'

const MessageParser = ({ children, actions }) => {
  const parse = async (message) => {
    message = message.toLowerCase()

    if (message.indexOf('hello') !== -1 || message.indexOf('hi') !== -1 || message.indexOf('hey') !== -1) {
      actions.handleHello();
    } 
    if(message.indexOf('login') !== -1 || message.indexOf('auth') !== -1){
      actions.handleAuth();
    }
    if(message.indexOf('help') !== -1){
        actions.handleHelp();
    }
    if(message.indexOf('questions') !== -1 || message.indexOf('question') !== -1){
      actions.handleQue();
    }
    if(message.indexOf('otp') !== -1 || message.indexOf('mobile') !== -1){
      actions.handleOtp();
    }
    if(message.indexOf('bye') !== -1 || message.indexOf('ok') !== -1){
      actions.handleBye();
    }
    else{
      const data = await searchData(message)
      console.log(data);
      actions.handleSearch(data.items[0].snippet);
      actions.handleSearch(data.items[1].snippet);
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;