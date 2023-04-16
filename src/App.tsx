import { UsersTable } from "./components/UsersTable/UsersTable";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <header className="px-4 py-12 bg-red">
          <div className="max-w-content m-auto">
            <img
              alt="Beeline logo"
              height="40px"
              src="logo.png"
              width="130px"
            ></img>
          </div>
        </header>
        <main className="max-w-content mx-auto my-20 px-4">
          <UsersTable />
        </main>
        <footer></footer>
      </div>
    </QueryClientProvider>
  );
}

export default App;
