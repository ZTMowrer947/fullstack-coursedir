import { RouterProvider } from 'react-router-dom';
import routes from './pages/routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRef } from 'react';

function App() {
  const queryClientRef = useRef(new QueryClient());

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <div>
        <RouterProvider router={routes} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
