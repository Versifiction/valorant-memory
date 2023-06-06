import { Link } from "react-router-dom";

function Title() {
  return (
    <Link to="/">
      <h1 className="text-center text-3xl uppercase text-[#F5FFC2] mb-10">
        Valorant Memory
      </h1>
    </Link>
  );
}

export default Title;
