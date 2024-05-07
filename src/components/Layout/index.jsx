import Header from "../Header";
import Search from "../Search";
import Home from "../Venues";

function Layout() {
    return (
        <>
            <Header />
            <main>
                <Search />
                <Home />
            </main>
        </>
    );
}

export default Layout;