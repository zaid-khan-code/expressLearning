import express from "express";

const app = express();

app.use(express.json());

let products = [];
let nextId = 1;

app.post("/products", (req, res) => {
    const productBody = req.body;

    const newProduct = {
        id: Date.now().toString(36),
        ...productBody
    };

    products.push(newProduct);

    res.status(201).json({
        message: "Product created successfuly!",
        product: newProduct
    });
});

app.get("/products", (req, res) => {
    res.json({
        message: "Products fetched successfully!",
        products: products
    });
});

app.get("/products/:id", (req, res) => {
    const product = products.find(p => p.id === Number(req.params.id));

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.json({
        message: "Product fetched successfully!",
        product: product
    });
});

app.put("/products/:id", (req, res) => {
    const productId = req.params.id;
    const updates = req.body;

    const productIndex = products.findIndex(p => p.id === productId);

    if (productIndex === -1) {
        return res.status(404).json({ message: "Product not found" });
    }

    products[productIndex] = {
        ...products[productIndex],
        ...updates
    };

    res.json({
        message: "Product updated successfully!",
        product: products[productIndex]
    });
});

app.delete("/products/:id", (req, res) => {
    const productId = req.params.id;
    const productIndex = products.findIndex(p => p.id === productId);

    if (productIndex === -1) {
        return res.status(404).json({ message: "Product not found" });
    }

    const deletedProduct = products.splice(productIndex, 1);

    res.json({
        message: "Product deleted successfully!",
        product: deletedProduct[0]
    });
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
