'use client';

import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '../ui/Button';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, isAuthenticated, logout, checkAuth } = useAuthStore();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    useEffect(() => {
        // Simple protection logic
        if (!isAuthenticated && !pathname.startsWith('/login') && !pathname.startsWith('/register')) {
            // router.push('/login'); // Commented out to avoid flicker during initial check, strictly handled in protected routes if needed
        }
    }, [isAuthenticated, pathname, router]);

    if (!isAuthenticated && (pathname.startsWith('/login') || pathname.startsWith('/register'))) {
        return <>{children}</>;
    }

    // If not authenticated and trying to access protected route (and checkAuth finished), redirect?
    // Ideally we show a loader while checking auth.

    if (!user && !pathname.startsWith('/login') && !pathname.startsWith('/register')) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex flex-shrink-0 items-center">
                                <span className="text-xl font-bold text-gray-800">AdminDashboard</span>
                            </div>
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                <Link href="/dashboard" className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${pathname === '/dashboard' ? 'border-blue-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}>
                                    Dashboard
                                </Link>
                                <Link href="/dashboard/users" className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${pathname === '/dashboard/users' ? 'border-blue-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}>
                                    Users
                                </Link>
                                <Link href="/dashboard/products" className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${pathname === '/dashboard/products' ? 'border-blue-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}>
                                    Products
                                </Link>
                                <Link href="/dashboard/orders" className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${pathname === '/dashboard/orders' ? 'border-blue-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}>
                                    Orders
                                </Link>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <span className="mr-4 text-sm text-gray-700">Hello, {user?.name}</span>
                            <Button variant="secondary" size="sm" onClick={() => {
                                logout();
                                router.push('/login');
                            }}>
                                Sign out
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="py-10">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {children}
                </div>
            </div>
        </div>
    );
}
