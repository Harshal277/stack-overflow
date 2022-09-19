// in MessageParser.js
import React from 'react';

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
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