import React, { useState } from "react";
import { AiFillHeart, AiFillEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../app/actions/actionsCart";
import productData from "../js/productData";
import { motion } from "framer-motion";
import shopBanner from "../assets/images/banner/b6.jpeg";
import "../assets/css/product.css";
import Swal from "sweetalert2";

const Product = () => {
  const [filteredShop, setFilteredShop] = useState(productData);
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const cart = useSelector((state) => state.cart);
  const productsPerPage = 15;
  const dispatch = useDispatch();

  const handleFilter = (category) => {
    if (category === "all") {
      setFilteredShop(productData);
      setSearchActive(false);
    } else {
      const filteredProducts = productData.filter(
        (product) => product.cat.toLowerCase() === category.toLowerCase()
      );
      setFilteredShop(filteredProducts);
    }
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchActive(true);
    setCurrentPage(1);
    if (searchQuery && searchQuery.trim() !== "") {
      setSearchResults(
        productData.filter(
          (product) =>
            product.Name &&
            product.Name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setSearchResults([]);
    }
  };

  const handleAddToCart = (product) => {
    const isProductInCart = cart.find((item) => item.id === product.id);
    if (!isProductInCart) {
      dispatch(addToCart(product));
      Swal.fire({
        icon: "success",
        title: "Product added successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Product is already in the cart",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const showMoreProducts = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const openProductPopup = (product) => {
    setSelectedProduct(product);
  };

  const closeProductPopup = () => {
    setSelectedProduct(null);
  };

  const addToFavorites = (product) => {
    if (!favorites.some((item) => item.id === product.id)) {
      setFavorites([...favorites, product]);
    } else {
      setFavorites(favorites.filter((item) => item.id !== product.id));
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  let currentProducts = Array.isArray(filteredShop)
    ? filteredShop.slice(indexOfFirstProduct, indexOfLastProduct)
    : [];

  if (searchActive) {
    currentProducts = searchResults.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );
  }

  const totalProducts = searchActive ? searchResults.length : filteredShop.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  return (
    <>
      <div className="product_banner-container">
        <div className="product-banner-top">
          <motion.h2
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 50, damping: 10 }}
          >
            #PRODUCTS
          </motion.h2>
        </div>
      </div>

      <div className="shop-video-ads r">
        <div className="shop-video">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/d86ws7mQYIg?autoplay=1&loop=1&playlist=d86ws7mQYIg&controls=0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div className="product-main-container">
        <div className="product-category-container">
          <div className="top-sub-navbar">
            <div className="product-category">
              <div className="category-box">
                <ul>
                  <span className="category-title">Categories</span>
                  <li onClick={() => handleFilter("all")}># All</li>
                  <li onClick={() => handleFilter("Graphics Card")}># Graphics Card</li>
                  <li onClick={() => handleFilter("Processor")}># Processor</li>
                  <li onClick={() => handleFilter("Motherboard")}># Motherboard</li>
                  <li onClick={() => handleFilter("Hard Drives")}># Hard Drives</li>
                  <li onClick={() => handleFilter("SSD")}># SSD</li>
                  <li onClick={() => handleFilter("RAM")}># RAM</li>
                  <li onClick={() => handleFilter("Keyboard")}># Keyboard</li>
                  <li onClick={() => handleFilter("Mouse")}># Mouse</li>
                </ul>
              </div>
            </div>
            
            <div className="search-bar-container">
              <form className="form search-form" onSubmit={handleSearch}>
                <label htmlFor="search">
                  <input
                    type="text"
                    id="search"
                    className="input-search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for products..."
                    required
                    autoComplete="off"
                  />
                  <div className="search-icon">
                    <svg strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24" fill="none" className="swap-on">
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinejoin="round" strokeLinecap="round"></path>
                    </svg>
                  </div>
                </label>
              </form>
            </div>
          </div>
        </div>

        {/* Product Grid - Fixed missing map function here */}
        <div className="product-container">
          <div className="product-sub-container">
            {currentProducts.map((curElm) => (
              <div className="box" key={curElm.id}>
                <div className="img-box">
                  <img src={curElm.image} alt={curElm.Name} />
                  <div className="icon">
                    <div className="icon-box product-view" onClick={() => openProductPopup(curElm)}>
                      <AiFillEye />
                    </div>
                    <div className="icon-box product-favorite" onClick={() => addToFavorites(curElm)}>
                      <AiFillHeart color={favorites.some((item) => item.id === curElm.id) ? "red" : "gray"} />
                    </div>
                  </div>
                </div>
                <div className="detail">
                  <h3>{curElm.Name}</h3>
                  <p>PKR {curElm.price}</p>
                  <button className="product-add-to-cart-btn" onClick={() => handleAddToCart(curElm)}>
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {searchActive && !searchResults.length && (
            <div className="not-found">
              <h2>Product Not Found</h2>
            </div>
          )}

          {currentPage < totalPages && (
            <button className="show_more_btn" onClick={showMoreProducts}>
              Show More
            </button>
          )}
        </div>
      </div>

      {selectedProduct && (
        <div className="product-popup">
          <div className="popup-content">
            <span className="close-btn" onClick={closeProductPopup}>&times;</span>
            <img src={selectedProduct.image} alt={selectedProduct.Name} />
            <h2>{selectedProduct.Name}</h2>
            <p>Description: {selectedProduct.description}</p>
            <p>Price: PKR {selectedProduct.price}</p>
            <button className="btn" onClick={() => handleAddToCart(selectedProduct)}>Add to Cart</button>
          </div>
        </div>
      )}

      <div className="buttom-banner">
        <div className="shop-banner">
          <img src={shopBanner} alt="shop banner" />
        </div>
      </div>

      <div className="fav-product-container">
        <div className="fav-sub-product">
          <h2>Favorites</h2>
          <div className="favorites">
            {favorites.map((product) => (
              <div className="product-sub-container" key={product.id}>
                <div className="box">
                  <div className="img-box">
                    <img src={product.image} alt={product.Name} />
                    <div className="icon">
                      <div className="icon-box product-view" onClick={() => openProductPopup(product)}>
                        <AiFillEye />
                      </div>
                    </div>
                  </div>
                  <div className="info">
                    <h3>{product.Name}</h3>
                    <p>PKR {product.price}</p>
                    <button className="home-add-to-cart-btn" onClick={() => handleAddToCart(product)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;