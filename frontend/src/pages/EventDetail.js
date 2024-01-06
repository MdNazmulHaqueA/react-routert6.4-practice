// import { useParams } from 'react-router-dom';

import { json, useRouteLoaderData } from 'react-router-dom';
import EventItem from '../components/EventItem';

export default function EventDetailPage() {
  // const params = useParams();
  // const data = useLoaderData();
  const data = useRouteLoaderData('event-detail');

  return (
    <>
      {/* <h1>EventDetailPage</h1> */}
      {/* <p>Event Id: {params.eventId}</p> */}

      <EventItem event={data.event} />
    </>
  );
}

export async function loader({ request, params }) {
  // to get the id we could use useParams in the EventDetailPage Component but we cannot use inside loader function - hooks cannot be accessed in the loader function
  // But you still can get access to the route parameters that you need, because react router, which calls this loader function for you, actually passes an object to this loader function when executing it for you. And that object contains two important pieces of data: A request property, which contains a request object, and a params property, which contains an object with all your route parameters.
  // request.url
  const id = params.eventId;
  // return fetch("http://localhost:8080/events"+ id); -> we could return like this also
  const response = await fetch('http://localhost:8080/events/' + id);
  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for selected events' },
      { status: 500 }
    );
  } else {
    return response;
  }
}
