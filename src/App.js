import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createClient, configureChains, mainnet, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { polygonMumbai } from '@wagmi/chains';

import Balances from "./pages/Balances";
import Home from "./pages/Home";
import SignIn from './pages/SignIn';
import User from './pages/User';

import { CoinMarketProvider } from "./context/context";

const { provider, webSocketProvider } = configureChains(
  [mainnet, polygonMumbai],
  [publicProvider()],
)

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

const router = createBrowserRouter([
  {
    path: "/balances",
    element: <Balances />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/user',
    element: <User />,
  },
]);

function App() {
  return (
    <WagmiConfig client={client}>
      <CoinMarketProvider>
        <RouterProvider router={router} />
      </CoinMarketProvider>
    </WagmiConfig>
  );
}

export default App;