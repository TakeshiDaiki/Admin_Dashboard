import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import Product from '../models/Product';
import Order from '../models/Order';
import bcrypt from 'bcrypt';

dotenv.config();

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
        role: 'admin',
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'user',
    },
    {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
        role: 'user',
    },
];

const products = [
    {
        name: 'Airpods Wireless Bluetooth Headphones',
        image: '/images/airpods.jpg',
        description: 'Bluetooth technology lets you connect it with compatible devices wirelessly',
        brand: 'Apple',
        category: 'Electronics',
        price: 89.99,
        countInStock: 10,
        rating: 4.5,
        numReviews: 12,
    },
    {
        name: 'iPhone 13 Pro 256GB Memory',
        image: '/images/phone.jpg',
        description: 'Introducing the iPhone 13 Pro. A transformative triple-camera system that adds tons of capability without complexity.',
        brand: 'Apple',
        category: 'Electronics',
        price: 599.99,
        countInStock: 7,
        rating: 4.0,
        numReviews: 8,
    },
    {
        name: 'Cannon EOS 80D DSLR Camera',
        image: '/images/camera.jpg',
        description: 'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',
        brand: 'Cannon',
        category: 'Electronics',
        price: 929.99,
        countInStock: 5,
        rating: 3,
        numReviews: 12,
    },
    {
        name: 'Sony Playstation 5',
        image: '/images/playstation.jpg',
        description: 'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',
        brand: 'Sony',
        category: 'Electronics',
        price: 399.99,
        countInStock: 11,
        rating: 5,
        numReviews: 12,
    },
    {
        name: 'Logitech G-Series Gaming Mouse',
        image: '/images/mouse.jpg',
        description: 'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience',
        brand: 'Logitech',
        category: 'Electronics',
        price: 49.99,
        countInStock: 7,
        rating: 3.5,
        numReviews: 10,
    },
];

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || '');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const importData = async () => {
    try {
        await connectDB();

        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        // Hash passwords not needed if model helper handles it, 
        // BUT for bulk insert pre-save hooks usually don't run on insertMany unless configured or looped.
        // User model in this project likely has pre-save hook. 
        // InsertMany typically bypasses middleware. Best to loop or plain create.

        const createdUsers = [];
        for (const u of users) {
            const user = await User.create(u);
            createdUsers.push(user);
        }

        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser };
        });

        const createdProducts = await Product.insertMany(sampleProducts);

        await Order.create({
            user: createdUsers[1]._id,
            orderItems: [
                {
                    name: createdProducts[0].name,
                    qty: 1,
                    image: createdProducts[0].image,
                    price: createdProducts[0].price,
                    product: createdProducts[0]._id,
                },
            ],
            totalPrice: createdProducts[0].price,
            isPaid: true,
            paidAt: new Date(),
            isDelivered: false,
        });

        await Order.create({
            user: createdUsers[2]._id,
            orderItems: [
                {
                    name: createdProducts[1].name,
                    qty: 1,
                    image: createdProducts[1].image,
                    price: createdProducts[1].price,
                    product: createdProducts[1]._id,
                },
            ],
            totalPrice: createdProducts[1].price,
            isPaid: false,
        });

        await Order.create({
            user: createdUsers[1]._id,
            orderItems: [
                {
                    name: createdProducts[2].name,
                    qty: 1,
                    image: createdProducts[2].image,
                    price: createdProducts[2].price,
                    product: createdProducts[2]._id,
                },
            ],
            totalPrice: createdProducts[2].price,
            status: 'Delivered',
        });


        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await connectDB();
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
