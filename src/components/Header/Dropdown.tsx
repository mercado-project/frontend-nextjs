import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Dropdown = ({ menuItem, stickyMenu }) => {
  const [dropdownToggler, setDropdownToggler] = useState(false);
  const pathUrl = usePathname();

  const hasSubmenu = menuItem.submenu && menuItem.submenu.length > 0;

  return (
    <li
      className={`group relative before:w-0 before:h-[3px] before:bg-blue before:absolute before:left-0 before:top-0 before:rounded-b-[3px] before:ease-out before:duration-200 hover:before:w-full ${
        pathUrl.includes(menuItem.title) && "before:!w-full"
      }`}
    >
      {/* SE TIVER SUBMENU → LINK + BOTÃO DA SETA */}
      {hasSubmenu ? (
        <div
          className={`flex items-center gap-1.5 cursor-pointer capitalize ${
            stickyMenu ? "xl:py-4" : "xl:py-6"
          }`}
        >
          {/* O TEXTO PRINCIPAL É UM LINK */}
          <Link
            href={menuItem.path}
            className={`hover:text-blue text-custom-sm font-medium text-dark ${
              pathUrl.includes(menuItem.title) && "!text-blue"
            }`}
          >
            {menuItem.title}
          </Link>

          {/* BOTÃO DA SETA ABRE/FECHA O DROPDOWN */}
          <button
            onClick={() => setDropdownToggler(!dropdownToggler)}
            className="flex items-center"
          >
            <svg
              className="fill-current cursor-pointer"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2.95363 5.67461C3.13334 5.46495 3.44899 5.44067 3.65866 5.62038L7.99993 9.34147L12.3412 5.62038C12.5509 5.44067 12.8665 5.46495 13.0462 5.67461C13.2259 5.88428 13.2017 6.19993 12.992 6.37964L8.32532 10.3796C8.13808 10.5401 7.86178 10.5401 7.67453 10.3796L3.00787 6.37964C2.7982 6.19993 2.77392 5.88428 2.95363 5.67461Z" />
            </svg>
          </button>
        </div>
      ) : (
        // SE NÃO TIVER SUBMENU → LINK DIRETO
        <Link
          href={menuItem.path}
          className={`hover:text-blue text-custom-sm font-medium text-dark flex items-center gap-1.5 capitalize ${
            stickyMenu ? "xl:py-4" : "xl:py-6"
          } ${pathUrl.includes(menuItem.title) && "!text-blue"}`}
        >
          {menuItem.title}
        </Link>
      )}

      {/* DROPDOWN */}
      {hasSubmenu && (
        <ul
          className={`dropdown ${
            dropdownToggler ? "flex" : ""
          } ${stickyMenu ? "xl:group-hover:translate-y-0" : "xl:group-hover:translate-y-0"}`}
        >
          {menuItem.submenu.map((item, i) => (
            <li key={i}>
              <Link
                href={item.path}
                className={`flex text-custom-sm hover:text-blue hover:bg-gray-1 py-[7px] px-4.5 ${
                  pathUrl === item.path && "text-blue bg-gray-1"
                }`}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default Dropdown;
