import styles from "./TopSellers.module.css"

const sellers = [
  {
    id: 1,
    name: "Eleanor Pena",
    image: "/placeholder.svg?height=60&width=60",
    rating: 4.8,
    products: 24,
  },
  {
    id: 2,
    name: "Cameron Williamson",
    image: "/placeholder.svg?height=60&width=60",
    rating: 4.9,
    products: 18,
  },
  {
    id: 3,
    name: "Dianne Russell",
    image: "/placeholder.svg?height=60&width=60",
    rating: 4.7,
    products: 32,
  },
  {
    id: 4,
    name: "Jerome Bell",
    image: "/placeholder.svg?height=60&width=60",
    rating: 4.6,
    products: 15,
  },
]

const TopSellers = () => {
  return (
    <section className={styles.topSellers}>
      <h2 className={styles.title}>Top Seller Users</h2>
      <div className={styles.sellersGrid}>
        {sellers.map((seller) => (
          <div key={seller.id} className={styles.sellerCard}>
            <img src={seller.image || "/placeholder.svg"} alt={seller.name} className={styles.sellerImage} />
            <div className={styles.sellerInfo}>
              <h3 className={styles.sellerName}>{seller.name}</h3>
              <div className={styles.sellerStats}>
                <span className={styles.rating}>★ {seller.rating}</span>
                <span className={styles.products}>{seller.products} Products</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TopSellers
