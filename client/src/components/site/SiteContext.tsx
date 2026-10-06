import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "@/data/siteData";

type BagLine = { product: Product; quantity: number };
type BagContextValue = {
  items: BagLine[];
  itemCount: number;
  subtotal: number;
  addItem: (product: Product) => void;
  removeItem: (slug: string) => void;
  clearBag: () => void;
};

const BagContext = createContext<BagContextValue | null>(null);
const STORAGE_KEY = "houzz-studios-bag-v1";

export function BagProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<BagLine[]>([]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setItems(JSON.parse(saved) as BagLine[]);
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Private browsing or storage restrictions do not block the enquiry flow.
    }
  }, [items]);

  const value = useMemo<BagContextValue>(() => ({
    items,
    itemCount: items.reduce((sum, line) => sum + line.quantity, 0),
    subtotal: items.reduce((sum, line) => sum + line.product.price * line.quantity, 0),
    addItem: (product) => setItems((previous) => {
      const existing = previous.find((line) => line.product.slug === product.slug);
      if (existing) return previous.map((line) => line.product.slug === product.slug ? { ...line, quantity: line.quantity + 1 } : line);
      return [...previous, { product, quantity: 1 }];
    }),
    removeItem: (slug) => setItems((previous) => previous.filter((line) => line.product.slug !== slug)),
    clearBag: () => setItems([]),
  }), [items]);

  return <BagContext.Provider value={value}>{children}</BagContext.Provider>;
}

export function useBag() {
  const value = useContext(BagContext);
  if (!value) throw new Error("useBag must be used inside BagProvider");
  return value;
}
