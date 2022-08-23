import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Loader from '../Loader'

export default function Layout() {
  return (
    <>
      <div>
        <Suspense fallback={<Loader/>}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
}