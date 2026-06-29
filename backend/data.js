// These are static data not coming from the DB
// Used for testing purposes 

import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            name: 'Lorenzo',
            surname: 'Bignami',
            email: 'lorenzo00@gmail.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: true
        },
        {
            name: 'Mario',
            surname: 'Rossi',
            email: 'mariorossi99@gmail.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: false
        },
    ],
    products: [
        {
            //_id: 1,
            productName: 'Nike Dryfit Tshirt',
            slug: 'nike-tshirt',
            category: 'running',
            image: '/images/nike-tshirt.png',
            price: 25,
            countInStock: 10,
            brand: 'Nike',
            description: 'high quality tshirt'
        },
        {
            //_id: 2,
            productName: 'Puma Move Tshirt',
            slug: 'puma-tshirt',
            category: 'running',
            image: '/images/puma-tshirt.png',
            price: 20,
            countInStock: 10,
            brand: 'Puma',
            description: 'high quality tshirt'
        },
        {
            //_id: 3,
            productName: 'Underarmour Skin Tshirt',
            slug: 'underarmour-tshirt',
            category: 'running',
            image: '/images/under-armour-tshirt.png',
            price: 25,
            countInStock: 0,
            brand: 'Under Armour',
            description: 'high quality tshirt'
        },
        {
            //_id: 4,
            productName: 'Adidas Running Tshirt',
            slug: 'adidas-tshirt',
            category: 'running',
            image: '/images/adidas-tshirt.png',
            price: 30,
            countInStock: 10,
            brand: 'Adidas',
            description: 'high quality tshirt'
        }
    ]
}

export default data;