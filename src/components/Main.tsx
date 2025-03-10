import { Outlet } from "react-router";

function Main() {
  return (
    <main className="mt-10 flex-auto flex flex-col">
      <Outlet />
    </main>
  );
}

export default Main;
