import { OpenFramesProxy } from "@xmtp/frames-client";

const proxy = new OpenFramesProxy();
const BUTTON_INDEX_REGEX = /fc:frame:button:(\d)(?:$|:).*/;

export const readMetadata = async (url) => proxy.readMetadata(url);

export const mediaUrl = (url) => proxy.mediaUrl(url);

export const getButtonIndex = (property) => {
  const matches = property.match(BUTTON_INDEX_REGEX);
  if (matches?.length === 2) {
    return parseInt(matches[1], 10);
  }
  return undefined;
};
