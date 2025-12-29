// My Dashboard Project

// The link of the project is : https://www.youtube.com/watch?v=jx5hdo50a2M

/*
    - to install the dependencies we use : npm install --legacy-peer-deps



        -- The steps to create this project are : --

create the app using vite & install tailwindcss
    1. npm create vite@latest my-dashboard
    2. cd my-dashboard
    3. npm install tailwindcss @tailwindcss/vite
    4. add the code in tailwind.config.js file the adition from tailwindcss website
       if you want to customize the colors and other things you can add them in the extend object in the theme object


    5. create a components folder in the src folder
    6. create a context folder in the src folder for context api
    7. create a pages folder in the src folder for different pages of the dashboard

    then go to the App.jsx file and start building the dashboard by import the necessary libraries and components

    in the App.jsx file we use react-router-dom for routing between different pages of the dashboard





*/

/*
    craco.config.js file explanation :
CRACO stands for Create React App Configuration Override. Here's what it does:

Purpose
CRACO is a tool that allows you to customize Create React App (CRA) without ejecting.
 It lets you override webpack, babel, and other configurations that CRA normally hides from you.

This tells CRA's build system to:
Process CSS through Tailwind CSS (adds utility classes)
Process CSS through Autoprefixer (adds vendor prefixes like -webkit-, -moz- for browser compatibility)


*/

/*
    Notes in selecting the syncfusion commercial UI library :

What is Syncfusion?
Syncfusion is a commercial UI component library that provides pre-built React components like:

Data tables/grids
Charts
Calendars
Kanban boards
Editors
And many more
The trial version shows license warnings and has limitations. You need a valid license to remove the message.

Your Options
1. Use the Free Community License (Recommended - Free)

Syncfusion offers a free community license for developers earning less than $1 million annually
No credit card needed, just create an account
Visit: https://www.syncfusion.com/sales/communitylicense
2. Switch to Free Alternatives (No License Issues)

React Table - Data tables (https://tanstack.com/table)
Recharts - Charts (https://recharts.org/)
React Big Calendar - Calendar component (https://jquense.github.io/react-big-calendar/)
shadcn/ui - Beautiful UI components (https://ui.shadcn.com/)
Material-UI (MUI) - Complete component library (https://mui.com/)
Ant Design - Enterprise UI library (https://ant.design/)
3. Keep Syncfusion (Paid Option)

Purchase a license if you need their advanced features
My Recommendation
Since you're learning and don't need Syncfusion specifically, I'd suggest switching to free alternatives. They're:

✅ Free forever
✅ No license messages
✅ Great for production
✅ Large communities



notes when i am installling mui-icons there are some error and finally fix it

    PS D:\SoftWare Engineering\React_19\Dashboard\my-dashborad> npm install @mui/icons-material
PS D:\SoftWare Engineering\React_19\Dashboard\my-dashborad> npm cache clean --force
>> npm config set registry https://registry.npmjs.org/
>> npm config set registry https://registry.npmjs.org/
>>
npm warn using --force Recommended protections disabled.

changed 1 package, and audited 244 packages in 10h

51 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

*/

// code of Sidebar.jsx file is a component from MUI library for sidebar
// now i am practising on git commands

/*
    After creating components and pages folders and adding the necessary code
    i started with Sidebar component and started to build it .



*/
