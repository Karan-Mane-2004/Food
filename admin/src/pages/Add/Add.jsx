import React, { useState } from "react";
import "./Add.css";
import axios from "axios";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";

function Add({ url }) {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!image) return toast.error("Image is required!");

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);

      if (response.data.success) {
        toast.success(" Food added successfully!");
        setData({ name: "", description: "", price: "", category: "Salad" });
        setImage(null);
      } else {
        toast.error(response.data.message || "Failed!");
      }
    } catch (err) {
      console.log("Frontend Error:", err);
      toast.error("Server error! Check backend logs.");
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-image-upload flex-col">
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="upload"
            />
          </label>
          <input
            type="file"
            id="image"
            hidden
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={data.name}
          onChange={onChangeHandler}
          required
        />

        <textarea
          name="description"
          rows="6"
          placeholder="Description"
          value={data.description}
          onChange={onChangeHandler}
          required
        />

        <select
          name="category"
          value={data.category}
          onChange={onChangeHandler}
        >
          <option value="Salad">Salad</option>
          <option value="Rolls">Rolls</option>
          <option value="Deserts">Deserts</option>
          <option value="Sandwich">Sandwich</option>
          <option value="Cake">Cake</option>
          <option value="Pure Veg">Pure Veg</option>
          <option value="Pasta">Pasta</option>
          <option value="Noodles">Noodles</option>
        </select>

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={data.price}
          onChange={onChangeHandler}
          required
        />

        <button type="submit" className="add-btn">
          Add
        </button>
      </form>
    </div>
  );
}

export default Add;
