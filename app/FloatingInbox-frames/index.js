import Home from "./Home";
import { XMTPProvider } from "@xmtp/react-sdk";

export function FloatingInbox({
  isPWA = false,
  wallet,
  onLogout,
  isContained = false,
  isConsent = false,
}) {
  return (
    <XMTPProvider>
      <Home
        isPWA={isPWA}
        wallet={wallet}
        onLogout={onLogout}
        isConsent={isConsent}
        isContained={isContained}
      />
    </XMTPProvider>
  );
}
