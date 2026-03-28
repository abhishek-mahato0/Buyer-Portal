import React from "react";
import Dropdown from "../../atoms/Dropdown";
import Button from "../../atoms/Button";
import { useQuery } from "../../../hooks/useQuery";
import { getMetadata } from "../../../pages/Dashboard/api";

export interface FilterValues {
  country: string | null;
  city: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  rooms: string | null;
}

interface Props {
  onFilterChange: (filters: FilterValues) => void;
}

const PropertyFilter: React.FC<Props> = ({ onFilterChange }) => {
  const { data: metadata } = useQuery(["metadata"], getMetadata);

  const [filters, setFilters] = React.useState<FilterValues>({
    country: "",
    city: "",
    minPrice: 0,
    maxPrice: 10000000,
    rooms: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "priceRange") {
      const range = metadata?.priceRanges?.find((r: any) => r.label === value);
      if (range) {
        setFilters((prev) => ({
          ...prev,
          minPrice: range.min,
          maxPrice: range.max,
        }));
      } else {
        setFilters((prev) => ({
          ...prev,
          minPrice: 0,
          maxPrice: 10000000,
        }));
      }
      return;
    }

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApply = () => {
    onFilterChange(filters);
  };

  const countryOptions = [
    { label: "All Countries", value: "" },
    ...(metadata?.countries?.map((c: string) => ({ label: c, value: c })) ||
      []),
  ];

  const cityOptions = [
    { label: "All Cities", value: "" },
    ...(metadata?.locations?.map((l: string) => ({ label: l, value: l })) ||
      []),
  ];

  const roomOptions = [
    { label: "Any Rooms", value: "" },
    { label: "1+ Room", value: "1" },
    { label: "2+ Rooms", value: "2" },
    { label: "3+ Rooms", value: "3" },
    { label: "4+ Rooms", value: "4" },
  ];

  const priceRangeOptions = [
    { label: "Any Price", value: "" },
    ...(metadata?.priceRanges?.map((r: any) => ({
      label: r.label,
      value: r.label,
    })) || []),
  ];

  const dropDowns = [
    {
      id: 1,
      name: "country",
      label: "Country",
      options: countryOptions,
      value: filters.country,
      onChange: handleChange,
    },
    {
      id: 2,
      name: "city",
      label: "City",
      options: cityOptions,
      value: filters.city,
      onChange: handleChange,
    },
    {
      id: 3,
      name: "rooms",
      label: "Rooms",
      options: roomOptions,
      value: filters.rooms,
      onChange: handleChange,
    },
    {
      id: 4,
      name: "priceRange",
      label: "Price Range",
      options: priceRangeOptions,
      value:
        metadata?.priceRanges?.find(
          (r: any) => r.min === filters.minPrice && r.max === filters.maxPrice,
        )?.label || "",
      onChange: handleChange,
    },
  ];

  return (
    <div className="p-4 bg-white rounded-xl shadow-md flex gap-8 max-w-[85vw] items-center justify-center mb-16">
      <div className="grid lg:grid-cols-6 md:grid-cols-5 grid-cols-1 gap-12 items-center justify-between w-[90%]">
        {dropDowns.map((dropDown) => (
          <Dropdown
            key={dropDown.id}
            name={dropDown.name}
            label={dropDown.label}
            options={dropDown.options}
            value={dropDown.value}
            onChange={dropDown.onChange}
          />
        ))}
        <Button
          onClick={handleApply}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          text="Apply Filters"
        />
      </div>
    </div>
  );
};

export default PropertyFilter;
