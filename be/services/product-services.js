import { pool } from "../config/mySql-config.js";

export async function search(keyword) {
    const [rows] = await pool.query(`select * from products where title LIKE '%${keyword}'`)

    await Promise.all(
        rows.map(async (row) => {

            const descriptions = await getDescriptions(row.id);
            row.description = descriptions.map((d) => d.description)


            const reviews = await getReviews(row.id);
            row.review = reviews;


            const Size = await getSize(row.id);
            row.sizes = Size;


            const colors = await getColors(row.id);
            row.color = colors;

        })
    )

    return rows;
}


export async function getDescriptions(productId) {
    const [rows] = await pool.query(
        `select * from product_description where product_id = ?`, [productId]
    )
    return rows;
}

export async function getReviews(productId) {
    const [rows] = await pool.query(
        `select * from product_reviews where product_id = ?`, [productId]
    )
    return rows;
}
export async function getSize(productId) {
    const [rows] = await pool.query(
        `select s.size from product_size ps LEFT JOIN size s ON s.id = ps.size_id where product_id = ?`, [productId]
    )
    return rows;
}
export async function getColors(productId) {
    const [rows] = await pool.query(
        `select c.color from product_colors pc LEFT JOIN colors c ON c.id = pc.color_id where product_id = ?`, [productId]
    )
    return rows;
}

export async function getImages(productId) {
    const [rows] = await pool.query(
        `select original, thumbnail from product_images where product_id = ?`, [productId]
    )
    return rows;
}


export async function getAllProducts() {
    const [rows] = await pool.query(`select * from products`)

    await Promise.all(
        rows.map(async (row) => {

            const descriptions = await getDescriptions(row.id);
            row.description = descriptions.map((d) => d.description)


            const reviews = await getReviews(row.id);
            row.review = reviews;

            const images = await getImages(row.id)
            row.imgUrl = images;

            const Size = await getSize(row.id);
            row.sizes = Size.map((c) => c.size);


            const colors = await getColors(row.id);
            row.color = colors.map((c) => c.color);
        })
    )

    return rows;
}