import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { CreateVoting, CreateVotingBlockchain, ErrorPage, Home, SignIn, Voting, VotingBlockchain } from './pages';
import { Layout } from './features/index.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path='*' element={<ErrorPage />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/create-voting" element={<CreateVoting />} />
          <Route path="/create-voting-blockchain" element={<CreateVotingBlockchain />} />
          <Route path="/voting/:id" element={<Voting />} />
          <Route path="/voting-blockchain/:id" element={<VotingBlockchain />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
