import PropertyCard from "../../components/organisms/PropertyCard";
import { useQuery } from "../../hooks/useQuery";
import { useMutation } from "../../hooks/useMutation";
import { getFavourites, toggleFavourite } from "../Dashboard/api";
import type { TProperty } from "../Dashboard/types";
import { queryClient } from "../../api/queryClient";
import { useState } from "react";
import { Link } from "react-router";

const Favourites = () => {
  const [favourite, setFavourite] = useState([]);
  const { data: properties = [], isLoading } = useQuery(
    ["favourites"],
    getFavourites,
    {
      onSuccess: (data) => {
        setFavourite(data);
      },
    },
  );
  const { mutate: toggleFav } = useMutation(toggleFavourite, {
    onSuccess: () => {
      queryClient.invalidateQueries(JSON.stringify(["favourites"]));
      queryClient.invalidateQueries(JSON.stringify(["favourite-ids"]));
    },
  });

  return (
    <div className="flex flex-col w-[100vw] min-h-[100vh] items-center sm:px-40 px-6 gap-30 pt-40">
      <h1 className="text-4xl font-bold text-gray-800 mb-20 self-start">
        My Favourites
      </h1>
      {isLoading && (
        <div className="w-full flex justify-center py-10 mt-30">
          <div className="loader-lg" />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 px-10 lg:max-w-[81vw] md:max-w-[90vw] w-full">
        {favourite.map((property: TProperty) => (
          <PropertyCard
            key={property.id}
            property={property}
            isFavourite={true}
            onToggleFavourite={(isFavourite, id) => {
              if (isFavourite) {
                const updatedIds = favourite.filter(
                  (item: TProperty) => item?.id !== id,
                );
                queryClient.setQueryData(
                  JSON.stringify(["favourite-ids"]),
                  updatedIds,
                );
                setFavourite((prev) =>
                  prev.filter((item: TProperty) => item?.id !== id),
                );
              }
              toggleFav(id);
            }}
          />
        ))}
      </div>
      {!isLoading && properties.length === 0 && (
        <div className="w-full flex flex-col items-center justify-center py-10 gap-4">
          <p className="text-2xl text-gray-400">
            Your favourites list is empty
          </p>
          <p className="text-gray-500">
            Go back to the dashboard to find properties you love!
          </p>
          <Link
            to="/"
            className="text-primary font-semibold hover:text-secondary underline underline-offset-4 decoration-outline-variant hover:decoration-secondary transition-all"
          >
            Back to Dashboard
          </Link>
        </div>
      )}
    </div>
  );
};

export default Favourites;
