import React from 'react';
import styled from '@emotion/styled';
import { Avatar, Typography, Paper } from '@mui/material';

const MessageContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: ${({ isUser }) => (isUser ? 'flex-end' : 'flex-start')};
  margin-bottom: 16px;
`;

const MessageBubble = styled(Paper)`
  padding: 10px 20px;
  border-radius: ${({ isUser }) => (isUser ? '16px 16px 0px 16px' : '16px 16px 16px 0px')};
  background-color: ${({ isUser }) => (isUser ? '#4a90e2' : '#f1f1f1')};
  color: ${({ isUser }) => (isUser ? '#fff' : '#000')};
  max-width: 65%;
`;

const MessageTimestamp = styled(Typography)`
  color: ${({ isUser }) => (isUser ? '#ccc' : '#757575')};
  margin-top: 4px;
  text-align: ${({ isUser }) => (isUser ? 'right' : 'left')};
`;

const Message = ({ message }) => {
  const isUser = message.sender === 'user';
  const avatarUrl = isUser
    ? 'https://ui-avatars.com/api/?name=US&background=random'
    : 'https://ui-avatars.com/api/?name=BO&background=random';

  return (
    <MessageContainer isUser={isUser}>
      {!isUser && (
        <Avatar alt="Bot" src={avatarUrl} sx={{ marginRight: '8px' }} />
      )}
      <MessageBubble isUser={isUser} elevation={3}>
        <Typography variant="body1">
          {message.text}
        </Typography>
        <MessageTimestamp variant="caption" isUser={isUser}>
          {new Date(message.timestamp).toLocaleTimeString()}
        </MessageTimestamp>
      </MessageBubble>
      {isUser && (
        <Avatar alt="User" src={avatarUrl} sx={{ marginLeft: '8px' }} />
      )}
    </MessageContainer>
  );
};

export default Message;
