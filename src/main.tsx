import React from "react";
import ReactDOM from "react-dom/client";
import App from "./application/App.tsx";

// Contexts
import { WalletConnectionProvider } from "./infrastructure/connections/wallet/context/walletContext.tsx";
import { ContractContextProvider } from "./infrastructure/connections/contract/context/contractContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <WalletConnectionProvider>
      <ContractContextProvider>
        <App />
      </ContractContextProvider>
    </WalletConnectionProvider>
  </React.StrictMode>
);
