import { dbConnect } from "@/lib/mongoose";
import { Cart } from "@/models/cart";
import { Course } from "@/models/course";
import { Product } from "@/models/product";
import { User } from "@/models/user";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();
  // await isAdminRequest(req,res)

  if (method === "GET") {
    if (req.query?.id) {
      const cart = await Cart.find({ userId: req.query?.id });
      if (cart.length == 0) {
        return res.status(200).send({
          error: false,
          cart: null,
          message: "Cart not found",
        });
      }
      let courses = [];
      let products = [];
      if (cart) {
        if (cart[0].courseList) {
          await Promise.all(
            cart[0].courseList.map(async (item) => {
              const course = await Course.findOne({ _id: item._id });
              const courseData = {
                _id: item._id,
                title: course.title,
                details: course.details,
                thumbnail: course.thumbnail,
                duration: course.duration,
                instructor: course.instructor,
                video: course.video,
                price: item.price,
                quantity: item.quantity,
              };
              courses.push(courseData);
            })
          );
          cart[0].courseList = courses;
        }
        if (cart[0].productList) {
          await Promise.all(
            cart[0].productList.map(async (item) => {
              const product = await Product.findOne({ _id: item._id });
              const productData = {
                _id: item._id,
                title: product.title,
                description: product.description,
                image: product.image,
                price: item.price,
                quantity: item.quantity,
              };
              products.push(productData);
            })
          );
          cart[0].productList = products;
        }
      }
      return res.status(200).send({
        error: false,
        cart: cart,
        message: "Product send",
      });
    } else {
      return res.status(400).send({
        error: false,
        cart: null,
        message: "Cart not found",
      });
    }
  }
  if (method == "PUT") {
    const { userId, courseId, productId, quantity } = req.body;
    // const user = await User.findOne({ _id: userId });
    // isAdminRequest(user.email, res);
    const userCart = await Cart.findOne({ userId });
    if (userCart) {
      if (courseId) {
        const course = await Course.findById({ _id: courseId });
        const productList = [{ _id: courseId, price: course.price, quantity }];
        const existProduct = userCart.courseList.find(
          (item) => item._id === courseId
        );
        if (existProduct) {
          return res
            .status(400)
            .send({ error: true, message: "Already exist" });
        }

        let totalPrice = userCart.totalPrice + course.price * quantity;
        let totalQuantity = userCart.totalQuantity + quantity;
        const cartDoc = await Cart.updateOne(
          { userId },
          {
            courseList: [
              {
                _id: courseId,
                price: course.price * quantity,
                quantity,
              },
              ...userCart.courseList,
            ],
            productList: [...userCart.productList],
            totalQuantity,
            totalPrice,
          }
        );
      } else if (productId) {
        const product = await Product.findById({ _id: productId });
        const productList = [
          { _id: productId, price: product.price, quantity },
        ];

        const existProduct = userCart.productList.find(
          (item) => item._id === productId
        );
        const restProduct = userCart.productList.filter(
          (item) => item._id !== productId
        );

        if (existProduct) {
          let totalPrice = 0;
          let totalQuantity = 0;
          let tempProductList;

          const updatedPrice = product.price * quantity;
          existProduct.price += updatedPrice;
          existProduct.quantity += quantity;
          if (existProduct.quantity === 0) {
            tempProductList = [...restProduct];
          } else {
            tempProductList = [existProduct, ...restProduct];
          }
          tempProductList.map((item) => {
            totalPrice += item.price;
            totalQuantity += item.quantity;
          });
          if (userCart.courseList) {
            userCart.courseList.map((item) => {
              totalPrice += item.price;
              totalQuantity += item.quantity;
            });
          }
          const cartDoc = await Cart.updateOne(
            { userId },
            {
              productList: tempProductList,
              totalQuantity,
              totalPrice,
            }
          );

          // const cart = await Cart.find({ userId: userId });
          // let products = [];
          // if (cart) {
          //   await Promise.all(
          //     cart[0].productList.map(async (item) => {
          //       const product = await Product.findOne({ _id: item._id });
          //       const productData = {
          //         _id: item._id,
          //         title: product.title,
          //         description: product.description,
          //         category: product.category,
          //         properties: product.properties,
          //         url: product.url,
          //         shopId: product.shopId,
          //         itemTotal: item.price,
          //         quantity: item.quantity,
          //         quantity: product.quantity,
          //       };
          //       products.push(productData);
          //     })
          //   );
          //   cart[0].productList = products.reverse();
          // }
          // return res.status(200).send({
          //   error: false,
          //   cart: cart,
          //   message: "Added to cart",
          // });
        } else {
          let totalPrice = userCart.totalPrice + product.price * quantity;
          let totalQuantity = userCart.totalQuantity + quantity;
          const cartDoc = await Cart.updateOne(
            { userId },
            {
              productList: [
                {
                  _id: productId,
                  price: product.price * quantity,
                  quantity,
                },
                ...userCart.productList,
              ],
              courseList: [...userCart.courseList],
              totalQuantity,
              totalPrice,
            }
          );
        }
      }

      const cart = await Cart.find({ userId: userId });
      let courses = [];
      let products = [];
      if (cart) {
        if (cart[0].courseList) {
          await Promise.all(
            cart[0].courseList.map(async (item) => {
              const course = await Course.findOne({ _id: item._id });
              const courseData = {
                _id: item._id,
                title: course.title,
                details: course.details,
                thumbnail: course.thumbnail,
                duration: course.duration,
                instructor: course.instructor,
                video: course.video,
                price: item.price,
                quantity: item.quantity,
              };
              courses.push(courseData);
            })
          );
          cart[0].courseList = courses;
        }
        if (cart[0].productList) {
          await Promise.all(
            cart[0].productList.map(async (item) => {
              const product = await Product.findOne({ _id: item._id });
              const productData = {
                _id: item._id,
                title: product.title,
                description: product.description,
                image: product.image,
                price: item.price,
                quantity: item.quantity,
              };
              products.push(productData);
            })
          );
          cart[0].productList = products;
        }
      }
      return res.status(200).send({
        error: false,
        cart: cart,
        message: "Added to cart",
      });

      // --------------------------------------------------------

      // const course=await
      // const product = await Product.findById({ _id: productId });
      // const existProduct = userCart.productList.find(
      //   (item) => item._id === productId
      // );
      // const restProduct = userCart.productList.filter(
      //   (item) => item._id !== productId
      // );
      // if (existProduct) {
      //   let totalPrice = 0;
      //   let totalQuantity = 0;
      //   let tempProductList;
      //   const updatedPrice = product.price * quantity;
      //   existProduct.price += updatedPrice;
      //   existProduct.quantity += quantity;
      //   if (existProduct.quantity === 0) {
      //     tempProductList = [...restProduct];
      //   } else {
      //     tempProductList = [existProduct, ...restProduct];
      //   }
      //   tempProductList.map((item) => {
      //     totalPrice += item.price;
      //     totalQuantity += item.quantity;
      //   });
      //   const cartDoc = await Cart.updateOne(
      //     { userId },
      //     {
      //       productList: tempProductList,
      //       totalQuantity,
      //       totalPrice,
      //     }
      //   );
      //   const cart = await Cart.find({ userId: userId });
      //   let courses = [];
      //   if (cart) {
      //     await Promise.all(
      //       cart[0].productList.map(async (item) => {
      //         const product = await Product.findOne({ _id: item._id });
      //         const productData = {
      //           _id: item._id,
      //           title: product.title,
      //           description: product.description,
      //           category: product.category,
      //           properties: product.properties,
      //           url: product.url,
      //           shopId: product.shopId,
      //           itemTotal: item.price,
      //           quantity: item.quantity,
      //           quantity: product.quantity,
      //         };
      //         courses.push(productData);
      //       })
      //     );
      //     cart[0].productList = courses.reverse();
      //   }
      //   return res.status(200).send({
      //     error: false,
      //     cart: cart,
      //     message: "Added to cart",
      //   });
      // } else {
      //   let totalPrice = userCart.totalPrice + product.price * quantity;
      //   let totalQuantity = userCart.totalQuantity + quantity;
      //   const cartDoc = await Cart.updateOne(
      //     { userId },
      //     {
      //       productList: [
      //         {
      //           _id: productId,
      //           price: product.price * quantity,
      //           quantity,
      //         },
      //         ...userCart.productList,
      //       ],
      //       totalQuantity,
      //       totalPrice,
      //     }
      //   );
      //   const cart = await Cart.find({ userId: userId });
      //   let courses = [];
      //   if (cart) {
      //     await Promise.all(
      //       cart[0].productList.map(async (item) => {
      //         const product = await Product.findOne({ _id: item._id });
      //         const productData = {
      //           _id: item._id,
      //           title: product.title,
      //           description: product.description,
      //           category: product.category,
      //           properties: product.properties,
      //           url: product.url,
      //           shopId: product.shopId,
      //           itemTotal: item.price,
      //           quantity: item.quantity,
      //           quantity: product.quantity,
      //         };
      //         courses.push(productData);
      //       })
      //     );
      //     cart[0].productList = courses.reverse();
      //   }
      //   return res.status(200).send({
      //     error: false,
      //     cart: cart,
      //     message: "Added to cart",
      //   });
      // }
    } else {
      if (courseId) {
        const course = await Course.findById({ _id: courseId });
        const courseList = [{ _id: courseId, price: course.price, quantity }];

        const cartDoc = await Cart.create({
          userId,
          courseList,
          totalQuantity: quantity,
          totalPrice: course.price,
        });
        const cart = await Cart.find({ userId: userId });
        let courses = [];
        // let products = [];
        if (cart) {
          await Promise.all(
            cart[0].courseList.map(async (item) => {
              const course = await Course.findOne({ _id: item._id });
              const courseData = {
                _id: item._id,
                title: course.title,
                details: course.details,
                thumbnail: course.thumbnail,
                duration: course.duration,
                instructor: course.instructor,
                video: course.video,
                price: item.price,
                quantity: item.quantity,
              };
              courses.push(courseData);
            })
            // cart[0].productList.map(async (item) => {
            //   const product = await Product.findOne({ _id: item._id });
            //   const productData = {
            //     _id: item._id,
            //     title: product.title,
            //     description: product.description,
            //     image: product.image,
            //     price: item.price,
            //     quantity: item.quantity,
            //   };
            //   products.push(productData);
            // })
          );
          cart[0].courseList = courses;
          // cart[0].productList = products;
        }
        return res.status(200).send({
          error: false,
          cart: cart,
          message: "Added to cart",
        });
      } else if (productId) {
        const product = await Product.findById({ _id: productId });
        const productList = [
          { _id: productId, price: product.price, quantity },
        ];

        const cartDoc = await Cart.create({
          userId,
          productList,
          totalQuantity: quantity,
          totalPrice: product.price,
        });

        const cart = await Cart.find({ userId: userId });
        // let courses = [];
        let products = [];
        if (cart) {
          await Promise.all(
            // cart[0].courseList.map(async (item) => {
            //   const course = await Course.findOne({ _id: item._id });
            //   const courseData = {
            //     _id: item._id,
            //     title: course.title,
            //     details: course.details,
            //     thumbnail: course.thumbnail,
            //     duration: course.duration,
            //     instructor: course.instructor,
            //     video: course.video,
            //     price: item.price,
            //     quantity: item.quantity,
            //   };
            //   courses.push(courseData);
            // })
            cart[0].productList.map(async (item) => {
              const product = await Product.findOne({ _id: item._id });
              const productData = {
                _id: item._id,
                title: product.title,
                description: product.description,
                image: product.image,
                price: item.price,
                quantity: item.quantity,
              };
              products.push(productData);
            })
          );
          // cart[0].courseList = courses;
          cart[0].productList = products;
        }
        return res.status(200).send({
          error: false,
          cart: cart,
          message: "Added to cart",
        });
      }
    }
  }
  if (method == "DELETE") {
    const { cartId } = req.query;
    if (!cartId) {
      return res.status(400).send({
        error: true,
        data: null,
        message: "Cart id is required",
      });
    }
    const userCart = await Cart.deleteOne({ _id: cartId });
    return res.status(200).send({
      error: false,
      cart: null,
      message: "All product removed",
    });
  }
}
