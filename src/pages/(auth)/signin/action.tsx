// import { QueryClient } from "@tanstack/react-query";
import { ActionFunctionArgs } from 'react-router-dom';

const signInAction =
  () =>
  async ({ request }: ActionFunctionArgs) => {
    const data = await request.json();

    // TODO: Actually perform an API call to verify credentials
    console.log(data);

    return null;
  };

export default signInAction;
