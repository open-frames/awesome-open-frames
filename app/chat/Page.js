import React, { useState, useEffect } from "react";
import { FloatingInbox } from "./FloatingInbox-frames";
import { ethers } from "ethers";

const InboxPage = () => {
  const [signer, setSigner] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false); // Add state for wallet connection

  const disconnectWallet = () => {
    localStorage.removeItem("walletConnected");
    localStorage.removeItem("signerAddress");
    setSigner(null);
    setWalletConnected(false);
  };

  const styles = {
    uContainer: {
      height: "100vh",
      backgroundColor: "#f9f9f9",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      zIndex: "1000",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
    },
    xmtpContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    },
    btnXmtp: {
      backgroundColor: "#f0f0f0",
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      color: "#000",
      justifyContent: "center",
      border: "1px solid grey",
      padding: "10px",
      borderRadius: "5px",
      fontSize: "14px",
    },
    HomePageWrapperStyle: {
      textAlign: "center",
      marginTop: "2rem",
    },
    ButtonStyledStyle: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "10px 20px",
      borderRadius: "5px",
      marginBottom: "2px",
      border: "none",
      textAlign: "left",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      color: "#333333",
      backgroundColor: "#ededed",
      fontSize: "12px",
    },
  };

  const getAddress = async (signer) => {
    try {
      return await signer?.getAddress();
    } catch (e) {
      console.log(e);
    }
  };
  const connectWallet = async () => {
    if (typeof window.ethereum !== undefined) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        setSigner(signer);
        setWalletConnected(true);
        let address = await getAddress(signer);
        localStorage.setItem("walletConnected", JSON.stringify(true)); // Save connection status in local storage
        localStorage.setItem("signerAddress", JSON.stringify(address)); // Save signer address in local storage
      } catch (error) {
        console.error("User rejected request", error);
      }
    } else {
      console.error("Metamask not found");
    }
  };

  useEffect(() => {
    const storedWalletConnected = localStorage.getItem("walletConnected");
    const storedSignerAddress = JSON.parse(
      localStorage.getItem("signerAddress"),
    );
    if (storedWalletConnected && storedSignerAddress) {
      setWalletConnected(JSON.parse(storedWalletConnected));
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      setSigner(signer);
    }
  }, []);

  return (
    <div style={styles.HomePageWrapperStyle}>
      <button
        className="home-button"
        style={{ ...styles.ButtonStyledStyle, marginLeft: 10 }}
        onClick={() => connectWallet()}>
        {walletConnected ? "Connected" : "Connect Wallet"}
      </button>
      {walletConnected && (
        <button
          className="home-button"
          style={{ ...styles.ButtonStyledStyle, marginLeft: 10 }}
          onClick={() => disconnectWallet()}>
          Logout
        </button>
      )}
      <h1>Chat Frames Quickstart</h1>
      <section className="App-section">
        <button
          className="home-button"
          style={styles.ButtonStyledStyle}
          onClick={() => window.FloatingInbox.open()}>
          Open
        </button>
        <button
          className="home-button"
          style={{ ...styles.ButtonStyledStyle, marginLeft: 10 }}
          onClick={() => window.FloatingInbox.close()}>
          Close
        </button>
      </section>

      <FloatingInbox env={process.env.REACT_APP_XMTP_ENV} wallet={signer} />
    </div>
  );
};

export default InboxPage;
