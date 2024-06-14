import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";


export const metadata = {
    title: "Promptify",
    description: "Discover & share AI prompts"
}


const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <head>
            <link rel="icon" type="image/png" sizes="16x16" href="assets/icons/favicon-16x16.png" />
            </head>
            <body>
                <Provider>
                    <div className="main">
                        <div className="gradient" />
                    </div>

                    <main className="app">
                        <Nav />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    )
}

export default RootLayout;