<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# Equipment Rental Platform — Project Context

This file is the long-term agent instruction document for the **Equipment Rental Platform** project.

- **Project:** Equipment Rental Platform
- **Assignment:** Programming Hero Batch 14 — Assignment 9, Category 003
- **Current task scope:** Update this agent instruction file only. Do not implement project functionality at this stage.

## 1. Project Overview

### Project Name
Equipment Rental Platform

### Assignment
Programming Hero Batch 14 — Assignment 9, Category 003.

### Project Objective
Build a full-stack Equipment Rental Marketplace where equipment owners can list their equipment for rent, and customers can browse available equipment, book equipment for a specific period, and complete secure online payments.

The platform will connect equipment owners and customers through a transparent and secure marketplace.

The system will include:

- User authentication.
- Role-based authorization.
- Equipment management.
- Equipment approval management.
- Equipment searching and filtering.
- Rental booking.
- Availability checking.
- Online payments.
- Customer dashboard.
- Owner dashboard.
- Admin dashboard.
- Profile management.
- Dashboard analytics.

The project should look and behave like a professional real-world rental marketplace.

It should not look like a basic tutorial project or a generic dashboard template.

## 2. Preferred Technology Stack

### Frontend
- Next.js with App Router.
- TypeScript.
- Tailwind CSS.
- shadcn/ui for UI components.
- Framer Motion for required animations.
- React Server Components and Client Components where appropriate.

#### Frontend Preferences
- Use Next.js App Router conventions.
- Prefer TypeScript for frontend development.
- Use Tailwind CSS for styling.
- Use shadcn/ui for reusable UI components.
- Use Framer Motion only where animations are required.
- Keep components simple and understandable.
- Avoid unnecessary dependencies.

- Do not introduce HeroUI or DaisyUI alongside shadcn/ui unless the user explicitly requests them.

- The user's preferred UI library is shadcn/ui.

### Authentication and Authorization
- Better Auth.
- MongoDB Adapter.
- JWT-based authentication.
- Role-Based Access Control (RBAC).

Roles:
1. Customer
2. Owner
3. Admin

Important: Better Auth sessions and JWT access tokens are not automatically interchangeable. Any future implementation must respect the assignment's JWT requirement and use a proper token generation and verification strategy.

### Backend
- Node.js.
- Express.js.
- MongoDB.
- JavaScript.

- Use JavaScript for backend development because the user wants beginner-friendly and easy-to-understand code.

- Do not introduce advanced TypeScript backend patterns unless the user explicitly requests them.

### Database
- MongoDB.
- MongoDB Native Driver where appropriate.
- Better Auth MongoDB Adapter for authentication-related data.

### Payment
- Stripe.
- Stripe Checkout for secure rental payments.

### Image Upload
- ImgBB API for equipment image uploads.

- The frontend will upload images to ImgBB and store the returned image URL in MongoDB.

### Animation
- Framer Motion.

Required animation sections:
1. Home page Banner.
2. Featured Equipment.
3. Categories Section.

- Review and extra-section animations are optional.

## 3. Most Important Coding Philosophy

This is one of the most important parts of this project.

The user is still learning full-stack web development and does not want advanced, complicated, unnecessarily abstract, or overly engineered code.

### Keep Code Simple
- Write straightforward code.
- Use meaningful variable names.
- Use meaningful function names.
- Keep functions easy to understand.
- Use simple conditional statements.
- Use simple loops and array methods.
- Avoid unnecessary abstractions.
- Avoid overly complex reusable architectures.
- Avoid deeply nested logic.
- Avoid complicated generic types.
- Avoid unnecessary design patterns.
- Avoid premature optimization.

### Do Not Overengineer
Do not introduce:
- Complex repository patterns.
- Unnecessary service abstractions.
- Advanced dependency injection.
- Complicated custom hooks.
- Unnecessary context providers.
- Unnecessary state management libraries.
- Excessive utility functions.
- Unnecessary custom middleware layers.
- Complex generic TypeScript utilities.
- Multiple libraries for solving the same problem.

Use these patterns only if they are genuinely necessary or requested.

### Understandability Comes First
The user should be able to open any file and understand:
- What the code does.
- Why it exists.
- How the functionality works.
- Where the data comes from.
- Where the data goes.
- How different files communicate with each other.

Prefer readable code over clever code.

Do not try to impress the user with advanced programming techniques.

### No Unrequested Functionality
Only implement features that:
1. Are required by the assignment.
2. Were explicitly requested.
3. Are genuinely necessary for an existing feature to work correctly.

Optional assignment features must remain optional until requested.

## 4. Assignment Requirements

Treat the following sections as the main project specification.

### A. Authentication and Authorization

#### Registration
Registration must support:
- Name.
- Email.
- Profile Image.
- Password.

Profile image can be provided through a direct image URL or ImgBB upload.

Password validation:
- At least one uppercase letter.
- At least one lowercase letter.
- Minimum 6 characters.

Show an appropriate error message or toast if validation fails.

After successful registration, show a success toast.

Provide a link to the Login page.

#### Login
Implement:
- Email and Password Login.
- JWT-based authentication.
- Secure access token generation.
- Google Social Login.
- Success and error notifications.

Users registering through Google must receive the Customer role by default.

#### Authentication Restrictions
Do not implement:
- Email Verification.
- Forgot Password.

These features are explicitly excluded from the assignment requirements.

#### Role-Based Access Control
Supported roles:
- Customer.
- Owner.
- Admin.

Use authentication and authorization middleware to protect backend APIs.

Only authorized users should access their respective dashboard functionality.

Never trust a role supplied by the frontend.

Users must not be able to assign themselves the Admin role.

### B. Global Layout
The main application layout should contain:
1. Header.
2. Dynamic Route Content.
3. Footer.

The content area should change based on the current route.

Use a consistent design system throughout the application.

### C. Home Page — Public Route

#### Navbar
Include:
- Logo.
- Website Name.
- Home.
- All Equipment.
- About Us (Optional).
- Contact Us (Optional).
- How It Works (Optional).
- Login.
- Register.
- Dashboard when logged in.
- Logout when logged in.

The Dashboard destination should depend on the authenticated user's role.

#### Banner
Include:
- High-quality image.
- Attractive heading.
- Short project description.
- Relevant call-to-action.

Use Framer Motion animation.

#### Featured Equipment
- Display exactly 6 approved equipment items.
- Retrieve them using a MongoDB query with limit(6).
- Display them in attractive equipment cards.
- If a user is not logged in and clicks View Details, redirect them to Login.
- If logged in, navigate to the Equipment Details page.

#### Categories
Display these categories:
1. Construction Equipment.
2. Photography Equipment.
3. Vehicles & Transportation.
4. Agriculture Equipment.
5. Electronics.
6. Event Equipment.

Use Framer Motion animation.

#### Why Choose Us
Highlight:
- Affordable rental prices.
- Verified equipment owners.
- Flexible rental periods.
- Secure payments.

#### Customer Reviews
Display at least 4 reviews.

Each review should include:
- Customer Name.
- Rating.
- Review Comments.

#### Extra Sections
Add at least 2 relevant sections.

Examples:
- Popular Equipment.
- Recently Added Equipment.
- How It Works.
- Trusted Equipment Owners.

Use Framer Motion animation in the required sections.

### D. Equipment Details Page — Private Route
Display:
- Equipment Name.
- Description.
- Category.
- Rental Price.
- Rental Type.
- Location.
- Available Quantity.
- Equipment Image.
- Owner Information.
- Rental Terms and Conditions.

Rental types:
- Daily.
- Weekly.
- Monthly.

#### Favorites
Customers should be able to:
- Add equipment to Favorites.
- Save favorites in MongoDB.
- View favorite equipment in their dashboard.
- Remove favorite equipment.

#### Booking
Clicking Book Now should open a booking modal.

Required fields:
- Rental Start Date.
- Rental End Date.
- Required Quantity.
- Contact Number.
- Delivery Address.
- Additional Notes.

After confirmation:
- Calculate the total rental amount.
- Check equipment availability.
- Redirect the customer to the payment process.

Availability must consider existing bookings and overlapping rental periods. Do not rely only on the original available quantity.

#### Payment
Use Stripe Checkout.

Expected workflow:
1. Customer confirms rental information.
2. Backend validates the booking information.
3. Backend checks equipment availability.
4. Backend calculates the rental amount.
5. A pending booking or reservation is created.
6. A Stripe Checkout Session is created.
7. Customer is redirected to Stripe Checkout.
8. Stripe confirms the payment.
9. The verified payment result updates the booking.
10. Transaction details are saved in the payments collection.
11. Customer is redirected to the payment success page.

Important security expectations:
- Never trust only the payment success redirect URL.
- Verify payment using Stripe's trusted server-side mechanism, preferably webhooks.
- Handle duplicate webhook events safely.
- Never expose Stripe secret keys on the frontend.

Keep booking status and payment status as separate fields.

### E. All Equipment Page — Public Route
Display all approved equipment in a responsive grid.

- Desktop: 3 columns.
- Tablet: 2 columns.
- Mobile: 1 column.

Each card should display:
- Equipment Image.
- Equipment Name.
- Category.
- Rental Price.
- Rental Type.
- Location.
- Availability Status.
- View Details Button.

#### Search
Users can search by:
- Equipment Name.
- Location.

#### Filters
Include:
- Equipment Category.
- Rental Type.
- Price Range.
- Availability.

#### Sorting
Include:
- Price Low to High.
- Price High to Low.
- Recently Added.

Backend filtering and sorting are mandatory.

Use query parameters and perform filtering/sorting on the server.

The backend must always return approved equipment for public listings.

### F. Customer Dashboard — Private Route
Customer Dashboard should contain:
1. My Rentals.
2. Favorites.
3. Profile.

#### My Rentals
Display the currently logged-in customer's rental bookings in a table.

Columns:
- Equipment Name.
- Rental Start Date.
- Rental End Date.
- Booking Date.
- Total Amount.
- Payment Status.
- Booking Status.

#### Favorites
Display the currently logged-in customer's favorite equipment in a table.

Actions:
- View Details.
- Remove Favorite.

A customer must only access their own favorites.

#### Profile
Every authenticated user must have a profile page.

Profile information:
- Name.
- Email.
- Profile Image.
- Phone Number.
- Address.

Users can update their profile information.

### G. Owner Dashboard — Private Route
Owner Dashboard should contain:
1. Add Equipment.
2. My Equipment.
3. My Equipment Rental.
4. My Profile.

#### Add Equipment
Owners can add equipment for rent.

Required fields:
- Equipment Name.
- Description.
- Category (Dropdown).
- Location.
- Rental Price.
- Rental Type (Daily, Weekly, Monthly).
- Available Quantity.
- Equipment Condition.
- Brand.
- Model.
- Equipment Image (ImgBB Upload).
- Rental Terms and Conditions.
- Status.
- Owner Information.

The default equipment status must be Pending.

Possible statuses:
- Pending.
- Approved.
- Rejected.

Owner information must come from the authenticated user, not from blindly trusted frontend input.

#### My Equipment
Display equipment belonging to the currently logged-in owner in a table.

Columns:
- Equipment Name.
- Category.
- Rental Price.
- Available Quantity.
- Status.

Actions:
- Update.
- Delete.
- View Details.

An owner must not update or delete another owner's equipment.

#### My Equipment Rental
Display rental bookings associated with the currently logged-in owner's equipment.

Columns:
- Customer Information.
- Equipment Information.
- Rental Duration.
- Required Quantity.
- Booking Amount.
- Payment Status.
- Booking Status.

Owners should only access rental information related to their own equipment.

#### My Profile
Use the shared profile functionality.

### H. Admin Dashboard — Private Route
Admin Dashboard should contain:
1. All Users.
2. All Equipment.
3. All Rentals.
4. My Profile.

#### Admin Dashboard Stats Cards
Show a stats card for **Completed Rentals** on the Admin Dashboard. Calculate its value from actual booking records whose rental status is completed; do not use a hardcoded number. Keep booking status separate from payment status when determining whether a rental is completed.

#### All Users
Display all registered users in a table.

Information:
- Name.
- Email.
- Role.
- Registration Date.

Actions:
- Change Role (Customer, Owner, Admin).
- Manage Users.

Backend implementation is mandatory.

#### All Equipment
Display all equipment in a table.

Admin actions:
- Approve.
- Reject.
- Update.
- Delete.

Possible statuses:
- Pending.
- Approved.
- Rejected.

#### All Rentals
Display all rental booking records.

Information:
- Customer Information.
- Owner Information.
- Equipment Name.
- Rental Duration.
- Booking Amount.
- Payment Status.
- Booking Status.

Admin can monitor and manage all rental activities.

#### My Profile
Use the shared profile functionality.

### I. Dashboard Analytics — Challenge Requirement
Implement dynamic analytics for Admin and Owner dashboards when requested.

#### Admin Analytics
Calculate information using users, equipment, bookings, and payments collections.

Required metrics:
- Total Users.
- Total Equipment.
- Total Bookings.
- Pending Approvals.
- Completed Rentals.
- Total Revenue.
- Monthly Booking Statistics.

#### Owner Analytics
Calculate information using the owner's equipment, bookings, and payments.

Required metrics:
- Total Listed Equipment.
- Completed Rentals.
- Total Earnings.
- Monthly Earnings.

Analytics must be based on actual database data.

Do not use hardcoded numbers as real analytics data.

### J. Backend Security and Middleware Challenges
The assignment requires custom Express middleware.

Required middleware names:
- verifyToken.
- verifyRenter.
- verifyOwner.
- verifyAdmin.

The assignment primarily uses the role name Customer, while the JWT middleware challenge uses Renter.

Treat Customer as the application's primary role and understand Renter as the customer who rents equipment when implementing the corresponding middleware.

Requirements:
- Verify JWT tokens.
- Protect private API endpoints.
- Restrict actions by role.
- Verify resource ownership.
- Validate incoming data.
- Never trust user IDs or roles from arbitrary frontend requests.

Security must be enforced on the backend, not only through frontend route protection.

### K. UI and Design Expectations
The website must look professional, modern, clean, and recruiter-friendly.

Avoid generic templates and poor-quality designs.

Design requirements:
- Unique visual identity.
- Consistent color palette.
- Good color contrast.
- Proper alignment.
- Balanced spacing.
- Consistent typography.
- Readable paragraphs.
- Uniform image sizes.
- Consistent button styles.
- Equal card dimensions.
- Responsive layouts.
- Professional dashboard design.

The application must be responsive on:
- Mobile.
- Tablet.
- Desktop.

Dashboard requirements:
- Responsive sidebar/navigation.
- Consistent theme.
- Full-width dashboard content.
- User profile section.
- Charts and graphs for dashboard visualization.

Use charts only for the actual analytics requirements.

Do not add decorative charts with meaningless or fake data.

### L. Loading and Error States
The assignment also requires appropriate loading and error experiences.

When implementing pages later, consider:
- Loading pages.
- Loading skeletons.
- Empty states.
- Error pages.
- API error handling.
- User-friendly error messages.

Every important route should have a proper loading and error experience where appropriate.

### M. Deployment and Submission Requirements

#### Git Commits
Minimum:
- 20 meaningful client-side commits.
- 12 meaningful server-side commits.

Use descriptive commit messages.

Avoid meaningless messages such as:
- update.
- done.
- final.
- changes.

#### README
Include:
- Project Name.
- Project Purpose.
- Live URL.
- Key Features.
- Used npm Packages.

Also include useful setup instructions and environment variable documentation.

#### Environment Variables
Keep sensitive configuration in environment variables.

Never commit:
- MongoDB credentials.
- Stripe Secret Key.
- Better Auth Secret.
- ImgBB API Key.
- Other sensitive secrets.

Use `.env.example` to document required environment variable names without exposing actual values.

#### Production Deployment
Ensure:
- Backend works correctly in production.
- No CORS errors.
- No 404 errors.
- No 504 errors.
- Live frontend loads correctly.
- Direct route reload works.
- Private routes work after page reload.
- Authenticated users remain authenticated after reload.
- Frontend and backend communicate correctly.

Do not introduce unnecessary deployment rewrites or configuration changes without a real need.

### N. Optional Requirements
These are optional, not mandatory.

Do not implement them unless specifically requested.

1. Pagination on All Equipment and Booking History pages.
2. Dark Mode and Light Mode toggle with Local Storage.
3. Automated Booking Status Update using node-cron.
4. Email Notifications when a booking is completed.

Always distinguish mandatory requirements from optional requirements.

## 5. Development Rules for Future Tasks

Whenever the user asks to implement a feature in the future, follow this workflow.

### Step 1: Understand the Existing Project
Before writing code:
- Inspect the relevant files.
- Understand the existing folder structure.
- Check the existing coding style.
- Understand the current authentication flow.
- Understand existing API patterns.
- Check how the frontend communicates with the backend.

Do not assume that files or functionality exist without checking.

### Step 2: Explain the Plan
Before implementing a feature, briefly explain:
- What needs to be done.
- Which files need to be created or modified.
- How the feature will work.
- How the frontend and backend will communicate.

### Step 3: Implement Only the Requested Feature
- Do not modify unrelated functionality.
- Do not refactor unrelated code.
- Do not add unnecessary packages.
- Keep the implementation as simple as possible.

### Step 4: Explain the Code
When providing code or implementation guidance:
- Explain what each important section does.
- Explain the data flow.
- Explain why the approach is used.
- Use beginner-friendly language.
- Highlight important concepts.

The user wants to learn while building this project.

### Step 5: Verify the Implementation
Check:
- TypeScript errors.
- Runtime errors.
- API response handling.
- Authentication.
- Authorization.
- Responsive behavior.
- Existing functionality.

Do not claim that something works unless it has actually been checked.

## 6. How the Agent Should Communicate With the User

The user prefers Bangla explanations.

- Use simple, beginner-friendly Bangla when explaining concepts, implementation steps, architecture, or errors.
- Technical terms, function names, variable names, and code should remain in English.

Important communication preferences:
- Explain step by step.
- Do not assume the user understands advanced concepts.
- Explain unfamiliar concepts before using them.
- Avoid unnecessarily long or complicated explanations.
- Do not give advanced solutions when a simple solution is sufficient.
- Do not implement anything unless explicitly asked.
- If asked only for an explanation, explain without writing code.
- If asked for code, provide understandable code with a clear explanation.

The user's goal is not just to complete the assignment. They also want to understand how the entire application works.

## 7. Final Instruction

Treat this document as the long-term project context for Programming Hero Batch 14 Assignment 9.

Remember the project objective, assignment requirements, technology preferences, coding philosophy, and communication preferences.

Most importantly:

**The user wants a complete, professional Equipment Rental Platform, but wants to build it using simple, readable, beginner-friendly code.**

- Do not overengineer anything.
- Do not independently implement features.
- Always follow the user's specific instructions for each task.

For the current task, update ONLY this agent instruction file.

Do not implement any project functionality yet.
