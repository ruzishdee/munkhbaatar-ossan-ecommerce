import axios from 'axios'

async function fetchPopularCategory(url, setPopularCategory) {
    const result = await axios.get(url);
    setPopularCategory(result.data)
}

async function fetchProducts(url, setProductsData) {
    const result = await axios.get(url);
    setProductsData(result.data)
}

async function fetchMenu(url, setMenus) {
    const result = await axios.get(url);
    setMenus(result.data)
}

export { fetchPopularCategory, fetchProducts, fetchMenu };