"use client";

import Header from "../component/layoutheader/header";
import Footer from "../component/layoutfooter/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen  bg-gray-50">
      <Header />
      {/* Other page content */}
      <Footer></Footer>
    </main>
  );
}
