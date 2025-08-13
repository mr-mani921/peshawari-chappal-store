import React from "react";
import ProductCard from "../components/ProductCard";
import "./CategoryPage.css";
import {
  Anvil,
  Columns3Cog,
  GraduationCap,
  HandPlatter,
  HousePlus,
  Medal,
  ShieldPlus,
  Warehouse,
} from "lucide-react";
import { useProducts } from "./Contexts/Product";

const SignatureCollection = () => {
  const { products } = useProducts();

  return (
    <div className="category-page" style={{ width: "118%", marginLeft: "4%" }}>
      {/* Category Header */}
      <section className="category-header">
        <div className="container">
          <div className="category-hero">
            <div className="category-content">
              <h1 className="category-title">Signature Collection</h1>
              <p className="category-description">
                Discover our most exclusive and refined chappals in the
                Signature Collection. These premium pieces represent the
                pinnacle of our craftsmanship, featuring the finest materials,
                exceptional attention to detail, and designs that embody the
                very best of Pakistani traditional footwear artistry.
              </p>
              <div className="category-stats">
                <div className="stat">
                  <span className="stat-number">{products.length}</span>
                  <span className="stat-label">Exclusive</span>
                </div>
                <div className="stat">
                  <span className="stat-number">Premium</span>
                  <span className="stat-label">Quality</span>
                </div>
                <div className="stat">
                  <span className="stat-number">Master</span>
                  <span className="stat-label">Crafted</span>
                </div>
              </div>
            </div>
            <div className="category-image">
              <img
                src="https://www.peshawarichappals.pk/wp-content/uploads/2024/02/Norozi-Chappal-final-6-JPG-300x300.webp"
                alt="Signature Collection"
                className="featured-product-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="category-features py-5">
        <div className="container">
          <h2 className="section-title text-center mb-4">
            Signature Collection Features
          </h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Anvil />
              </div>
              <h3>Premium Materials</h3>
              <p>
                Only the finest leather and materials are selected for our
                signature pieces.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Columns3Cog />
              </div>
              <h3>Exclusive Designs</h3>
              <p>Unique designs available only in our signature collection.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <GraduationCap />
              </div>
              <h3>Master Artisans</h3>
              <p>Crafted by our most skilled and experienced artisans.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <HousePlus />
              </div>
              <h3>Limited Edition</h3>
              <p>
                Exclusive pieces with limited availability for discerning
                customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="category-products py-5">
        <div className="container">
          <h2 className="section-title text-center mb-4">
            Our Signature Collection
          </h2>
          <div className="products-grid">
            {products
              .filter((product) => product.badge === "SIGNATURE")
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </div>
      </section>

      {/* Exclusivity Section */}

      {/* Care Instructions */}
      <section
        className="care-instructions py-5"
        style={{
          width: "72%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="container">
          <div className="care-content">
            <h2>Premium Care Instructions</h2>
            <div className="care-tips">
              <div className="care-tip">
                <h4>
                  <Medal /> Premium Products
                </h4>
                <p>
                  Use only premium leather care products for signature pieces.
                </p>
              </div>
              <div className="care-tip">
                <h4>
                  <HandPlatter /> Gentle Handling
                </h4>
                <p>
                  Handle with extra care to preserve the premium finish and
                  details.
                </p>
              </div>
              <div className="care-tip">
                <h4>
                  <Warehouse />
                  Museum Storage
                </h4>
                <p>
                  Store in the original packaging or premium storage solutions.
                </p>
              </div>
              <div className="care-tip">
                <h4>
                  <ShieldPlus /> Professional Service
                </h4>
                <p>
                  Consider professional cleaning and maintenance for best
                  results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignatureCollection;
