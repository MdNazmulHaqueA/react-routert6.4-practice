// import { Link } from 'react-router-dom';

// const DUMMY_EVENTS = [
//   { id: 'e1', title: 'some event' },
//   { id: 'e2', title: 'another event' }
// ];
// export default function EventsPage() {
//   return (
//     <>
//       <h1>Events Page</h1>
//       <ul>
//         {DUMMY_EVENTS.map(event => (
//           <li key={event.id}>
//             {/* <Link to={`/events/${event.id}`} > {event.title} </Link> || or, relative path as follows */}
//             <Link to={event.id}>{event.title}</Link>
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// }
// import { useEffect, useState } from 'react';

import { Suspense } from 'react';
import { Await, defer, json, useLoaderData } from 'react-router-dom';
import EventsList from '../components/EventsList';

function EventsPage() {
  // const [isLoading, setIsLoading] = useState(false);
  // const [fetchedEvents, setFetchedEvents] = useState();
  // const [error, setError] = useState();

  // useEffect(() => {
  //   async function fetchEvents() {
  //     setIsLoading(true);
  //     const response = await fetch('http://localhost:8080/events');

  //     if (!response.ok) {
  //       setError('Fetching events failed.');
  //     } else {
  //       const resData = await response.json();
  //       setFetchedEvents(resData.events);
  //     }
  //     setIsLoading(false);
  //   }

  //   fetchEvents();
  // }, []);
  // const events = useLoaderData();
  // const data = useLoaderData();
  // if(data.isError){
  //   return <p>{data.message}</p>
  // }
  // const events = data.events;
  const { events } = useLoaderData();
  return (
    <>
      {/* <div style={{ textAlign: 'center' }}>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </div>
      {!isLoading && fetchedEvents && <EventsList events={fetchedEvents} />} */}

      {/* <EventsList events={events} /> */}
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={events}>
          {loadedEvents => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

export default EventsPage;

async function loadEvents() {
  const response = await fetch('http://localhost:8080/events');
  if (!response.ok) {
    return json(
      { message: 'Could not fetch events.' },
      { message: 'Could not fetch events.' }
    );
  } else {
    const resData = response.json();
    return resData.events;
  }
}

/*

export async function loader() {
  const response = await fetch('http://localhost:8080/events');
  if (!response.ok) {
    //return new Response();
    // return {isError: true, message: "Could Not Fetch Events"};
    // throw new Error();
    // eslint-disable-next-line no-throw-literal
    // throw { message: 'Could not fetch events.' };
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
    //   status: 500
    // });
    return json(
      { message: 'Could not fetch events.' },
      { message: 'Could not fetch events.' }
    );
  } else {
    // const resData = await response.json();
    // return resData.events;
    return response;
  }
}

*/

export function loader() {
  defer({
    events: loadEvents() //must have a promise in defer
  });
}
