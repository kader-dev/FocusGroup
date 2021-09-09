/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {
    path: "/private/rooms", // the url
    icon: "HomeIcon", // the component being exported from icons/index.js
    name: "Rooms", // name that appear in Sidebar
  },
  {
    path: "/private/recordings",
    icon: "CardsIcon",
    name: "Recordings",
  },
  {
    path: "/private/clients",
    icon: "PeopleIcon",
    name: "Clients",
  },
  {
    path: "/private/votes",
    icon: "ChartsIcon",
    name: "Votes",
  },
];

export default routes;
