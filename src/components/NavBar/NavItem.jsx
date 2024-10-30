import { Link } from "react-router-dom";

function NavItem({ item, isActive }) {
  const { label, path } = item;
  return (
    <li>
      <Link
        to={path}
        className={`inline-block pt-2 px-1 border-transparent hover:text-primary hover:border-b-primary hover:border-b-2 text-xl ${
          isActive ? "text-primary border-b-primary border-b-2 font-bold" : null
        }`}
      >
        {label}
      </Link>
    </li>
  );
}

export default NavItem;
