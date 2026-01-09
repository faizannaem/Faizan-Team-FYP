import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { AiFillEye, AiFillHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../app/actions/actionsCart";
import Swal from "sweetalert2";
import b1Image from "../assets/images/banner/b1.jpg";
import b2Image from "../assets/images/banner/b2.jpg";
import b3Image from "../assets/images/banner/b3.jpg";
import b4Image from "../assets/images/banner/b4.jpg";
import b5Image from "../assets/images/banner/b5.jpg";
import imageP1 from "../assets/images/laptopP1.jpg";
import imageP2 from "../assets/images/headP2.jpg";
import imageP3 from "../assets/images/remoteP3.jpg";
import imageP4 from "../assets/images/cardsP4.jpg";
import Homeproduct from "../js/home_product";
import "../assets/css/home.css";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    const fetchProducts = () => {
      const productsPerPage = 15;
      const startIndex = (currentPage - 1) * productsPerPage;
      const endIndex = startIndex + productsPerPage;
      const productsToDisplay =
        searchResults.length > 0 ? searchResults : Homeproduct;
      setDisplayedProducts(productsToDisplay.slice(startIndex, endIndex));
    };
    fetchProducts();
  }, [currentPage, searchResults]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchActive(true);
    setCurrentPage(1);
    if (searchQuery && searchQuery.trim() !== "") {
      setSearchResults(
        Homeproduct.filter(
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
        timer: 2000,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Product is already in the cart",
        showConfirmButton: false,
        timer: 2000,
      });
    }
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

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2500,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const showMoreProducts = () => {
    setCurrentPage(currentPage + 1);
  };

  const filterCategory = (category) => {
    const filteredProducts = Homeproduct.filter(
      (product) => product.type === category
    );
    setDisplayedProducts(filteredProducts);
  };

  const allTrendingProduct = () => {
    setDisplayedProducts(Homeproduct);
  };

  return (
    <>
      <div className="home-banner-top">
        <div className="banner-top">
          <div className="banner-container">
            <Slider {...settings}>
              <div className="product-ads">
                <img src={imageP1} alt="Product 1" />
                <div className="content">
                  <h3>Silver Aluminum</h3>
                  <h2>SSD</h2>
                  <p>30% off at your first order</p>
                  <Link to="/product" className="banner-home-shop-link">
                    Shop Now
                  </Link>
                </div>
              </div>
              <div className="product-ads">
                <img src={imageP2} alt="Product 2" />
                <div className="content">
                  <h3>Silver Aluminum</h3>
                  <h2>Mouses</h2>
                  <p>30% off at your first order</p>
                  <Link to="/product" className="banner-home-shop-link">
                    Shop Now
                  </Link>
                </div>
              </div>
              <div className="product-ads">
                <img src={imageP3} alt="Product 3" />
                <div className="content">
                  <h3>Silver Aluminum</h3>
                  <h2>Processor Core i9</h2>
                  <p>30% off at your first order</p>
                  <Link to="/product" className="banner-home-shop-link">
                    Shop Now
                  </Link>
                </div>
              </div>
              <div className="product-ads">
                <img src={imageP4} alt="Product 4" />
                <div className="content">
                  <h3>Silver Aluminum</h3>
                  <h2>Graphic Cards</h2>
                  <p>30% off at your first order</p>
                  <Link to="/product" className="banner-home-shop-link">
                    Shop Now
                  </Link>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>

      <div className="home-sub-navbar-container">
        <div className="trending-heading">
          <h2 onClick={allTrendingProduct}>Trending Products</h2>
          <div className="status">
            <h3 onClick={() => filterCategory("new")}>New</h3>
            <h3 onClick={() => filterCategory("featured")}>Featured</h3>
            <h3 onClick={() => filterCategory("top")}>Top Selling</h3>
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
                    <svg
                      strokeWidth="2"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="swap-on"
                    >
                      <path
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      ></path>
                    </svg>
                    <svg
                      strokeWidth="2"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="swap-off"
                    >
                      <path
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      ></path>
                    </svg>
                  </div>
                  <button type="button" className="clear-btn">
                    <svg
                      viewBox="0 0 20 20"
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        clipRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </label>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="product-main-container">
        <div className="product-sub-container">
          <div className="products">
            {displayedProducts.length > 0 ? (
              displayedProducts.map((product) => (
                <div className="box" key={product.id}>
                  <div className="img-box">
                    <img src={product.image} alt={product.name} />
                    <div className="icon">
                      <div
                        className="icon-box product-view"
                        onClick={() => openProductPopup(product)}
                      >
                        <AiFillEye />
                      </div>
                      <div
                        className="icon-box product-favorite"
                        onClick={() => addToFavorites(product)}
                      >
                        <AiFillHeart
                          color={
                            favorites.some((item) => item.id === product.id)
                              ? "red"
                              : "gray"
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="info">
                    <h3>{product.Name}</h3>
                    <p>PKR {product.price}</p>
                    <button
                      className="home-add-to-cart-btn"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))
            ) : searchActive && !searchResults.length ? (
              <div className="not-found">
                <h2>Product Not Found</h2>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      {selectedProduct && (
        <div className="product-popup">
          <div className="popup-content">
            <span className="close-btn" onClick={closeProductPopup}>
              &times;
            </span>
            <img src={selectedProduct.image} alt={selectedProduct.Name} />
            <h2>{selectedProduct.Name}</h2>
            <p>Description: {selectedProduct.description}</p>
            <p>Price: PKR {selectedProduct.price}</p>
            <button
              className="btn"
              onClick={() => handleAddToCart(selectedProduct)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
      <div className="show-more-product">
        {currentPage < totalPages && (
          <button onClick={showMoreProducts}>Show More</button>
        )}
      </div>

      <div className="ads-banner-container">
        <div className="ads-banners">
          <div className="ads-banner-container">
            <div className="ads-left_box">
              <div className="ads-box">
                <img src={b1Image} alt="banner" />
              </div>
              <div className="ads-box">
                <img src={b2Image} alt="banner" />
              </div>
            </div>
            <div className="ads-right_box">
              <div className="ads-banner-top">
                <img src={b3Image} alt="" />
                <img src={b4Image} alt="" />
              </div>
              <div className="ads-banner-bottom">
                <img src={b5Image} alt="" />
              </div>
            </div>
          </div>
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
                      <div
                        className="icon-box product-view"
                        onClick={() => openProductPopup(product)}
                      >
                        <AiFillEye />
                      </div>
                      <div
                        className="icon-box product-favorite"
                        onClick={() => addToFavorites(product)}
                      >
                        <AiFillHeart color="red" />
                      </div>
                    </div>
                  </div>
                  <div className="info">
                    <h3>{product.Name}</h3>
                    <p>PKR {product.price}</p>
                    <button
                      className="home-add-to-cart-btn"
                      onClick={() => handleAddToCart(product)}
                    >
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

export default Home;
