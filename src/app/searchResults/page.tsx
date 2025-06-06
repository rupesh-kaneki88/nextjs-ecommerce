"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { searchProduct } from "../lib/productfetchingAPI";
import Productcard from "../components/Productcard";
import { Product } from "../lib/types";

// SearchProductsPage component
const SearchProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useSearchParams();
  const query = router.get("q");

  useEffect(() => {
    const fetchProducts = async () => {
      if (query) {
        try {
          const res = await searchProduct(query);
          setProducts(res || []);
          console.log(res);
        } catch (error) {
          console.log("error", error);
        }
      }
    };
    fetchProducts();
  }, [query]);

  return (
    <div className="  ">
      {products.length > 0 ? (
        <div className="mt-5 ml-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="transform transition duration-300 hover:scale-105"
            >
              <Productcard product={p} />
            </div>
          ))}
        </div>
      ) : (
        <div className=" flex items-center justify-center h-50 text-lg text-gray-500">
          Product not found
        </div>
      )}
    </div>
  );
};

// Dynamically import with no SSR
const DynamicSearchProductsPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <SearchProductsPage />
  </Suspense>
);

export default DynamicSearchProductsPage;
