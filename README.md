# Rentora – Equipment Rental Platform

**Rentora** is a modern equipment rental platform that connects equipment owners with customers. Users can explore available equipment, book rentals for specific dates, and make secure online payments. Equipment owners can manage their listings and bookings, while administrators oversee the entire platform.

---

## Live Website

🔗 **Live Demo:** [Rentora](https://rentora-client-amber.vercel.app)

---

## Features

### 👤 Authentication & User Management

- Secure user authentication.
- Role-based access control.
- Separate dashboards for Customers, Owners, and Admins.
- User profile management.

### 🔍 Equipment Browsing

- Browse available equipment.
- Explore equipment by category.
- View detailed equipment information.
- Discover recently added equipment.
- View equipment details after authentication.

### 📦 Equipment Management

- Owners can add new equipment.
- Manage their own equipment listings.
- Update equipment information.
- Delete their own listings.
- Admin approval system for equipment listings.

### 📅 Rental Booking

- Book equipment for specific rental dates.
- Select rental duration and quantity.
- Calculate rental costs.
- Provide delivery information.
- Manage rental bookings.

### 💳 Payment Integration

- Secure online payment with Stripe.
- Payment status tracking.
- Transaction information management.
- Booking confirmation after successful payment.

### 🛡️ Admin Dashboard

- Manage all users and equipment.
- Review pending equipment listings.
- Approve or reject equipment submissions.
- Monitor rental activities.
- Manage platform resources.

---

## Technologies Used

### Frontend

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide React

### Backend

- Node.js
- Express.js
- MongoDB

### Authentication & Payment

- Better Auth
- Stripe

### Deployment

- Vercel (Frontend)
- Backend deployment configured separately.

---

## User Roles

| Role     | Permissions                                                |
| -------- | ---------------------------------------------------------- |
| Customer | Browse equipment, book rentals, and manage bookings.       |
| Owner    | Add equipment and manage own listings and bookings.        |
| Admin    | Manage users, equipment, approvals, and rental activities. |

---

## Project Structure

### Client


rentora-client/
├── public/
├── src/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   │   ├── api/
│   │   └── auth.ts
│   ├── types/
│   └── proxy.ts
├── .env.local
├── package.json
└── README.md


### Server


rentora-server/
├── src/
│   ├── routes/
│   ├── middlewares/
│   └── config/
├── .env
├── index.js
└── package.json


---

## Installation & Setup

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- MongoDB account
- Stripe account

### 1. Clone the Repository

```bash
git clone https://github.com/fayzur030/rentora-client
```

For the backend:

```bash
git https://github.com/fayzur030/rentora-server
```

### 2. Setup Frontend

Navigate to the client directory:

```bash
cd rentora-client
```

Install dependencies:

```bash
npm install


Frontend will run at:

```text
http://localhost:3000
```

---

## Future Improvements

- Advanced equipment filtering and sorting.
- Improved booking management.
- Rental availability calendar.
- Enhanced notification system.
- More detailed analytics for administrators.

---

## Author

**Md. Fayzur Rahman**

Full-Stack Web Developer

- GitHub: [@fayzur030](https://github.com/fayzur030)
- LinkedIn: [Md. Fayzur Rahman](https://www.linkedin.com/in/md-fayzur-rahman/)

---

⭐ If you find this project interesting, consider giving it a star!
