import Header from "../Header";
import Search from "../Search";
import { FetchVenues } from "../Venues";

function Layout() {
    return (
        <>
            <Header />
            <main>
                <Search />
                <FetchVenues />
            </main>
        </>
    );
}

export default Layout;