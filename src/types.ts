export type QuantityType = 'x' | 'kg' | 'g' | 'ml' | 'l';

export interface ShoppingItem {
  name: string;
  description: string;
  timestamp: number;
  quantity: number;
  quantityType: QuantityType;
  urgent: boolean;
}

export interface ShoppingList {
  name: string;
  timestamp: number;
}
