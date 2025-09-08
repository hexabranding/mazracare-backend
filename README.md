# Mazra Backend Project

Node.js backend API for Mazra application with authentication, enquiry management, and contact forms.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
JWT_SECRET=your_jwt_secret
```

3. Run admin seeder:
```bash
node src/seeder/adminSeeder.js
```

4. Start server:
```bash
npm start
```

## API Endpoints

### Authentication
- POST `/api/auth/signup` - User registration
- POST `/api/auth/signin` - User login

### Enquiry
- POST `/api/enquiry/add` - Create enquiry (auth required)
- GET `/api/enquiry/list` - List enquiries (admin only)
- PATCH `/api/enquiry/:id/status` - Update status (admin only)

### Get In Touch
- POST `/api/getintouch/add` - Submit contact form (no auth)
- GET `/api/getintouch/list` - List contacts (admin only)
- PATCH `/api/getintouch/:id/status` - Update status (admin only)