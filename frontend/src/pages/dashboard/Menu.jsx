import { Link } from "react-router-dom";
import { menus } from "../../menus";

export default function Menu() {
  return (
    <div className="w-64 bg-white shadow p-4 min-h-screen">
      <h2 className="text-xl font-bold mb-4">MENU</h2>
      <ul className="flex flex-col gap-2">
        {menus.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className="block p-2 rounded hover:bg-blue-600 hover:text-white"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
