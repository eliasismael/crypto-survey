import "../App.css";

import HomePage from "../pages/HomePage/page/HomePage";
import SurveyForm from "../pages/SurveyForm/page/SurveyForm";
import Results from "../pages/Results/page/Results";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { useWalletContext } from "../infrastructure/connections/wallet/context/walletContext";
import { getUserInstance } from "./use-cases/User/getInstance";

function App(): JSX.Element {
    // To use the same user instance to all the components
    const { currentAccount } = useWalletContext();
    const user = getUserInstance(currentAccount);

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route
                        path="/survey"
                        element={<SurveyForm user={user} />}
                    />
                    <Route path="/results" element={<Results user={user} />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
