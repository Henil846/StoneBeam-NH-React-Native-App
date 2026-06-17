/**
 * Database Seeder — populates MongoDB with sample data matching the frontend mock data.
 *
 * Usage:   npm run seed
 * Or:      node src/seed/seed.js
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const dns = require('dns');
const path = require('path');

// Use Google DNS to resolve MongoDB Atlas SRV records
dns.setServers(['8.8.8.8', '8.8.4.4']);

// Load env from backend root
dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

const User = require('../models/User');
const Project = require('../models/Project');
const Order = require('../models/Order');
const Attendance = require('../models/Attendance');
const CatalogueItem = require('../models/CatalogueItem');
const Banner = require('../models/Banner');
const Feed = require('../models/Feed');
const Task = require('../models/Task');
const Payment = require('../models/Payment');

const CITIES = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Ahmedabad', 'Kolkata', 'Jaipur', 'Surat'];
const SKILLS = ['Concrete Work', 'Steel Framing', 'Electrical', 'Plumbing', 'Interior Design', 'Painting', 'Carpentry', 'Masonry', 'Roofing', 'Tiling', 'Welding', 'HVAC'];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB for seeding');

    // Clear all collections
    await Promise.all([
      User.deleteMany({}),
      Project.deleteMany({}),
      Order.deleteMany({}),
      Attendance.deleteMany({}),
      CatalogueItem.deleteMany({}),
      Banner.deleteMany({}),
      Feed.deleteMany({}),
      Task.deleteMany({}),
      Payment.deleteMany({}),
    ]);
    console.log('🗑️  Cleared all collections');

    // ------- USERS -------
    const hashedPassword = await bcrypt.hash('password123', 12);

    const userData = [
      // Current user (Henil)
      {
        name: 'Henil Patel', email: 'henil.patel@stonebeam.in', phone: '+91-9876543210',
        password: hashedPassword, role: 'builder', city: 'Ahmedabad', company: 'StoneBeam-NH Constructions',
        experience: 8, rating: 4.8, reviewCount: 47, skills: ['Concrete Work', 'Steel Framing', 'Interior Design'],
        bio: 'Passionate builder with 8 years of experience in residential and commercial construction projects across Gujarat.',
        isVerified: true, projectCount: 24, connections: 156, memberSince: '2022',
      },
      // Builders
      { name: 'Rajesh Kumar', email: 'rajesh.kumar@email.com', phone: '+91-9000000001', password: hashedPassword, role: 'builder', city: 'Mumbai', company: 'Kumar Constructions', experience: 12, rating: 4.5, reviewCount: 35, skills: ['Concrete Work', 'Steel Framing', 'Roofing'], bio: 'Experienced builder based in Mumbai.', isVerified: true, projectCount: 18, connections: 120, memberSince: '2020' },
      { name: 'Amit Sharma', email: 'amit.sharma@email.com', phone: '+91-9000000002', password: hashedPassword, role: 'builder', city: 'Delhi', company: 'Sharma Builders', experience: 10, rating: 4.3, reviewCount: 28, skills: ['Electrical', 'Interior Design'], bio: 'Quality-focused builder in Delhi.', isVerified: true, projectCount: 15, connections: 90, memberSince: '2021' },
      { name: 'Vikram Singh', email: 'vikram.singh@email.com', phone: '+91-9000000003', password: hashedPassword, role: 'builder', city: 'Jaipur', company: 'Singh Estates', experience: 15, rating: 4.7, reviewCount: 52, skills: ['Masonry', 'Concrete Work'], bio: 'Veteran builder from Jaipur.', isVerified: true, projectCount: 30, connections: 200, memberSince: '2020' },
      // Contractors
      { name: 'Arun Mehta', email: 'arun.mehta@email.com', phone: '+91-9000000011', password: hashedPassword, role: 'contractor', city: 'Ahmedabad', company: 'Mehta Contracts', experience: 7, rating: 4.4, reviewCount: 22, skills: ['Concrete Work', 'Plumbing'], bio: 'Reliable contractor in Ahmedabad.', isVerified: true, projectCount: 12, connections: 80, memberSince: '2021' },
      { name: 'Vishal Thakur', email: 'vishal.thakur@email.com', phone: '+91-9000000012', password: hashedPassword, role: 'contractor', city: 'Mumbai', company: 'Thakur Works', experience: 9, rating: 4.2, reviewCount: 18, skills: ['Electrical', 'Painting'], bio: 'Skilled contractor in Mumbai.', isVerified: false, projectCount: 10, connections: 65, memberSince: '2022' },
      { name: 'Rakesh Dubey', email: 'rakesh.dubey@email.com', phone: '+91-9000000013', password: hashedPassword, role: 'contractor', city: 'Pune', company: 'Dubey Services', experience: 5, rating: 4.0, reviewCount: 14, skills: ['Carpentry', 'Tiling'], bio: 'Dedicated contractor from Pune.', isVerified: true, projectCount: 8, connections: 50, memberSince: '2023' },
      // Clients
      { name: 'Priya Nair', email: 'priya.nair@email.com', phone: '+91-9000000021', password: hashedPassword, role: 'client', city: 'Ahmedabad', experience: 0, rating: 4.6, reviewCount: 12, skills: [], bio: 'Looking for quality construction services.', isVerified: true, projectCount: 3, connections: 40, memberSince: '2023' },
      { name: 'Ravi Iyer', email: 'ravi.iyer@email.com', phone: '+91-9000000022', password: hashedPassword, role: 'client', city: 'Mumbai', experience: 0, rating: 4.1, reviewCount: 8, skills: [], bio: 'Commercial property investor.', isVerified: true, projectCount: 5, connections: 30, memberSince: '2022' },
      { name: 'Sneha Reddy', email: 'sneha.reddy@email.com', phone: '+91-9000000023', password: hashedPassword, role: 'client', city: 'Bangalore', experience: 0, rating: 4.3, reviewCount: 6, skills: [], bio: 'Homeowner in Bangalore.', isVerified: false, projectCount: 2, connections: 20, memberSince: '2024' },
      { name: 'Kavita Shah', email: 'kavita.shah@email.com', phone: '+91-9000000024', password: hashedPassword, role: 'client', city: 'Hyderabad', experience: 0, rating: 3.9, reviewCount: 4, skills: [], bio: 'Client based in Hyderabad.', isVerified: true, projectCount: 1, connections: 15, memberSince: '2024' },
      { name: 'Meera Pillai', email: 'meera.pillai@email.com', phone: '+91-9000000025', password: hashedPassword, role: 'client', city: 'Chennai', experience: 0, rating: 4.5, reviewCount: 10, skills: [], bio: 'Interior design enthusiast.', isVerified: true, projectCount: 4, connections: 35, memberSince: '2023' },
      // Labourers
      { name: 'Raju Kewat', email: 'raju.kewat@email.com', phone: '+91-9000000031', password: hashedPassword, role: 'labourer', city: 'Ahmedabad', experience: 5, rating: 4.0, reviewCount: 10, skills: ['Concrete Work', 'Masonry'], bio: 'Hard-working labourer.', isVerified: true, projectCount: 8, connections: 25, memberSince: '2022' },
      { name: 'Mohan Pal', email: 'mohan.pal@email.com', phone: '+91-9000000032', password: hashedPassword, role: 'labourer', city: 'Delhi', experience: 3, rating: 3.8, reviewCount: 7, skills: ['Painting'], bio: 'Experienced daily-wage worker.', isVerified: false, projectCount: 5, connections: 15, memberSince: '2023' },
      // Skilled Labour
      { name: 'Farhan Sheikh', email: 'farhan.sheikh@email.com', phone: '+91-9000000041', password: hashedPassword, role: 'skilled_labour', city: 'Mumbai', experience: 8, rating: 4.6, reviewCount: 20, skills: ['Electrical', 'HVAC'], bio: 'Certified electrician.', isVerified: true, projectCount: 15, connections: 60, memberSince: '2021' },
      { name: 'Babu Plumber', email: 'babu.plumber@email.com', phone: '+91-9000000042', password: hashedPassword, role: 'skilled_labour', city: 'Pune', experience: 6, rating: 4.3, reviewCount: 15, skills: ['Plumbing', 'Tiling'], bio: 'Expert plumber.', isVerified: true, projectCount: 12, connections: 45, memberSince: '2022' },
      // Dealers
      { name: 'Shree Cement House', email: 'shree.cement@email.com', phone: '+91-9000000051', password: hashedPassword, role: 'dealer', city: 'Ahmedabad', company: 'Shree Cement Pvt Ltd', experience: 20, rating: 4.7, reviewCount: 55, skills: [], bio: 'Leading cement supplier in Gujarat.', isVerified: true, projectCount: 0, connections: 300, memberSince: '2020' },
      { name: 'National Steel Corp', email: 'national.steel@email.com', phone: '+91-9000000052', password: hashedPassword, role: 'dealer', city: 'Mumbai', company: 'National Steel Corp', experience: 15, rating: 4.5, reviewCount: 40, skills: [], bio: 'Premium steel supplier.', isVerified: true, projectCount: 0, connections: 250, memberSince: '2020' },
      { name: 'Bharat Electricals', email: 'bharat.electricals@email.com', phone: '+91-9000000053', password: hashedPassword, role: 'dealer', city: 'Delhi', company: 'Bharat Electricals', experience: 10, rating: 4.4, reviewCount: 30, skills: [], bio: 'Electrical supplies dealer.', isVerified: true, projectCount: 0, connections: 180, memberSince: '2021' },
      { name: 'Om Sai Paints', email: 'omsai.paints@email.com', phone: '+91-9000000054', password: hashedPassword, role: 'dealer', city: 'Pune', company: 'Om Sai Paints Ltd', experience: 8, rating: 4.3, reviewCount: 25, skills: [], bio: 'Paint supplier covering Maharashtra.', isVerified: true, projectCount: 0, connections: 120, memberSince: '2022' },
      { name: 'Gupta Building Materials', email: 'gupta.materials@email.com', phone: '+91-9000000055', password: hashedPassword, role: 'dealer', city: 'Jaipur', company: 'Gupta Materials Ltd', experience: 12, rating: 4.2, reviewCount: 20, skills: [], bio: 'One-stop building materials shop.', isVerified: true, projectCount: 0, connections: 100, memberSince: '2021' },
    ];

    const users = await User.insertMany(userData);
    console.log(`👥 Seeded ${users.length} users`);

    // Map users by name for reference
    const userMap = {};
    users.forEach((u) => { userMap[u.name] = u._id; });

    // ------- PROJECTS -------
    const projectData = [
      { title: '3BHK Residential Villa', type: 'Residential', category: 'Construction', location: 'Ahmedabad', budget: { min: 2500000, max: 5000000 }, startDate: '2025-07-01', endDate: '2026-03-31', description: 'Complete construction of a 3BHK villa with modern amenities, including landscaping and interior finishing.', skills: ['Concrete Work', 'Steel Framing', 'Interior Design'], priority: 'High', status: 'Open', postedBy: userMap['Priya Nair'] },
      { title: 'Commercial Office Renovation', type: 'Commercial', category: 'Renovation', location: 'Mumbai', budget: { min: 1500000, max: 3000000 }, startDate: '2025-08-15', endDate: '2025-12-31', description: 'Renovate a 5000 sq ft commercial office space with new flooring, partitions, and electrical work.', skills: ['Electrical', 'Interior Design', 'Painting'], priority: 'Medium', status: 'In Progress', postedBy: userMap['Ravi Iyer'] },
      { title: 'Factory Warehouse Extension', type: 'Industrial', category: 'Construction', location: 'Pune', budget: { min: 8000000, max: 15000000 }, startDate: '2025-09-01', endDate: '2026-06-30', description: 'Extend existing warehouse by 10,000 sq ft with steel structure and concrete flooring.', skills: ['Steel Framing', 'Concrete Work', 'Roofing'], priority: 'High', status: 'Open', postedBy: userMap['Rajesh Kumar'] },
      { title: 'Kitchen & Bathroom Remodel', type: 'Renovation', category: 'Interior', location: 'Bangalore', budget: { min: 500000, max: 1200000 }, startDate: '2025-07-15', endDate: '2025-09-30', description: 'Complete remodel of kitchen and 2 bathrooms in a luxury apartment.', skills: ['Plumbing', 'Tiling', 'Carpentry'], priority: 'Medium', status: 'Open', postedBy: userMap['Sneha Reddy'] },
      { title: 'Electrical Wiring — New Building', type: 'Residential', category: 'Electrical', location: 'Delhi', budget: { min: 300000, max: 800000 }, startDate: '2025-07-10', endDate: '2025-10-10', description: 'Complete electrical wiring and panel installation for a new 4-storey residential building.', skills: ['Electrical', 'HVAC'], priority: 'High', status: 'In Progress', postedBy: userMap['Amit Sharma'] },
      { title: 'Swimming Pool Construction', type: 'Residential', category: 'Construction', location: 'Hyderabad', budget: { min: 1000000, max: 2500000 }, startDate: '2025-08-01', endDate: '2025-11-30', description: 'Build an outdoor swimming pool with deck area and changing rooms.', skills: ['Concrete Work', 'Plumbing', 'Tiling'], priority: 'Low', status: 'Open', postedBy: userMap['Kavita Shah'] },
      { title: 'Road Resurfacing Project', type: 'Commercial', category: 'Civil', location: 'Jaipur', budget: { min: 5000000, max: 10000000 }, startDate: '2025-10-01', endDate: '2026-02-28', description: 'Resurface 2km of main road with asphalt including drainage improvements.', skills: ['Concrete Work', 'Masonry'], priority: 'High', status: 'Closed', postedBy: userMap['Vikram Singh'] },
      { title: 'Luxury Penthouse Interior', type: 'Residential', category: 'Interior', location: 'Chennai', budget: { min: 3000000, max: 7000000 }, startDate: '2025-08-15', endDate: '2026-01-15', description: 'Full interior design and execution for a luxury penthouse including custom furniture.', skills: ['Interior Design', 'Carpentry', 'Painting'], priority: 'Medium', status: 'In Progress', postedBy: userMap['Meera Pillai'] },
    ];

    const projects = await Project.insertMany(projectData);
    console.log(`📋 Seeded ${projects.length} projects`);

    // ------- ORDERS -------
    const orderData = [
      { orderId: 'ORD-20250601', itemName: 'UltraTech Cement (OPC 53)', category: 'Cement', categoryIcon: 'cube', quantity: 200, unit: 'bags', unitPrice: 380, total: 76000, supplier: userMap['Shree Cement House'], buyer: userMap['Rajesh Kumar'], status: 'Delivered', orderedDate: '2025-06-01', deliveredDate: '2025-06-04', progress: 4 },
      { orderId: 'ORD-20250605', itemName: 'TMT Steel Bars (Fe-500)', category: 'Steel', categoryIcon: 'pipe', quantity: 5, unit: 'tons', unitPrice: 52000, total: 260000, supplier: userMap['National Steel Corp'], buyer: userMap['Amit Sharma'], status: 'In Progress', orderedDate: '2025-06-05', progress: 3 },
      { orderId: 'ORD-20250607', itemName: 'Birla White Cement', category: 'Cement', categoryIcon: 'cube', quantity: 50, unit: 'bags', unitPrice: 550, total: 27500, supplier: userMap['Gupta Building Materials'], buyer: userMap['Vikram Singh'], status: 'Pending', orderedDate: '2025-06-07', progress: 1 },
      { orderId: 'ORD-20250603', itemName: 'Havells Copper Wire (4mm)', category: 'Electrical', categoryIcon: 'flash', quantity: 10, unit: 'coils', unitPrice: 4500, total: 45000, supplier: userMap['Bharat Electricals'], buyer: userMap['Henil Patel'], status: 'Cancelled', orderedDate: '2025-06-03', progress: 0 },
      { orderId: 'ORD-20250608', itemName: 'Asian Paints Royale (20L)', category: 'Paints', categoryIcon: 'format-paint', quantity: 15, unit: 'buckets', unitPrice: 3200, total: 48000, supplier: userMap['Om Sai Paints'], buyer: userMap['Henil Patel'], status: 'In Progress', orderedDate: '2025-06-08', progress: 2 },
    ];

    await Order.insertMany(orderData);
    console.log(`📦 Seeded ${orderData.length} orders`);

    // ------- ATTENDANCE -------
    const labourerUser = users.find((u) => u.name === 'Raju Kewat');
    const attendanceData = [
      { user: labourerUser._id, date: '2025-06-01', site: 'Ahmedabad Villa Project', shift: '8:00 AM - 5:00 PM', hoursWorked: 8, contractor: 'Arun Mehta', status: 'Present', checkIn: '7:55 AM', checkOut: '5:10 PM' },
      { user: labourerUser._id, date: '2025-06-02', site: 'Ahmedabad Villa Project', shift: '8:00 AM - 5:00 PM', hoursWorked: 8, contractor: 'Arun Mehta', status: 'Present', checkIn: '8:02 AM', checkOut: '5:00 PM' },
      { user: labourerUser._id, date: '2025-06-03', site: 'Mumbai Office Renovation', shift: '9:00 AM - 6:00 PM', hoursWorked: 4, contractor: 'Vishal Thakur', status: 'Half Day', checkIn: '9:10 AM', checkOut: '1:15 PM' },
      { user: labourerUser._id, date: '2025-06-04', site: 'Mumbai Office Renovation', shift: '9:00 AM - 6:00 PM', hoursWorked: 0, contractor: 'Vishal Thakur', status: 'Absent', checkIn: null, checkOut: null },
      { user: labourerUser._id, date: '2025-06-05', site: 'Ahmedabad Villa Project', shift: '8:00 AM - 5:00 PM', hoursWorked: 8, contractor: 'Arun Mehta', status: 'Present', checkIn: '7:50 AM', checkOut: '5:05 PM' },
    ];

    // Also seed attendance for Henil
    const henilAttendance = [
      { user: userMap['Henil Patel'], date: '2025-06-01', site: 'Ahmedabad Villa Project', shift: '8:00 AM - 5:00 PM', hoursWorked: 8, contractor: 'Arun Mehta', status: 'Present', checkIn: '7:55 AM', checkOut: '5:10 PM' },
      { user: userMap['Henil Patel'], date: '2025-06-02', site: 'Ahmedabad Villa Project', shift: '8:00 AM - 5:00 PM', hoursWorked: 8, contractor: 'Arun Mehta', status: 'Present', checkIn: '8:00 AM', checkOut: '5:00 PM' },
      { user: userMap['Henil Patel'], date: '2025-06-03', site: 'Ahmedabad Villa Project', shift: '8:00 AM - 5:00 PM', hoursWorked: 4, contractor: 'Arun Mehta', status: 'Half Day', checkIn: '8:05 AM', checkOut: '12:30 PM' },
    ];

    await Attendance.insertMany([...attendanceData, ...henilAttendance]);
    console.log(`📅 Seeded ${attendanceData.length + henilAttendance.length} attendance records`);

    // ------- CATALOGUE -------
    const dealerUser = users.find((u) => u.name === 'Shree Cement House');
    const catalogueData = [
      { name: 'UltraTech Cement OPC 53', category: 'Cement', price: 380, unit: 'per bag (50kg)', inStock: true, rating: '4.5', icon: 'cube', dealer: userMap['Shree Cement House'] },
      { name: 'TMT Steel Bars Fe-500', category: 'Steel', price: 52000, unit: 'per ton', inStock: true, rating: '4.7', icon: 'pipe', dealer: userMap['National Steel Corp'] },
      { name: 'M-Sand (Manufactured Sand)', category: 'Sand', price: 1800, unit: 'per cu.m', inStock: true, rating: '4.2', icon: 'grain', dealer: userMap['Gupta Building Materials'] },
      { name: 'Red Clay Bricks (Class A)', category: 'Bricks', price: 8, unit: 'per piece', inStock: false, rating: '4.0', icon: 'wall', dealer: userMap['Gupta Building Materials'] },
      { name: 'Havells Wire 4mm Copper', category: 'Electrical', price: 4500, unit: 'per coil', inStock: true, rating: '4.6', icon: 'flash', dealer: userMap['Bharat Electricals'] },
      { name: 'Asian Paints Royale 20L', category: 'Paints', price: 3200, unit: 'per bucket', inStock: true, rating: '4.8', icon: 'format-paint', dealer: userMap['Om Sai Paints'] },
    ];

    await CatalogueItem.insertMany(catalogueData);
    console.log(`🏪 Seeded ${catalogueData.length} catalogue items`);

    // ------- BANNERS -------
    const bannerData = [
      { title: 'Find Top Contractors Near You', subtitle: 'Connect with 500+ verified contractors', gradient: ['#F4811F', '#FFB347'], order: 1 },
      { title: 'Post Your Project Today', subtitle: 'Get bids from trusted builders', gradient: ['#1B2A4A', '#2E4A7A'], order: 2 },
      { title: 'Best Deals on Materials', subtitle: 'Save up to 20% on bulk orders', gradient: ['#22C55E', '#16A34A'], order: 3 },
    ];

    await Banner.insertMany(bannerData);
    console.log(`🎯 Seeded ${bannerData.length} banners`);

    // ------- FEED (for Henil) -------
    const feedData = [
      { title: '3BHK Villa project updated', project: 'Ahmedabad Villa', status: 'In Progress', type: 'update', user: userMap['Henil Patel'] },
      { title: 'New bid received', project: 'Office Renovation', status: 'Open', type: 'bid', user: userMap['Henil Patel'] },
      { title: 'Order dispatched', project: 'TMT Steel — ORD-20250605', status: 'In Progress', type: 'order', user: userMap['Henil Patel'] },
      { title: 'Contractor joined your project', project: 'Factory Extension', status: 'In Progress', type: 'join', user: userMap['Henil Patel'] },
      { title: 'Payment received', project: 'Kitchen Remodel', status: 'Completed', type: 'payment', user: userMap['Henil Patel'] },
    ];

    await Feed.insertMany(feedData);
    console.log(`📰 Seeded ${feedData.length} feed entries`);

    // ------- TASKS (for Raju - labourer) -------
    const taskData = [
      { title: 'Foundation concrete pouring', completed: true, assignedTo: labourerUser._id, contractor: 'Arun Mehta', dailyRate: 800, startDate: '2025-06-01', project: projects[0]._id },
      { title: 'Steel framework installation', completed: true, assignedTo: labourerUser._id, contractor: 'Arun Mehta', dailyRate: 800, project: projects[0]._id },
      { title: 'Brick wall construction (Ground floor)', completed: false, assignedTo: labourerUser._id, contractor: 'Arun Mehta', dailyRate: 800, project: projects[0]._id },
      { title: 'Electrical conduit laying', completed: false, assignedTo: labourerUser._id, contractor: 'Arun Mehta', dailyRate: 800, project: projects[0]._id },
      { title: 'Plumbing pipe installation', completed: false, assignedTo: labourerUser._id, contractor: 'Arun Mehta', dailyRate: 800, project: projects[0]._id },
    ];

    await Task.insertMany(taskData);
    console.log(`✅ Seeded ${taskData.length} tasks`);

    // ------- PAYMENTS -------
    const paymentData = [
      { user: labourerUser._id, date: '2025-06-07', amount: 4800, status: 'Completed', project: projects[0]._id },
      { user: labourerUser._id, date: '2025-06-01', amount: 5600, status: 'Completed', project: projects[0]._id },
      { user: labourerUser._id, date: '2025-05-25', amount: 4000, status: 'Pending', project: projects[0]._id },
    ];

    await Payment.insertMany(paymentData);
    console.log(`💰 Seeded ${paymentData.length} payments`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('📝 Default login: henil.patel@stonebeam.in / password123');
    console.log('📝 All seed users use password: password123\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error.message);
    process.exit(1);
  }
};

seedDB();
