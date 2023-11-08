export default [
  { path: "/login", component: "login", layout: false },
  {
    path: "/",
    routes: [
      { path: "/", component: "index", name: "首页" },
      { path: "/A", component: "A", name: "A" },
      { path: "/B", component: "B", name: "B" },
    ],
  },
];
