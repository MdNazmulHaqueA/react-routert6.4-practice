// import { useParams } from 'react-router-dom';

import { Suspense } from 'react';
import {
  Await,
  defer,
  json,
  redirect,
  useRouteLoaderData
} from 'react-router-dom';
import EventItem from '../components/EventItem';
import EventsList from '../components/EventsList';

export default function EventDetailPage() {
  // const params = useParams();
  // const data = useLoaderData();
  // const data = useRouteLoaderData('event-detail');
  const { event, events } = useRouteLoaderData('event-detail');

  return (
    <>
      {/* <h1>EventDetailPage</h1> */}
      {/* <p>Event Id: {params.eventId}</p> */}
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={event}>
          {loadedEvent => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={events}>
          {loadedEvents => <EventsList event={loadedEvents} />}
        </Await>
      </Suspense>

      {/* <EventItem event={data.event} />
      <EventsList events={events} /> */}
    </>
  );
}

async function loadEvent(id) {
  const response = await fetch('http://localhost:8080/events/' + id);
  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for selected events' },
      { status: 500 }
    );
  } else {
    const resData = await response.json();
    return resData.event;
  }
}

async function loadEvents() {
  const response = await fetch('http://localhost:8080/events');
  if (!response.ok) {
    return json(
      { message: 'Could not fetch events.' },
      { message: 'Could not fetch events.' }
    );
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export async function loader({ request, params }) {
  // to get the id we could use useParams in the EventDetailPage Component but we cannot use inside loader function - hooks cannot be accessed in the loader function
  // But you still can get access to the route parameters that you need, because react router, which calls this loader function for you, actually passes an object to this loader function when executing it for you. And that object contains two important pieces of data: A request property, which contains a request object, and a params property, which contains an object with all your route parameters.
  // request.url
  const id = params.eventId;
  // return fetch("http://localhost:8080/events"+ id); -> we could return like this also
  // const response = await fetch('http://localhost:8080/events/' + id);
  // if (!response.ok) {
  //   throw json(
  //     { message: 'Could not fetch details for selected events' },
  //     { status: 500 }
  //   );
  // } else {
  //   return response;
  // }
  return defer({
    event: await loadEvent(id),
    events: loadEvents()
  });
}

export async function action({ params, request }) {
  const eventId = params.eventId;
  const response = await fetch('http://localhost:8080/events/' + eventId, {
    // method:"DELETE"
    method: request.method
  });
  if (!response.ok) {
    throw json({ message: 'Could not delete event' }, { status: 500 });
  }
  return redirect('/events');
}
