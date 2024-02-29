import { Link, Outlet, useLocation } from "react-router-dom";

export default function Root() {
  const { pathname } = useLocation();
  return (
    <div>
      <nav className="py-10 w-full bg-white rounded-b-3xl flex justify-center">
        <ul className="flex flex-row gap-x-16">
          <Link to={"home"}>
            <li
              className={`font-medium border border-purple py-2 px-4 rounded-md cursor-pointer ${
                pathname === "/home" ? "bg-light-purple text-purple" : ""
              } hover:bg-purple-hover transition-all`}
            >
              მთავარი
            </li>
          </Link>
          <Link to={"history"}>
            <li
              className={`font-medium border border-purple py-2 px-4 rounded-md cursor-pointer ${
                pathname === "/history" ? "bg-light-purple text-purple" : ""
              } hover:bg-purple-hover transition-all`}
            >
              ისტორია
            </li>
          </Link>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
