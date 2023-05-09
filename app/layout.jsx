import "@styles/global.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
    title: "MojoPost - The best place to share your thoughts",
    description: "MojoPost is a social media platform where you can share your thoughts with the world."
}

const RootLayout = ({children}) => {
  return (
    <html lang="en">
        <body>
            <div className="main">
                <div className="gradient"/>
            </div>

            <main className="App">
                <Nav />
            {children}
            </main>
        </body>
    </html>
  )
}

export default RootLayout;