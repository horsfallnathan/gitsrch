import { QueryClient, QueryClientProvider } from "react-query";

// Import styles
import "../styles/tailwind.scss";
import "../styles/globals.scss";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false /** prevent calling the api after an error */,
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
