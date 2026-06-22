"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingCart, Sun, Moon, Menu, LogOut, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

export default function Navbar() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [cartCount] = useState(0);
    const pathname = usePathname();
    const { data: session, status } = useSession();

    useEffect(() => {
        setMounted(true);
    }, []);

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/products", label: "Products" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
    ];

    return (
        <nav className="navbar bg-base-100 shadow-md sticky top-0 z-50">
            {/* Mobile Menu */}
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden max-sm:p-1.5">
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
                                    className={
                                        pathname === link.href ? "text-primary font-semibold" : ""
                                    }
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Logo */}
                <Link href="/" className="btn max-sm:p-1 btn-ghost text-xl font-bold msx-sm-px-0.5">
                    <div className="flex h-9 w-8 items-center justify-center rounded-xl text-primary-content">
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

                {/* User Section */}
                {status === "loading" ? (<span className="loading loading-spinner loading-sm"></span>) :
                    session ? (

                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-9 rounded-full">
                                    <Image
                                        src={session.user?.image || "/default-avatar.png"}
                                        alt={session.user?.name || "User"}
                                        width={36}
                                        height={36}
                                        className="rounded-full"
                                    />
                                </div>
                            </label>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                            >
                                <li className="menu-title px-4 py-2">
                                    <p className="font-semibold">{session.user?.name}</p>
                                    <p className="text-xs text-base-content/60">
                                        {session.user?.role}
                                    </p>
                                </li>
                                <div className="divider my-0"></div>
                                <li>
                                    <Link href="/dashboard">
                                        <User size={16} /> Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        onClick={() => signOut()}
                                        className="text-error"
                                    >
                                        <LogOut size={16} /> Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        
                        <Link href="/login" className="btn btn-primary btn-sm">
                            Login
                        </Link>
                    )}
            </div>
        </nav>
    );
}