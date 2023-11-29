import Image from "next/image";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import OverviewSlider from "@/components/course/OverviewSlider";
import Product from "@/pages/webstore/Product";
const products = [
  {
    id: 1,
    title: "premium pen",
    price: "500",
    productCode: "pen23",
    image: "/images/storeimage/pen.jpg",
  },
  {
    id: 2,
    title: "Notebook",
    price: "430",
    productCode: "nb123",
    image: "/images/storeimage/notebook.jpg",
  },
  {
    id: 3,
    title: "Calculator",
    price: "1280",
    productCode: "cal123",
    image: "/images/storeimage/calculator.jpg",
  },
  {
    id: 4,
    title: "File",
    price: "280",
    productCode: "file123",
    image: "/images/storeimage/file.jpg",
  },
  {
    id: 5,
    title: "Geometry Box",
    price: "580",
    productCode: "gbox123",
    image: "/images/storeimage/box.jpg",
  },
  {
    id: 6,
    title: "School Bag",
    price: "1530",
    productCode: "nag123",
    image: "/images/storeimage/bag.jpg",
  },
  {
    id: 7,
    title: "Pin machine",
    price: "250",
    productCode: "pm123",
    image: "/images/storeimage/pin machine.jpg",
  },
  {
    id: 8,
    title: "Laptop",
    price: "30,000",
    productCode: "lap123",
    image: "/images/storeimage/laptop.jpg",
  },
  {
    id: 9,
    title: "Keyboard with Mouse",
    price: "780",
    productCode: "km123",
    image: "/images/storeimage/keymouse.jpg",
  },
  {
    id: 10,
    title: "pencil",
    price: "180",
    productCode: "penc123",
    image: "/images/storeimage/pencil.jpg",
  },
];
export default function Home() {
  const router = useRouter();
  return (
    <main>
      <OverviewSlider></OverviewSlider>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-gray-200">
        {products.map((product) => {
          return (
            <div key={product.id}>
              <Product product={product} />
            </div>
          );
        })}
      </div>
    </main>
  );
}
