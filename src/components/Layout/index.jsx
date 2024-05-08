import { Outlet } from "react-router-dom";
import Header from "../Header";
import Search from "../Search";

function Layout() {
    return (
        <>
            <Header />
            <main>
                <Search />
                <Outlet />
            </main>
        </>
    );
}

export default Layout;