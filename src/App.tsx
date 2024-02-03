import { QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren, useRef } from 'react';

import queryClient from './queryClient';

function App({ children }: PropsWithChildren) {
  const queryClientRef = useRef(queryClient);

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <div>{children}</div>
    </QueryClientProvider>
  );
}

export default App;
