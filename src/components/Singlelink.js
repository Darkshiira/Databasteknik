import { Link } from "react-router-dom";

export default function Singlelink(params) {
  return (
    <div className="links">

      <Link  to={params.target}>{params.text}</Link>

    </div>

  );
}
