import MainNavigation from '../components/MainNavigation';
import PageContent from '../components/PageContent';
export default function ErrorPage() {
  return (
    <>
      <MainNavigation />
      <PageContent title="An Error Occurred">
        <p>Ops!Something went wrong</p>
      </PageContent>
    </>
  );
}
