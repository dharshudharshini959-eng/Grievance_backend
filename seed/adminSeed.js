const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const adminExists = await User.findOne({ email: 'admin@gmail.com' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    const userHashedPassword = await bcrypt.hash('user123', salt);

    if (!adminExists) {
      await User.create({
        name: 'Admin',
        email: 'admin@gmail.com',
        password: hashedPassword,
        role: 'admin'
      });
      console.log('Admin user seeded successfully');
    } else {
      console.log('Admin user already exists');
    }

    const userExists = await User.findOne({ email: 'user@gmail.com' });
    if (!userExists) {
      await User.create({
        name: 'Student User',
        email: 'user@gmail.com',
        password: userHashedPassword,
        role: 'user'
      });
      console.log('Student user seeded successfully');
    } else {
      console.log('Student user already exists');
    }

    process.exit();
  } catch (error) {
    console.error(`Error with seeding: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
