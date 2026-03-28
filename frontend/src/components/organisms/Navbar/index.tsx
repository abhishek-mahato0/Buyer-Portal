import React, { useEffect, useMemo, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { getItem, removeItem } from "../../../utils/localstorage";
import { useMutation } from "../../../hooks/useMutation";
import { logoutApi } from "../../../api/auth/logout.api";
import Button from "../../atoms/Button";
import { useQuery } from "../../../hooks/useQuery";
import { getFavouriteIds } from "../../../pages/Dashboard/api";
import { queryClient } from "../../../api/queryClient";

const Navbar: React.FC = () => {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const navigate = useNavigate();

  const { mutate, loading = false } = useMutation(logoutApi, {
    onSuccess: () => {
      removeItem("token");
      removeItem("refreshToken");
      removeItem("user");
      setUser(null);
      navigate("/login");
    },
  });

  const { data = [] } = useQuery(["favourite-ids"], getFavouriteIds, {});

  useEffect(() => {
    const token = getItem("token");
    if (token) {
      const storedUser = getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error("Failed to parse user", e);
        }
      }
    }
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleLogout = () => {
    const refreshToken = getItem("refreshToken");
    mutate(refreshToken);
  };

  const navLinks = useMemo(
    () => [
      { label: "Dashboard", path: "/" },
      { label: `Favourites (${data?.length || 0})`, path: "/favourites" },
    ],
    [data],
  );

  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto px-16 sm:px-24 lg:px-32">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-gray-900">
            <span className="logo-full">Architectural Curator</span>
            <span className="logo-short">AC</span>
          </Link>

          <div className="flex items-center gap-10">
            <div className="flex gap-16 ml-auto mr-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className="text-sm font-medium text-gray-600 hover:text-black transition"
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
            {user ? (
              <>
                <div
                  className="w-[30px] h-[30px] p-10 flex items-center justify-center bg-black rounded-full text-white font-semibold text-sm"
                  title={user.name}
                >
                  {getInitials(user.name)}
                </div>

                <Button
                  onClick={handleLogout}
                  className="md:px-16 px-5 py-8 text-sm font-medium bg-black text-white rounded-lg hover:opacity-90 transition"
                  loading={loading}
                  text="Logout"
                />
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-[#ffffff] hover:text-black transition"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-16 py-8 text-sm font-medium bg-black text-white rounded-lg hover:opacity-90 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
