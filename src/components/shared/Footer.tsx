import Link from 'next/link';
import React from 'react';

const Footer = () => {
    return (
        <footer className="footer footer-center bg-base-200 text-base-content p-10 mt-auto">
            <nav className="grid grid-flow-col gap-4">
                <Link href="/about" className="link link-hover">
                    About
                </Link>
                <Link href="/contact" className="link link-hover">
                    Contact
                </Link>
                <Link href="/products" className="link link-hover">
                    Products
                </Link>
            </nav>
            <p className="font-bold text-lg">🛒 ShopNest</p>
            <p>Copyright © {new Date().getFullYear()} - All rights reserved</p>
        </footer>
    );
};

export default Footer;