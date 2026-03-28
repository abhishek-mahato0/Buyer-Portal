import { useEffect, useRef, useState } from "react";
import Banner from "../../components/molecules/Banner";
import PropertyCard from "../../components/organisms/PropertyCard";
import PropertyFilter, {
  type FilterValues,
} from "../../components/organisms/PropertyFilter";
import { useQuery } from "../../hooks/useQuery";
import { useMutation } from "../../hooks/useMutation";
import { getAllProperties, getFavouriteIds, toggleFavourite } from "./api";
import type { TProperty } from "./types";
import { queryClient } from "../../api/queryClient";

const Dashboard = () => {
  const [filters, setFilters] = useState<FilterValues>({
    minPrice: 0,
    maxPrice: 10000000,
    rooms: "",
    city: "",
    country: "",
  });

  const [properties, setProperties] = useState<TProperty[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef(null);
  const [favouriteIds, setFavouriteIds] = useState<string[]>([]);

  // Fetch only user favourite IDs for performance
  useQuery(["favourite-ids"], getFavouriteIds, {
    onSuccess: (ids) => {
      setFavouriteIds(ids);
    },
  });

  const { isLoading } = useQuery(
    ["properties", filters, page],
    () =>
      getAllProperties({
        minPrice: filters.minPrice ?? undefined,
        maxPrice: filters.maxPrice ?? undefined,
        rooms: filters.rooms ? Number(filters.rooms) : undefined,
        city: filters.city || undefined,
        country: filters.country || undefined,
        page,
        limit: 3,
      }),
    {
      onSuccess: (result) => {
        if (page === 1) {
          setProperties(result.properties);
        } else {
          setProperties((prev) => [...prev, ...result.properties]);
        }
        setHasMore(result.properties.length === 3);
      },
    },
  );

  const { mutate: toggleFav } = useMutation(toggleFavourite, {
    onSuccess: (data) => {
      const { propertyId, action } = data.data;
      if (action === "added") {
        setFavouriteIds((prev) => [...prev, propertyId]);
      } else {
        setFavouriteIds((prev) => prev.filter((id) => id !== propertyId));
      }
      queryClient.invalidateQueries(JSON.stringify(["favourites"]));
    },
  });

  useEffect(() => {
    setPage(1);
    setHasMore(true);
  }, [filters]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoading]);

  return (
    <div className="flex flex-col w-[100vw] min-h-[100vh] items-center sm:px-40 px-6 gap-30">
      <div className="w-full h-[70vh] flex items-center justify-center">
        <Banner />
      </div>

      <div className="w-full flex gap-16 items-center justify-center">
        <PropertyFilter
          onFilterChange={(data) => {
            setFilters(data);
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 px-10 lg:max-w-[81vw] md:max-w-[90vw]">
        {properties.map((property: TProperty) => (
          <PropertyCard
            key={property.id}
            property={property}
            isFavourite={favouriteIds.includes(property.id)}
            onToggleFavourite={(isFavourite, id) => toggleFav(id)}
          />
        ))}
        {isLoading && (
          <div className="col-span-full flex justify-center py-4">
            <p className="text-gray-500 animate-pulse">Loading properties...</p>
          </div>
        )}
        {!isLoading && properties.length === 0 && (
          <div className="col-span-full flex justify-center py-10">
            <p className="text-xl text-gray-400">No properties found</p>
          </div>
        )}
      </div>
      <div ref={observerTarget} style={{ height: "20px" }}></div>
    </div>
  );
};

export default Dashboard;
