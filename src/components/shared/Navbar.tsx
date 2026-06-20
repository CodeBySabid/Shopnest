"use client"

import { useTheme } from "next-themes";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { ShoppingCart, Sun, Moon, Menu } from "lucide-react";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [cartCount] = useState(0);
    const pathname = usePathname();

    useEffect(() => {
        setMounted(true);
    }, []);

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/products", label: "Products" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
    ]
    return (
        <nav className="navbar bg-base-100 shadow-md sticky top-0 z-50">
            {/* Mobile Menu */}
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <Menu size={20} />
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={pathname === link.href ? "text-primary font-semibold" : ""}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Logo */}
                <Link href="/" className="btn btn-ghost text-xl font-bold msx-sm-px-0.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl text-primary-content">
                        🛒
                    </div>

                    <span>
                        Shop<span className="text-primary">Nest</span>
                    </span>
                </Link>
            </div>

            {/* Desktop Menu */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-1">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={`font-medium transition-colors ${pathname === link.href
                                    ? "text-primary font-semibold"
                                    : "hover:text-primary"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Right Side */}
            <div className="navbar-end gap-2">
                {/* Dark/Light Toggle */}
                {mounted && (
                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="btn btn-ghost btn-circle"
                        aria-label="Toggle theme"
                    >
                        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                )}

                {/* Cart */}
                <Link href="/cart" className="btn btn-ghost btn-circle">
                    <div className="indicator">
                        <ShoppingCart size={20} />
                        {cartCount > 0 && (
                            <span className="badge badge-sm badge-primary indicator-item">
                                {cartCount}
                            </span>
                        )}
                    </div>
                </Link>

                {/* Login Button */}
                <Link href="/login" className="btn btn-primary btn-sm">
                    Login
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;