# Crypto Survey App

This is a survey application developed using TypeScript and React, which connects to Metamask and a contract on the Goerli network using ethers.js. The application consists of three main pages: "Homepage," "SurveyForm," and "Results," and users can navigate between them using react-router-dom. The application also utilizes axios to make API calls to myJson, where the data is stored.

# Project Structure

The project is organized into three main folders:

- domain: Contains types and interfaces related to the domain entities.
- application: Here you can find functionalities related to each entity established in the domain.
- infrastructure: Contains contexts and API calls.

# Instructions for using the application:

- Make sure you have Metamask installed in your browser.
- Open the application and connect your Metamask account.
- The application will verify that you are on the Goerli network before proceeding.
- Once connected to Metamask and on the Goerli network, you can start answering the survey questions.
- After finishing the survey, you will be able to view the results.
- You will also have the option to send your response data to the contract and receive tokens in return.

# Pages:

- Homepage: On this page, users can connect their Metamask account and ensure they are on the Goerli network to participate in the survey.
- SurveyForm: This page allows users to answer the survey questions.
- Results: Once the survey is completed, users can view the results and send their responses to the contract to receive tokens in return.

# Dependencies:

- React (https://es.react.dev/)
- TypeScript (https://www.typescriptlang.org/)
- ethers.js (https://docs.ethers.org/v5/)
- react-router-dom (https://reactrouter.com/en/main)
- axios (https://axios-http.com/docs/intro)
- myJson (https://myjson.online/)
