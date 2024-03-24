import { PROTOCOL_VERSION } from "@xmtp/frames-client";

const OG_TITLE_TAG = "og:title";

export function getOrderedButtons(metadata) {
  if (!metadata) {
    return false;
  }
  const buttonMap = metadata?.frameInfo?.buttons;

  if (!buttonMap) {
    return [];
  }

  return Object.keys(buttonMap)
    .sort()
    .map((key) => {
      const button = buttonMap[key];
      return {
        ...button,
        buttonIndex: parseInt(key, 10),
      };
    });
}

export function isXmtpFrame(metadata) {
  if (!metadata) {
    return false;
  }
  const minXmtpVersion = metadata.frameInfo?.acceptedClients?.xmtp;

  return (
    !!minXmtpVersion &&
    minXmtpVersion.length > 0 &&
    minXmtpVersion <= PROTOCOL_VERSION
  );
}

export function isValidFrame(metadata) {
  if (!metadata) {
    return false;
  }
  // NOTE: This is more lenient than the Farcaster spec, which lists the og:image tag as required
  const hasImage = !!metadata.frameInfo?.image || !!metadata.frameInfo?.ogImage;

  return !!metadata?.frameInfo && hasImage;
}

export function getFrameTitle(metadata) {
  if (!metadata) {
    return false;
  }
  return metadata.extractedTags[OG_TITLE_TAG] || "";
}
