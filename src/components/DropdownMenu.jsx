import React from 'react';
import { NavLink } from 'react-router-dom';
import './DropdownMenu.css';
import { motion, AnimatePresence } from 'framer-motion';

const DropdownMenu = ({ isOpen, onLinkClick }) => {
  const links = [
    { label: 'Home', href: '/' },
    { label: 'Predators', href: '/predators' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`dropdown-container dropdown-visible`}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <ul className="dropdown-menu-list">
            {links.map((link) => (
              <li key={link.href}>
                <NavLink
                  exact
                  activeClassName="dropdown-menu-link-active"
                  className="dropdown-menu-link"
                  to={link.href}
                  onClick={onLinkClick}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DropdownMenu;
