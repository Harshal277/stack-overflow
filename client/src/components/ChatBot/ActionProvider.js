// in ActionProvider.jsx
import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleHello = () => {
    const botMessage = createChatBotMessage('Hello. Nice to meet you.');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleOtp = () => {
    const msg = "Enter your valid mobile number to receive an OTP, if OTP is valid then only you can login yourself"
    const botMessage = createChatBotMessage(msg);

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  }

  const handleAuth = () => {
    handleOtp()
    var msg = "You must have account to post or vote an question. 1) Click Login on top bar    2) Create account or login your account"
    const botMessage = createChatBotMessage(msg);

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  }

  const handleHelp = () => {
    const msg = "Enter these keywords - login, auth, otp, hello, questions"
    const botMessage = createChatBotMessage(msg);

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  }

  const handleQue = () => {
    const msg = "You can ask questions by clicking Ask Question button. Enter your question title, body and don't forget to enter tags"
    const botMessage = createChatBotMessage(msg);

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  }

  const handleBye = () => {
    const msg = "Nice taking to you, Bye"
    const botMessage = createChatBotMessage(msg);

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));  
  }

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            handleAuth,
            handleHelp,
            handleQue,
            handleOtp,
            handleBye
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;