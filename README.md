# Fitness Quest Tracker

## Project Structure
```text
fitnesstracker_ui
├── .gitignore
├── README.md
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   ├── robots.txt
│   └── styles
│       └── global.css
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── assets
    │   └── logo.png
    ├── components
    │   ├── auth
    │   │   ├── Login.js
    │   │   └── Register.js
    │   ├── common
    │   │   ├── ErrorBoundary.js
    │   │   ├── LogoutButton.js
    │   │   ├── MainButton.js
    │   │   └── Navbar.js
    │   ├── dashboard
    │   │   ├── Dashboard.css
    │   │   ├── admin
    │   │   │   ├── AdminDashboard.js
    │   │   │   └── views
    │   │   │       └── AdminOverview.js
    │   │   ├── common
    │   │   │   ├── MainContent.js
    │   │   │   ├── SideNav.js
    │   │   │   ├── SideNavItem.js
    │   │   │   └── tile
    │   │   │       ├── LargeTile.js
    │   │   │       ├── MediumTile.js
    │   │   │       ├── SmallTile.js
    │   │   │       └── tiles.css
    │   │   └── member
    │   │       ├── MemberDashboard.js
    │   │       ├── content
    │   │       │   ├── FitnessEntryDetails.js
    │   │       │   ├── FitnessEntryItem.js
    │   │       │   ├── FitnessEntryList.js
    │   │       │   └── fitness-entry.css
    │   │       └── views
    │   │           ├── MemberOverview.js
    │   │           ├── MemberProfile.js
    │   │           └── MemberSettings.js
    │   └── home
    │       └── LandingPage.js
    ├── context
    │   └── AuthContext.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    ├── reportWebVitals.js
    ├── routes
    │   ├── AuthRoutes.js
    │   └── DashboardRoutes.js
    ├── services
    │   └── fitnessEntryService.js
    └── setupTests.js
```

#### Component Descriptions
1. **MemberDashboard**: Wraps the entire dashboard, rendering `SideNav` and member-specific content.
2. **SideNav**: Displays navigation links; accepts items as props.
3. **SideNavItem**: A single clickable nav item with an icon and text.
4. **EntryPage**: Page that displays the list of entries and provides a button to add new ones.
5. **EntryList**: Renders a list of entries, fetching data from the service.
6. **Entry**: Displays basic details of an entry with options to edit or delete.
7. **EntryDetails**: Form for editing or creating entries, with save and delete actions.
8. **MainButton**: A generic button used across the dashboard, including adding entries.
9. **GenericTile**: A versatile tile component to display data or trends.
10. **TrendTile**: Specialized version of `GenericTile` for trend-based data.
11. **GraphTile**: Extends `GenericTile` to include charts.
12. **FitnessTable**: Displays entries in a tabular format.

## Role-Based Paths

In the Fitness Quest Tracker application, users are directed to specific dashboard routes based on their assigned roles. The application utilizes role-based access control to provide relevant dashboard views for each user type.

### Paths by Role

- **Admin Role (`ROLE_ADMIN`)**
  - **Path**: `/boards/admins`
  - **Description**: Grants access to the Admin Dashboard, where administrators can manage user data, view system metrics, and oversee overall application performance.

- **Member Role (`ROLE_MEMBER`)**
  - **Path**: `/boards/members`
  - **Description**: Provides access to the Member Dashboard, where members can track fitness activities, log nutrition details, and monitor personal progress.

- **Unauthorized or Unassigned Roles**
  - **Redirect Path**: `/auth/login`
  - **Description**: Users without a valid or recognized role are redirected to the login page to re-authenticate or contact support if access issues persist.

### Path Configuration
Paths are defined within the `DashboardRoutes.js` component in the `src/routes` directory. Role-based redirection is managed in the `AuthContext.js` file to ensure users are directed to the appropriate dashboard based on their assigned roles.

### Future Considerations
- **Additional Roles**: As the application expands, new roles and associated paths may be added to support different types of users and functionalities.
- **Enhanced Error Handling**: In cases where role data is missing or corrupted, the application may provide users with clearer error messages or contact options for support.

---

# (Original README from React App Creator) Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io
