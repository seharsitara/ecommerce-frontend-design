import Header from "@/component/web-main/layoutheader/header";
import Navbar from "@/component/web-main/navbar/Navbar";
import Footer from "@/component/web-main/layoutfooter/footer";
import CategoriesSection from "@/component/web-main/homepage/CategoriesSection";
import BannerSection from "@/component/web-main/homepage/BannerSection";
import RightBoxesSection from "@/component/web-main/homepage/RightBoxesSection";
import DealsSection from "@/component/web-main/homepage/DealsSection";
import HomeOutdoorSection from "@/component/web-main/homepage/HomeOutdoorSection";
import ElectronicsSection from "@/component/web-main/homepage/ElectronicsSection";
import SupplierRequestSection from "@/component/web-main/homepage/SupplierRequestSection";
import RecommendedItemsSection from "@/component/web-main/homepage/RecommendedItemsSection";
import ExtraServicesSection from "@/component/web-main/homepage/ExtraServicesSection";
import SuppliersRegionSection from "@/component/web-main/homepage/SuppliersRegionSection";
import NewsletterSection from "@/component/web-main/homepage/NewsletterSection";
import HomeBoard from "../component/web-main/homeboard/HomeBoard";
import TestDealsData from "../test_deals_data.jsx";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <Navbar></Navbar>
      <main className="">
        {/* Main Content Area */}
        <div className="container  py-6">
          {/* Test Component - Remove after debugging */}
          
          {/* Section 1: Categories, Banner, and Right Boxes */}
          {/*<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">*/}
            <HomeBoard></HomeBoard>
         {/* </div>*/}

          {/* Section 2: Deals and Offers */}
          <DealsSection />

          {/* Section 3: Home and Outdoor */}
          <HomeOutdoorSection />

          {/* Section 4: Consumer Electronics */}
          <ElectronicsSection />

          {/* Section 5: Send Requests to Suppliers */}
          <SupplierRequestSection />

          {/* Section 6: Recommended Items */}
          <RecommendedItemsSection />

          {/* Section 7: Our Extra Services */}
          <ExtraServicesSection />

          {/* Section 8: Suppliers by Region */}
          <SuppliersRegionSection />

          {/* Section 9: Newsletter Subscription */}
         
        </div>
      </main>
       <NewsletterSection />
      <Footer />
    </div>
  );
} 