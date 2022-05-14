export type QuantityType = 'x' | 'kg' | 'g' | 'ml' | 'l';

export interface ShoppingItem {
  name: string;
  description: string;
  timestamp: number;
  quantity: number;
  quantityType: QuantityType;
}

export interface ShoppingList {
  name: string;
  items: ShoppingItem[];
}
