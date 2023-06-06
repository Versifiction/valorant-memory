import { Link } from "react-router-dom";

function HomeText() {
  return (
    <>
      <p className="text-center text-[#F5FFC2] mt-10 mb-10">
        Bienvenue sur le Valorant Memory
      </p>
      <Link to="/game" className="flex justify-center">
        <button className="bg-[#F5FFC2] p-4 rounded">Jouer</button>
      </Link>
    </>
  );
}

export default HomeText;
