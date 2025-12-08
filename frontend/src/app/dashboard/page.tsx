'use client';

import { useAuthStore } from '@/store/authStore';

export default function DashboardPage() {
    const { user } = useAuthStore();

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-2 text-gray-600">Welcome back, {user?.name}!</p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* Stat Card 1 */}
                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                {/* Icon */}
                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                                    📦
                                </div>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="truncate text-sm font-medium text-gray-500">Total Products</dt>
                                    <dd>
                                        <div className="text-lg font-medium text-gray-900">12</div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stat Card 2 */}
                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                {/* Icon */}
                                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                                    💰
                                </div>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="truncate text-sm font-medium text-gray-500">Total Orders</dt>
                                    <dd>
                                        <div className="text-lg font-medium text-gray-900">5</div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stat Card 3 */}
                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                {/* Icon */}
                                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-500">
                                    👥
                                </div>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="truncate text-sm font-medium text-gray-500">Users</dt>
                                    <dd>
                                        <div className="text-lg font-medium text-gray-900">3</div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
