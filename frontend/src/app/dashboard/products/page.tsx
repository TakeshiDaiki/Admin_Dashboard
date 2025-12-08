'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useForm } from 'react-hook-form';

interface Product {
    _id: string;
    name: string;
    price: number;
    category: string;
    brand: string;
}

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);

    const { register, handleSubmit, reset } = useForm();

    const fetchProducts = async () => {
        try {
            const { data } = await api.get('/products');
            setProducts(data);
        } catch (error) {
            console.error("Failed to fetch products", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure?')) {
            try {
                await api.delete(`/products/${id}`);
                fetchProducts();
            } catch (error) {
                alert('Failed to delete');
            }
        }
    };

    const onSubmit = async (data: any) => {
        try {
            // Hardcoded dummy data for required fields not in quick form
            const payload = {
                ...data,
                price: Number(data.price),
                countInStock: Number(data.countInStock || 0),
                image: '/images/sample.jpg', // Placeholder
                description: 'Sample description',
            };
            await api.post('/products', payload);
            setProducts((prev) => [...prev, payload]); // Optimistic or refetch
            fetchProducts();
            reset();
            setIsCreating(false);
        } catch (error) {
            alert('Failed to create product');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
                <Button onClick={() => setIsCreating(!isCreating)}>{isCreating ? 'Cancel' : 'Create Product'}</Button>
            </div>

            {isCreating && (
                <form onSubmit={handleSubmit(onSubmit)} className="mt-4 bg-white p-4 shadow rounded-md mb-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Name" {...register('name', { required: true })} />
                        <Input label="Price" type="number" {...register('price', { required: true })} />
                        <Input label="Category" {...register('category', { required: true })} />
                        <Input label="Brand" {...register('brand', { required: true })} />
                        <Input label="Stock" type="number" {...register('countInStock')} />
                    </div>
                    <Button type="submit">Save Product</Button>
                </form>
            )}

            <div className="mt-6 flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Price</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Category</th>
                                        <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {products.map((product) => (
                                        <tr key={product._id}>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{product._id}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{product.name}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">${product.price}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{product.category}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                <Button variant="danger" size="sm" onClick={() => handleDelete(product._id)}>Delete</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
