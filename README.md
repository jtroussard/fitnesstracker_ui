# Fitness Quest Tracker

## Pin
get user context working

member overview - chart - no filters or setters for now - bio data only
member profile page
member profile data CRUD
member profile/avatar feature

**DONE** Layout redesign
**DONE** Bio entry CRUD

## Project Structure
```text
fitnesstracker_ui
├── .gitignore
├── README.md
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── fonts
│   │   ├── MaterialIcons-Regular.ttf
│   │   ├── MaterialIconsOutlined-Regular.otf
│   │   ├── MaterialIconsRound-Regular.otf
│   │   ├── MaterialIconsSharp-Regular.otf
│   │   └── MaterialIconsTwoTone-Regular.otf
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   ├── robots.txt
│   └── styles
│       ├── fonts.css
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
    │   │   ├── LogoutButton.js
    │   │   └── Register.js
    │   ├── common
    │   │   ├── ErrorBoundary.js
    │   │   ├── controls
    │   │   │   └── MainButton.js
    │   │   └── tiles
    │   │       ├── LargeTile.js
    │   │       ├── MediumTile.js
    │   │       ├── SmallTile.js
    │   │       └── tiles.css
    │   ├── content
    │   │   ├── admin
    │   │   │   └── view
    │   │   │       └── overview
    │   │   │           └── AdminOverview.js
    │   │   └── member
    │   │       └── view
    │   │           ├── bio-entry
    │   │           │   ├── BioEntryView.js
    │   │           │   └── sub-component
    │   │           │       ├── BioEntryDetails.js
    │   │           │       ├── BioEntryItem.js
    │   │           │       ├── BioEntryList.js
    │   │           │       └── bio-entry.css
    │   │           ├── fitness-entry
    │   │           │   └── FitnessEntryView.js
    │   │           ├── nutrition-entry
    │   │           │   └── NutritionEntryView.js
    │   │           ├── overview
    │   │           │   └── MemberOverview.js
    │   │           ├── profile
    │   │           │   └── MemberProfile.js
    │   │           └── setting
    │   │               └── MemberSettings.js
    │   ├── footer
    │   │   ├── FooterContent.js
    │   │   └── footer.css
    │   ├── home
    │   │   ├── LandingPage.js
    │   │   └── landing-page.css
    │   ├── main
    │   │   ├── MainContent.js
    │   │   └── main.css
    │   └── navigation
    │       ├── SideNav.js
    │       ├── SideNavItem.js
    │       └── navigation.css
    ├── context
    │   └── AuthContext.js
    ├── index.css
    ├── index.js
    ├── layouts
    │   ├── MainLayout.js
    │   └── layout.css
    ├── reportWebVitals.js
    ├── services
    │   └── BioEntryService.js
    └── setupTests.js
```

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
