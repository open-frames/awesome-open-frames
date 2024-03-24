import React, { useState, useCallback, useRef, useEffect } from "react";
import { MessageInput } from "./MessageInput";
import {
  useMessages,
  useSendMessage,
  useStreamMessages,
  useClient,
} from "@xmtp/react-sdk";
import MessageItem from "./MessageItem";

export const MessageContainer = ({
  conversation,
  isPWA = false,
  isContained = false,
}) => {
  const messagesEndRef = useRef(null);

  const { client } = useClient();
  const { messages, isLoading } = useMessages(conversation);
  const [streamedMessages, setStreamedMessages] = useState([]);

  const styles = {
    messagesContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "100%",
      fontSize: isPWA == true ? "1.2em" : ".9em", // Increased font size
    },
    loadingText: {
      textAlign: "center",
    },
    messagesList: {
      paddingLeft: "5px",
      paddingRight: "5px",
      margin: "0px",
      alignItems: "flex-start",
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      overflowY: "auto",
    },
  };

  const onMessage = useCallback(
    (message) => {
      setStreamedMessages((prev) => [...prev, message]);
    },
    [streamedMessages]
  );

  useStreamMessages(conversation, { onMessage });
  const { sendMessage } = useSendMessage();

  useEffect(() => {
    setStreamedMessages([]);
  }, [conversation]);

  const handleSendMessage = async (newMessage) => {
    if (!newMessage.trim()) {
      alert("empty message");
      return;
    }
    if (conversation && conversation.peerAddress) {
      await sendMessage(conversation, newMessage);
    }
  };

  useEffect(() => {
    if (!isContained)
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div style={styles.messagesContainer}>
      {isLoading ? (
        <small style={styles.loadingText}>Loading messages...</small>
      ) : (
        <>
          <ul style={styles.messagesList}>
            {messages.slice().map((message) => {
              return (
                <MessageItem
                  isPWA={isPWA}
                  key={message.id}
                  message={message}
                  senderAddress={message.senderAddress}
                  peerAddress={conversation.peerAddress}
                  client={client}
                />
              );
            })}
            <div ref={messagesEndRef} />
          </ul>
          <MessageInput
            isPWA={isPWA}
            onSendMessage={(msg) => {
              handleSendMessage(msg);
            }}
          />
        </>
      )}
    </div>
  );
};
