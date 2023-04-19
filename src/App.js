import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createClient, configureChains, mainnet, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { polygonMumbai } from '@wagmi/chains';

import Balances from "./pages/Balances";
import Home from "./pages/Home";
import SignIn from './pages/SignIn';
import User from './pages/User';
import Info from './pages/currencies/Info';

import { CoinMarketProvider } from "./context/context";
import { GunProvider } from './context/gunContext'

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
  {
    path: '/product/info/:id',
    element: <Info />,
  },
]);

function App() {
  return (
    <WagmiConfig client={client}>
      <GunProvider>
        <CoinMarketProvider>
          <RouterProvider router={router} />
        </CoinMarketProvider>
      </GunProvider>
    </WagmiConfig>
  );
}

export default App;