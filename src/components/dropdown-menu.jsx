import { useState, useRef, useEffect } from "react";

const DropdownMenu = ({
  triggerContent,
  triggerStyles = null,
  menuStyles = null,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <div
        className="dropdown-trigger"
        style={triggerStyles && { ...triggerStyles }}
        onClick={toggleDropdown}
      >
        {triggerContent}
      </div>
      {isOpen && (
        <div className="dropdown-menu" style={menuStyles && { ...menuStyles }}>
          {children}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
