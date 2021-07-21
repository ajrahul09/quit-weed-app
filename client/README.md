## QUITWEED.ORG

This subfolder contains the client built over React.js. 

## MODULES

The source code is broken down into multiple modules inside the "/client/src" folder.

### SRC/ASSETS
This folder contains all the images used inside the application. 

### SRC/CONTEXTS
This contains the global contexts used inside the application
1. api-context.js: Contains GET, POST AND PATCH api calls directed to the server e.g. for profile and dailylog
2. user-context.js: Contains api calls directed to the server for login and registration

### SRC/ROUTES
This contains the HOC's for the routes used in the application

### SRC/COMPONENTS
As the name suggests, it contains all the different components used inside the front-end application. 

1. /Backdrop: Contains the component for the backdrop when user opens the burger menu on the mobile screen.
2. /Charts: Contains the charts used for the dailyLogs. This uses the Highchart library for building charts
3. /DailyLog: Contains the component used for the displaying the daily logs as list. It also contains the form where user fills in the daily log. 
4. /Dashboard: Contains the component used for displaying the "Time smoke free", "Money saved", "Money saved in a year" and others.
5. /Home: It navigates the user to either Dashboard or the ProfileForm. If user is using it for the first time, it redirects it to ProfileForm so the user can update his/her profile or else Dashboard.
6. /LandingPage: It contains the landing page as the name suggests which welcomes the user to QuitWeed.org and contains the app description and its uses.
7. /MainHeader: This is the nav bar used in the app which you see on the top with links like Login, Register, Dashboard, Profile, Profile, Logout, etc
8. /Profile: It contains the ProfileForm where users can create or update its profile.
9. /SideDrawer: It contains the section which opens up when you click on the Burger menu.
10. /SignUp: Contains the signup component.
11. /UI: Contains the UI components for Input field, Button or Card.
12. App.js: This is the first component which loads and redirect the user to its correct dstination based on the URL routes. 

