"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Loader2 } from "lucide-react";
import Post from "./Post";

interface Item {
  id: number;
  title: string;
}

export default function Feed() {
  const [items, setItems] = useState<Item[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulating an API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newItems: Item[] = Array.from({ length: 10 }, (_, i) => ({
        id: items.length + i + 1,
        title: `Item ${items.length + i + 1}`,
      }));
      setItems((prevItems) => [...prevItems, ...newItems]);
      setHasMore(page < 5); // Limit to 5 pages for this example
    } catch (err) {
      console.error(err);
      setError("Failed to fetch items. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [page]);

  return (
    <div className="container mx-auto p-4">
      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={item.id}
            ref={index === items.length - 1 ? lastItemRef : null}
          >
            <Post title={item.title} />
          </div>
          //   <div
          //     key={item.id}
          //     ref={index === items.length - 1 ? lastItemRef : null}
          //     className="bg-white shadow rounded-lg p-4"
          //   >
          //     <h2 className="text-lg font-semibold">{item.title}</h2>
          //     <p className="text-gray-600">
          //       Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          //     </p>
          //   </div>
        ))}
        {loading && (
          <div
            className="flex justify-center items-center p-4"
            aria-live="polite"
          >
            <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
            <span className="ml-2 text-gray-500">Loading more items...</span>
          </div>
        )}
        {error && (
          <div className="text-red-500 text-center p-4" role="alert">
            {error}
          </div>
        )}
        {!hasMore && (
          <div className="text-gray-500 text-center p-4" aria-live="polite">
            No more items to load
          </div>
        )}
      </div>
    </div>
  );
}
