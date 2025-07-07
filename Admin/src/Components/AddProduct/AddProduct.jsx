import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';

function AddProduct() {
  const [image, setImage] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: "",
    old_price: "",
    new_price: "",
    category: "",
  });

  const handleChange = (e) => {
    setProductDetails({
      ...productDetails,
      [e.target.name]: e.target.value,
    });
  };

  const imageHandler = (event) => {
    setImage(event.target.files[0]);
  };

  const Add_Product = async () => {
    if (
      !productDetails.name ||
      !productDetails.old_price ||
      !productDetails.new_price ||
      !productDetails.category ||
      !image
    ) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    try {
      // 1. Upload the image
      const formData = new FormData();
      formData.append('product', image);

      const uploadRes = await fetch('http://localhost:4000/upload', {
        method: 'POST',
        body: formData,
      });

      const uploadData = await uploadRes.json();

      if (!uploadData.success) {
        alert("Image upload failed.");
        return;
      }

      // 2. Build the product object
      const product = {
        ...productDetails,
        image: uploadData.image_url,
      };

      console.log("Sending product:", product);

      // 3. Add product to database
      const res = await fetch('http://localhost:4000/addproduct', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ Product Added Successfully!");
        // Reset form
        setProductDetails({
          name: "",
          old_price: "",
          new_price: "",
          category: "",
        });
        setImage(null);
      } else {
        alert("❌ Failed to add product.");
      }
    } catch (error) {
      console.error("Add product error:", error);
      alert("⚠️ Something went wrong. Check backend logs.");
    }
  };

  return (
    <div className='add-product'>
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input
          type="text"
          name="name"
          value={productDetails.name}
          onChange={handleChange}
          placeholder="Type here"
        />
      </div>

      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            type="number"
            name="old_price"
            value={productDetails.old_price}
            onChange={handleChange}
            placeholder="Type here"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            type="number"
            name="new_price"
            value={productDetails.new_price}
            onChange={handleChange}
            placeholder="Type here"
          />
        </div>
      </div>

      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select
          name="category"
          value={productDetails.category}
          onChange={handleChange}
          className="add-product-category"
        >
          <option value="">Select Category</option>
          <option value="Women">Women</option>
          <option value="Men">Men</option>
          <option value="Kids">Kids</option>
        </select>
      </div>

      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            alt="Upload"
          />
        </label>
        <input
          type="file"
          name="image"
          id="file-input"
          hidden
          onChange={imageHandler}
        />
      </div>

      <button className="addproduct-button" onClick={Add_Product}>
        Add Product
      </button>
    </div>
  );
}

export default AddProduct;
