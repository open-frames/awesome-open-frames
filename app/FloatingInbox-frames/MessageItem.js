import React, { useState, useEffect } from "react";
import { useClient } from "@xmtp/react-sdk";
import { Frame } from "../Frames/Frame";
import {
  getFrameTitle,
  isValidFrame,
  getOrderedButtons,
  isXmtpFrame,
} from "../Frames/FrameInfo";
import { FramesClient } from "@xmtp/frames-client";
import { readMetadata } from "../Frames/openFrames"; // Ensure you have this helper or implement it

const MessageItem = ({
  message,
  peerAddress,
  senderAddress,
  isPWA = false,
}) => {
  const { client } = useClient();
  const [isLoading, setIsLoading] = useState(true);
  const [frameMetadata, setFrameMetadata] = useState();
  const [frameButtonUpdating, setFrameButtonUpdating] = useState(0);
  const [textInputValue, setTextInputValue] = useState("");

  function onTextInputChange(event) {
    // Update the state or variable here
    setTextInputValue(event.target.value); // Assuming you're using React hooks
  }

  const conversationTopic = message.conversationTopic;

  const handleFrameButtonClick = async (buttonIndex, action = "post") => {
    console.log(buttonIndex, action);
    if (!frameMetadata || !client || !frameMetadata?.frameInfo?.buttons) {
      return;
    }
    const { frameInfo, url: frameUrl } = frameMetadata;
    if (!frameInfo.buttons) {
      return;
    }
    const button = frameInfo.buttons[buttonIndex];
    console.log(buttonIndex, frameInfo.buttons[buttonIndex]);

    setFrameButtonUpdating(buttonIndex);
    const framesClient = new FramesClient(client);
    const postUrl = button.target || frameInfo.postUrl || frameUrl;
    const payload = await framesClient.signFrameAction({
      frameUrl,
      inputText: textInputValue || undefined,
      buttonIndex,
      conversationTopic,
      participantAccountAddresses: [peerAddress, client.address],
    });
    if (action === "post") {
      const updatedFrameMetadata = await framesClient.proxy.post(
        postUrl,
        payload,
      );
      setFrameMetadata(updatedFrameMetadata);
    } else if (action === "post_redirect") {
      const { redirectedTo } = await framesClient.proxy.postRedirect(
        postUrl,
        payload,
      );
      window.open(redirectedTo, "_blank");
    } else if (action === "link" && button?.target) {
      window.open(button.target, "_blank");
    }
    setFrameButtonUpdating(0);
  };

  useEffect(() => {
    const fetchMetadata = async () => {
      setIsLoading(true);
      //Render localhost frames
      /*if (message.content.includes("localhost")) {
        const metadata = await readMetadata(message.content); // Ensure you have implemented this function
        if (metadata) {
          setFrameMetadata(metadata);
        }
      }*/
      if (typeof message.content === "string") {
        const words = message.content.split(/(\r?\n|\s+)/);
        const urlRegex =
          /^(http[s]?:\/\/)?([a-z0-9.-]+\.[a-z0-9]{1,}\/.*|[a-z0-9.-]+\.[a-z0-9]{1,})$/i;

        await Promise.all(
          words.map(async (word) => {
            const isUrl = !!word.match(urlRegex)?.[0];
            if (isUrl) {
              const metadata = await readMetadata(word); // Ensure you have implemented this function
              if (metadata) {
                setFrameMetadata(metadata);
              }
            }
          }),
        );
      }
      setIsLoading(false);
    };
    fetchMetadata();
  }, [message?.content]);

  const styles = {
    messageContent: {
      backgroundColor: "lightblue",
      padding: isPWA == true ? "10px 20px" : "5px 10px",
      alignSelf: "flex-start",
      textAlign: "left",
      display: "inline-block",
      margin: isPWA == true ? "10px" : "5px",
      borderRadius: isPWA == true ? "10px" : "5px",
      maxWidth: "80%",
      wordBreak: "break-word",
      cursor: "pointer",
      listStyle: "none",
    },
    renderedMessage: {
      fontSize: isPWA == true ? "16px" : "12px",
      wordBreak: "break-word",
      padding: "0px",
    },
    senderMessage: {
      alignSelf: "flex-start",
      textAlign: "left",
      listStyle: "none",
      width: "100%",
    },
    receiverMessage: {
      alignSelf: "flex-end",
      listStyle: "none",
      textAlign: "right",
      width: "100%",
    },
    footer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    timeStamp: {
      fontSize: isPWA == true ? "12px" : "8px",
      color: "grey",
    },
  };

  const renderMessage = (message) => {
    try {
      if (message?.content.length > 0) {
        return <div style={styles.renderedMessage}>{message?.content}</div>;
      }
    } catch {
      return message?.contentFallback ? (
        message?.contentFallback
      ) : (
        <div style={styles.renderedMessage}>{message?.content}</div>
      );
    }
  };

  const isSender = senderAddress === client?.address;

  const showFrame = isValidFrame(frameMetadata);

  return (
    <li
      style={isSender ? styles.senderMessage : styles.receiverMessage}
      key={message.id}>
      <div style={styles.messageContent}>
        {!frameMetadata?.frameInfo && renderMessage(message)}
        {isLoading && <div>Loading...</div>}
        {showFrame && !isLoading && frameMetadata?.frameInfo && (
          <Frame
            image={frameMetadata?.frameInfo?.image.content}
            title={getFrameTitle(frameMetadata)}
            buttons={getOrderedButtons(frameMetadata)}
            handleClick={handleFrameButtonClick}
            frameButtonUpdating={frameButtonUpdating}
            interactionsEnabled={isXmtpFrame(frameMetadata)}
            textInput={frameMetadata?.frameInfo?.textInput?.content}
            onTextInputChange={onTextInputChange}
          />
        )}
        <div style={styles.footer}>
          <span style={styles.timeStamp}>
            {`${new Date(message.sentAt).getHours()}:${String(
              new Date(message.sentAt).getMinutes(),
            ).padStart(2, "0")}`}
          </span>
        </div>
      </div>
    </li>
  );
};
export default MessageItem;
