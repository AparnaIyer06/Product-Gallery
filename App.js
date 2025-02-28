import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductGallery = () => {
  // Initial product list
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Smartphone",
      description: "Latest 5G smartphone with 128GB storage.",
      price: "Rs. 61,100",
      image: "images\Smartphone.jpg",
    },
    {
      id: 2,
      name: "Laptop",
      description: "Powerful laptop with Intel i7 processor.",
      price: "Rs. 87,325",
      image: "images\Laptop.jpg",
    },
    {
      id: 3,
      name: "Headphones",
      description: "Noise-cancelling over-ear headphones.",
      price: "Rs. 17,500",
      image: "images\Headphones.jpg",
    },
  ]);

  // State for handling search input
  const [searchTerm, setSearchTerm] = useState("");
  
  // State for editing product
  const [editingProduct, setEditingProduct] = useState(null);

  // Function to handle adding a new product
  const addProduct = () => {
    const newProduct = {
      id: Date.now(),
      name: "New Product",
      description: "Description here...",
      price: "$0",
      image: "https://via.placeholder.com/150",
    };
    setProducts([...products, newProduct]);
  };

  // Function to handle deleting a product
  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  // Function to handle editing a product
  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  // Function to update the product details
  const handleUpdate = (e) => {
    const { name, value } = e.target;
    setEditingProduct({ ...editingProduct, [name]: value });
  };

  // Function to save the updated product details
  const saveEdit = () => {
    setProducts(
      products.map((product) =>
        product.id === editingProduct.id ? editingProduct : product
      )
    );
    setEditingProduct(null);
  };

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Product Gallery</h2>
      
      {/* Buttons for adding and searching products */}
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-success" onClick={addProduct}>➕ Add Product</button>
        <input
          type="text"
          className="form-control w-50"
          placeholder="🔍 Search by name..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Product Grid */}
      <div className="row">
        {filteredProducts.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card">
              <img
                src={product.image}
                className="card-img-top"
                alt={product.name}
                onClick={() => handleEdit(product)} // Click to edit
                style={{ cursor: "pointer" }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="fw-bold">{product.price}</p>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteProduct(product.id)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Product</h5>
                <button type="button" className="btn-close" onClick={() => setEditingProduct(null)}></button>
              </div>
              <div className="modal-body">
                <label>Product Name:</label>
                <input
                  type="text"
                  className="form-control mb-2"
                  name="name"
                  value={editingProduct.name}
                  onChange={handleUpdate}
                />
                <label>Description:</label>
                <input
                  type="text"
                  className="form-control mb-2"
                  name="description"
                  value={editingProduct.description}
                  onChange={handleUpdate}
                />
                <label>Price:</label>
                <input
                  type="text"
                  className="form-control mb-2"
                  name="price"
                  value={editingProduct.price}
                  onChange={handleUpdate}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setEditingProduct(null)}>Cancel</button>
                <button className="btn btn-primary" onClick={saveEdit}>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
