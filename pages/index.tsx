import { ConnectWallet } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import ContractVerificationButton from "../components/VerifyContract";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <ContractVerificationButton />
      </main>
    </div>
  );
};

export default Home;
