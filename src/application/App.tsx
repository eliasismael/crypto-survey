import "./App.css";

import HomePage from "../domain/components/HomePage/HomePage";
import SurveyForm from "../domain/components/SurveyForm/SurveyForm";
import Results from "../domain/components/Results/Results";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { useWalletContext } from "../infrastructure/contexts/walletConnectionContext";
import { getUserInstance } from "./User";

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
