import React from "react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { CronosBeta } from "@thirdweb-dev/chains";
import styles from "../styles/Airdrop.module.css";

class ContractVerificationButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contractAddress: "",
      explorerAPIUrl: "",
      explorerAPIKey: "",
      network: "",
      verificationStatus: "",
      isVerifying: false
    };
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  verifyContract = async () => {
    const {
      contractAddress,
      explorerAPIUrl,
      explorerAPIKey,
      network
    } = this.state;

    const sdk = new ThirdwebSDK(network || CronosBeta); // Use CronosBeta if network is empty

    try {
      this.setState({ isVerifying: true, verificationStatus: "" });
      await sdk.verifier.verifyContract(
        contractAddress,
        explorerAPIUrl,
        explorerAPIKey
      );
      this.setState({ verificationStatus: "Contract Verified" });
    } catch (error) {
      console.error(error);
      this.setState({ verificationStatus: "Verification Failed" });
    } finally {
      this.setState({ isVerifying: false });
    }
  };

  render() {
    const {
      contractAddress,
      explorerAPIUrl,
      explorerAPIKey,
      network,
      verificationStatus,
      isVerifying
    } = this.state;

    return (
      <div>
        <div>
          <label>Contract Address:</label>
          <input
            type="text"
            name="contractAddress"
            placeholder="Enter token address 0x.."
            value={contractAddress}
            onChange={this.handleInputChange}
            className={styles.inputStyle}
          />
        </div>
        <div>
          <label>Explorer API URL:</label>
          <input
            type="text"
            name="explorerAPIUrl"
            placeholder="e.g. https://api.etherscan.io/api"
            value={explorerAPIUrl}
            onChange={this.handleInputChange}
            className={styles.inputStyle}
          />
        </div>
        <div>
          <label>Explorer API Key:</label>
          <input
            type="text"
            name="explorerAPIKey"
            placeholder="Generate API key on the explorer"
            value={explorerAPIKey}
            onChange={this.handleInputChange}
            className={styles.inputStyle}
          />
        </div>
        <div>
          <label>Network:</label>
          <input
            type="text"
            name="network"
            placeholder="Network the contract you are verifying is on"
            value={network}
            onChange={this.handleInputChange}
            className={styles.inputStyle}
          />
        </div>

        <div className={styles.card}>
          <button
            className={styles.button}
            onClick={this.verifyContract}
            disabled={isVerifying}
          >
            {isVerifying ? "Verifying Contract..." : "Verify Contract"}
          </button>
          <p>{verificationStatus}</p>
        </div>
      </div>
    );
  }
}

export default ContractVerificationButton;
