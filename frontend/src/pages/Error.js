import { useRouteError } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';
import PageContent from '../components/PageContent';
export default function ErrorPage() {
  const error = useRouteError();
  let title = 'An error Occurred!';
  let message = 'Something went wrong.';
  if (error?.status === 500) {
    message = error.data.message;
    // message = JSON.parse(error.data).message -> if the json helper was not used and thrown new Response(JSON.stringify({ message: 'Could not fetch events.' }),{status:500})
  }
  if (error?.status === 404) {
    title = 'Oops, page not found!';
    message = `The requested resource "${window.location.pathname}" was not found.`;
  }
  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}
