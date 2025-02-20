import { Link } from "react-router-dom";
import "../styles/pageNotFound.css";

export default function PageNotFound() {
    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <h1 className="not-found-title">404</h1>
                <h2 className="not-found-subtitle">Oops! Page Not Found</h2>
                <p className="not-found-text">
                    The page you are looking for does not exist.
                </p>
                <Link to="/" className="not-found-button">Go to Home</Link>
            </div>
        </div>
    );
}
