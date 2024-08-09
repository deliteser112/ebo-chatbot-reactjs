import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { fetchWitAiResponse } from "../api/witai";
import { addMessage } from "../redux/slices/messageSlice";
import Message from "./Message";
import {
  Box,
  TextField,
  Button,
  List,
  Typography,
  Avatar,
} from "@mui/material";

const ChatContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #f4f5f7;
  padding: 16px 16px;
`;

const ChatWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 800px;
  height: calc(100% - 32px);
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Header = styled(Box)`
  width: 100%;
  max-width: 800px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #3f51b5;
  color: white;
  border-radius: 8px 8px 0 0;
`;

const MessagesContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100% - 64px);
  padding: 16px;
  overflow-y: auto;
  margin-bottom: 16px;
`;

const TypingIndicator = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const FormContainer = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 800px;
  padding: 16px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.1);
`;

const ChatBox = () => {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messages = useSelector((state) => state.messages);
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);

  const handleSend = async () => {
    if (input.trim()) {
      dispatch(
        addMessage({ text: input, sender: "user", timestamp: Date.now() })
      );
      setInput("");
      setIsTyping(true);

      try {
        const botResponse = await fetchWitAiResponse(input);
        setIsTyping(false);
        dispatch(
          addMessage({
            text: botResponse,
            sender: "bot",
            timestamp: Date.now(),
          })
        );
      } catch (error) {
        setIsTyping(false);
        console.error("Error fetching wit.ai response:", error);
        dispatch(
          addMessage({
            text: "Error fetching response from wit.ai.",
            sender: "bot",
            timestamp: Date.now(),
          })
        );
      }
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (messages.length === 0) {
      dispatch(
        addMessage({
          text: "Hello! How can I assist you today?",
          sender: "bot",
          timestamp: Date.now(),
        })
      );
    }
  }, [dispatch, messages.length]);

  return (
    <ChatContainer>
      <ChatWrapper>
        <Header>
          <Typography variant="h6">Chat with Bot</Typography>
          <Button sx={{ color: "white" }}>Close</Button>
        </Header>
        <MessagesContainer>
          <List sx={{ flexGrow: 1 }}>
            {messages.map((msg, index) => (
              <Message key={index} message={msg} />
            ))}
            {isTyping && (
              <TypingIndicator>
                <Avatar
                  alt="Bot"
                  src="https://readwrite.com/wp-content/uploads/2023/06/Screenshot-2023-06-22-at-9.35.28-AM.jpg"
                  sx={{ marginRight: "8px" }}
                />
                <Typography variant="body1" sx={{ color: "#757575" }}>
                  Bot is typing...
                </Typography>
              </TypingIndicator>
            )}
            <div ref={messagesEndRef} />
          </List>
        </MessagesContainer>
        <FormContainer
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message... (e.g., 'What is React Hooks?')"
            sx={{
              marginRight: "8px",
              "& .MuiInputBase-root": { borderRadius: 60, paddingLeft: 2 },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
          >
            Send
          </Button>
        </FormContainer>
      </ChatWrapper>
    </ChatContainer>
  );
};

export default ChatBox;
