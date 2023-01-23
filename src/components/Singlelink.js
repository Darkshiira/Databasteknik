import { Link } from "react-router-dom";

export default function Singlelink(params) {
  return (
    <Link className="single-link" to={params.target}>
      {params.text}
    </Link>
  );
}
