import OverviewSlider from "@/components/course/OverviewSlider";
import Product from "@/pages/webstore/Product";
import Layout from "@/components/layout/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slice/userSlice/userSlice";
// const products = [
//   {
//     id: 1,
//     title: "premium pen",
//     price: "500",
//     productCode: "pen23",
//     image: "/images/storeimage/pen.jpg",
//   },
//   {
//     id: 2,
//     title: "Notebook",
//     price: "430",
//     productCode: "nb123",
//     image: "/images/storeimage/notebook.jpg",
//   },
//   {
//     id: 3,
//     title: "Calculator",
//     price: "1280",
//     productCode: "cal123",
//     image: "/images/storeimage/calculator.jpg",
//   },
//   {
//     id: 4,
//     title: "File",
//     price: "280",
//     productCode: "file123",
//     image: "/images/storeimage/file.jpg",
//   },
//   {
//     id: 5,
//     title: "Geometry Box",
//     price: "580",
//     productCode: "gbox123",
//     image: "/images/storeimage/box.jpg",
//   },
//   {
//     id: 6,
//     title: "School Bag",
//     price: "1530",
//     productCode: "nag123",
//     image: "/images/storeimage/bag.jpg",
//   },
//   {
//     id: 7,
//     title: "Pin machine",
//     price: "250",
//     productCode: "pm123",
//     image: "/images/storeimage/pin machine.jpg",
//   },
//   {
//     id: 8,
//     title: "Laptop",
//     price: "30,000",
//     productCode: "lap123",
//     image: "/images/storeimage/laptop.jpg",
//   },
//   {
//     id: 9,
//     title: "Keyboard with Mouse",
//     price: "780",
//     productCode: "km123",
//     image: "/images/storeimage/keymouse.jpg",
//   },
//   {
//     id: 10,
//     title: "pencil",
//     price: "180",
//     productCode: "penc123",
//     image: "/images/storeimage/pencil.jpg",
//   },
// ];
export default function WebStore() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const user = localStorage.getItem("user");
    dispatch(setUser(JSON.parse(user)));
  }, []);
  useEffect(() => {
    axios.get("/api/user/product").then((res) => {
      setAllProducts(res.data.products);
      setProducts(res.data.products);
    });
  }, []);

  const handleSearch = (e) => {
    const search = e.target.value.trim();
    if (search == "") {
      setProducts(allProducts);
    } else {
      const filtered = products.filter((product) => {
        const title = product.title.toLowerCase();
        if (title.includes(search.toLocaleLowerCase())) {
          return product;
        }
      });
      setProducts(filtered);
    }
  };

  return (
    <Layout>
      <OverviewSlider></OverviewSlider>
      <div className="w-full flex justify-center my-4">
        <input
          type="text"
          placeholder="Search here"
          onChange={(e) => handleSearch(e)}
          className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4">
        {products.map((product) => {
          return (
            <div key={product.id}>
              <Product product={product} />
            </div>
          );
        })}
      </div>
    </Layout>
  );
}
