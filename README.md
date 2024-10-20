# Fitness Quest Tracker

## Project Structure
```text
fitnesstracker_ui
├── .gitignore
├── README.md
├── diff
├── log
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
    │   ├── common
    │   │   ├── ErrorBoundary.js
    │   │   ├── MainButton.js
    │   │   └── Navbar.js
    │   └── dashboard
    │       ├── Dashboard.css
    │       ├── admin
    │       │   ├── AdminDashboard.js
    │       │   └── views
    │       │       └── AdminOverview.js
    │       ├── common
    │       │   ├── MainContent.js
    │       │   ├── SideNav.js
    │       │   ├── SideNavItem.js
    │       │   └── tile
    │       │       ├── LargeTile.js
    │       │       ├── MediumTile.js
    │       │       └── SmallTile.js
    │       └── member
    │           ├── MemberDashboard.js
    │           ├── content
    │           │   ├── FitnessEntryDetails.js
    │           │   ├── FitnessEntryItem.js
    │           │   └── FitnessEntryList.js
    │           └── views
    │               ├── MemberOverview.js
    │               ├── MemberProfile.js
    │               └── MemberSettings.js
    ├── context
    │   └── AuthContext.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    ├── pages
    │   ├── auth
    │   │   ├── Login.js
    │   │   ├── Logout.js
    │   │   └── Register.js
    │   └── landing
    │       └── LandingPage.js
    ├── reportWebVitals.js
    ├── routes
    │   ├── AuthRoutes.js
    │   └── DashboardRoutes.js
    ├── services
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
