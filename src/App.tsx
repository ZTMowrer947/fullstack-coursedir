import { RouterProvider } from 'react-router-dom';
import routes from './pages/routes';
import { QueryClientProvider } from '@tanstack/react-query';
import { useRef } from 'react';
import queryClient from './queryClient';

function App() {
  const queryClientRef = useRef(queryClient);

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <div>
        <RouterProvider router={routes} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
