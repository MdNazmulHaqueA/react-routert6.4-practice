import { Link } from 'react-router-dom';

const DUMMY_EVENTS = [
  { id: 'e1', title: 'some event' },
  { id: 'e2', title: 'another event' }
];
export default function EventsPage() {
  return (
    <>
      <h1>Events Page</h1>
      <ul>
        {DUMMY_EVENTS.map(event => (
          <li key={event.id}>
            {/* <Link to={`/events/${event.id}`} > {event.title} </Link> || or, relative path as follows */}
            <Link to={event.id}>{event.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
