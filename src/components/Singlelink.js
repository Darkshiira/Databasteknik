import { Link } from "react-router-dom";

export default function Singlelink(params) {
  return (
    <ul>
      <li>
        <Link to={params.target}>{params.text}</Link>
      </li>
    </ul>
  );
}
