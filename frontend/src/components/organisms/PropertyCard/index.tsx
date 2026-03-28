import React from "react";
import propertyImg from "../../../assets/images/property1.png";
import type { TProperty } from "../../../pages/Dashboard/types";

interface PropertyCardProps {
  property: TProperty;
  isFavourite?: boolean;
  onToggleFavourite?: (isFavourite: boolean | undefined, id: string) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isFavourite,
  onToggleFavourite,
}) => {
  return (
    <div className="property-card">
      <div className="card-image-container">
        <img
          src={propertyImg}
          alt={property.title}
          className="property-image"
        />
        <button
          className={`fav-button ${isFavourite ? "active" : ""}`}
          onClick={() => onToggleFavourite?.(isFavourite, property.id)}
        >
          {isFavourite ? "❤️" : "🤍"}
        </button>
      </div>
      <div className="card-content">
        <h3 className="property-title">{property.title}</h3>
        <p className="property-location">
          {property.location}, {property.country}
        </p>
        <p className="property-info">
          <span>Price: ${property.price.toLocaleString()}</span>
          <span>Rooms: {property.rooms}</span>
        </p>
        <p className="property-description line-clamp-2">
          {property.description}
        </p>
      </div>
    </div>
  );
};

export default PropertyCard;
