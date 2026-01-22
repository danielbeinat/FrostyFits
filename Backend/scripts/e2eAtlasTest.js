import fetch from "node-fetch";

const base = "http://localhost:5000";

const json = (obj) => JSON.stringify(obj);

const run = async () => {
  try {
    const email = `atlas.tester.${Date.now()}@example.com`;
    const password = "Password123";
    const signupRes = await fetch(`${base}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: json({ name: "Atlas Tester", email, password }),
    });
    const signup = await signupRes.json();
    if (!signup.success) throw new Error("Signup failed");
    const loginRes = await fetch(`${base}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: json({ email, password }),
    });
    const login = await loginRes.json();
    if (!login.success || !login.token) throw new Error("Login failed");
    const token = login.token;
    const productRes = await fetch(`${base}/api/products/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: json({
        name: "Test Atlas Product",
        image: "https://example.com/image.jpg",
        category: "men",
        price: 99.99,
        type: "Gorro",
        sizes: [],
        stock: 10,
        discount: 0,
        aviable: true,
      }),
    });
    const product = await productRes.json();
    if (!product.success || !product.product?._id)
      throw new Error("Add product failed");
    const productId = product.product._id;
    const addCartRes = await fetch(`${base}/api/users/addtocart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: json({ itemId: productId, quantity: 2 }),
    });
    const addCart = await addCartRes.json();
    const cartRes = await fetch(`${base}/api/users/getCart`, {
      headers: { "auth-token": token },
    });
    const cart = await cartRes.json();
    const healthRes = await fetch(`${base}/health/db`);
    const health = await healthRes.json();
    console.log(
      JSON.stringify(
        {
          email,
          productId,
          addCart,
          cart,
          health,
        },
        null,
        2,
      ),
    );
    process.exit(0);
  } catch (e) {
    console.error("E2E error:", e.message);
    process.exit(1);
  }
};

run();
