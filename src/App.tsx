import { useCallback, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useInterval } from "usehooks-ts";

function App() {
  const [count, setCount] = useState(0);

  const [chainId, setChainId] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [signature, setSignature] = useState<string>("");
  useInterval(async () => {
    if (window.keplr && chainId) {
      const key = await window.keplr.getKey(chainId);
      setAddress(key.bech32Address);
    }
  }, 1000);

  const signMessage = useCallback(async () => {
    if (window.keplr) {
      if (!chainId) {
        window.alert("Please enter chain ID first");
        return;
      }

      if (!message) {
        window.alert("Please enter message first");
        return;
      }

      if (!address) {
        window.alert(
          "Please connect wallet first or refresh page and try again"
        );
        return;
      }

      const key = await window.keplr.getKey(chainId);
      const signature = await window.keplr.signArbitrary(
        chainId,
        key.bech32Address,
        message
      );
      setSignature(signature.signature);
    } else {
      window.alert("Please install and connect Keplr");
    }
  }, [chainId, address, message]);

  return (
    <>
      <h1>Keplr Sign Message</h1>

      <div>
        <div style={{ marginBottom: "10px" }}>
          <div>Chain ID</div>
          <input
            type="text"
            value={chainId}
            onChange={(e) => setChainId(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <div>Wallet Address</div>
          <input
            type="text"
            disabled
            value={address}
            style={{ width: "100%" }}
            placeholder="Please enter chain ID first"
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <div>Message</div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ width: "100%", height: "100px" }}
          />
        </div>
        <button onClick={signMessage}>Sign Message</button>

        <hr />

        <div>
          <div>Signature</div>
          <textarea
            disabled
            value={signature}
            style={{ width: "100%", height: "100px" }}
          />
        </div>
      </div>
    </>
  );
}

export default App;
