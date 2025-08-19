import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
    const imageUrl = product?.images?.[0]?.image || '/images/placeholder.png';

    return (
        <div className="col-sm-12 col-md-6 col-lg-3 my-3">
            <div className="card p-3 rounded">
                <img
                    className="card-img-top mx-auto"
                    src={imageUrl}
                    alt={product?.name || "Product"}
                />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                        <Link to={`/product/${product?._id}`}>{product?.name || "Unnamed Product"}</Link>
                    </h5>
                    <div className="ratings mt-auto">
                        <div className="rating-outer">
                            <div
                                className="rating-inner"
                                style={{ width: `${(product?.ratings || 0) / 5 * 100}%` }}
                            ></div>
                        </div>
                    </div>
                    <p className="card-text">${Number(product?.price).toFixed(2) || "0.00"}</p>

                    <Link to={`/product/${product?._id}`} id="view_btn" className="btn btn-block">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}
