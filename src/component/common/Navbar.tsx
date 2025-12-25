import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '';
import { useDarkMode } from '../';
import { useClickOutside } from '../hooks/useClickOutside';

interface Doctor {
  id: number;
  name: string;
}

const Navbar: React.FC = () => {
  const user = useAuth();
  const { darkMode, setDarkMode } = useDarkMode();

  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<Doctor[]>([]);

  const profileRef = useRef<HTMLDivElement>(null);
  useClickOutside(profileRef, () => setProfileOpen(false));

  // API Search
  useEffect(() => {
    if (!search) return;

    const fetchDoctors = async () => {
      const res = await fetch(
        `https://api.example.com/doctors?search=${search}`
      );
      const data = await res.json();
      setResults(data);
    };

    fetchDoctors();
  }, [search]);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <nav className="bg-blue-100 dark:bg-gray-900 px-6 shadow-md">
        <div className="flex justify-between items-center h-[80px]">

          {/* Logo */}
          <h3 className="font-bold dark:text-white">
            Smart Healthcare
          </h3>

          {/* Search */}
          <div className="relative hidden md:block">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search doctors"
              className="p-2 rounded w-[350px] dark:bg-gray-800 dark:text-white"
            />

            <AnimatePresence>
              {results.length > 0 && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute bg-white dark:bg-gray-800 w-full mt-1 rounded shadow"
                >
                  {results.map((doc) => (
                    <li
                      key={doc.id}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {doc.name}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">

            {/* Dark Mode */}
            <button onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? '☀️' : '🌙'}
            </button>

            {/* Profile */}
            <div ref={profileRef} className="relative">
              <img
                src={user?.profileImage}
                className="w-9 h-9 rounded-full cursor-pointer"
                onClick={() => setProfileOpen(!profileOpen)}
              />

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute right-0 mt-2 bg-white dark:bg-gray-800 rounded shadow w-40"
                  >
                    <button className="block w-full p-2 text-left">
                      Settings
                    </button>
                    <button className="block w-full p-2 text-left text-red-500">
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu */}
            <button
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              🍔
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
