import { Link } from 'react-router-dom';

export default function ConfirmDelete() {
  return (
    <form method="POST">
      <h1>WARNING!</h1>
      <p>
        Proceeding shall <strong>permanently</strong> delete the &quot;&quot; course. Please type the course title below
        to proceed.
      </p>

      <input type="text" id="title" name="title" placeholder="Confirm Title..." />
      <div>
        <button type="submit">DELETE course</button>
        <Link to="..">Cancel</Link>
      </div>
    </form>
  );
}
