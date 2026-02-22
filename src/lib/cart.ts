/**
 * Product Cart Management with localStorage Persistence
 * 
 * PRODUCTION FEATURES:
 * - Persistent storage across page refreshes
 * - Stock validation (prevent exceeding available inventory)
 * - Type-safe with Zod validation
 * - Analytics-ready event tracking
 * - Handles edge cases (out of stock, price changes)
 */

import { z } from 'zod';

// Cart item schema
const CartItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  price: z.number(), // Store current frontend price (re-validated at backend)
  quantity: z.number().int().positive(),
  stock: z.number(),
  image: z.string(),
});

export type CartItem = z.infer<typeof CartItemSchema>;

// Cart state schema
const CartStateSchema = z.object({
  items: z.array(CartItemSchema),
  lastUpdated: z.number(),
});

export type CartState = z.infer<typeof CartStateSchema>;

const STORAGE_KEY = 'kensmadeit-cart';
const CART_EXPIRY = 30 * 24 * 60 * 60 * 1000; // 30 days

/**
 * Cart management class - Encapsulates all cart logic
 * Use this in a context provider for React app
 */
export class CartManager {
  private storageKey: string;

  constructor(storageKey: string = STORAGE_KEY) {
    this.storageKey = storageKey;
  }

  /**
   * Get all cart items
   */
  getItems(): CartItem[] {
    try {
      const data = localStorage.getItem(this.storageKey);
      if (!data) return [];

      const parsed = JSON.parse(data);
      const validated = CartStateSchema.parse(parsed);

      // Check if cart expired
      if (Date.now() - validated.lastUpdated > CART_EXPIRY) {
        this.clear();
        return [];
      }

      return validated.items;
    } catch (error) {
      console.error('Failed to load cart:', error);
      return [];
    }
  }

  /**
   * Add item to cart
   * @param item - Product to add
   * @param quantity - How many to add (default 1)
   * @returns Success status and message
   */
  addItem(item: CartItem, quantity: number = 1): { success: boolean; message: string } {
    try {
      // Validate item
      CartItemSchema.parse(item);

      if (quantity <= 0) {
        return { success: false, message: 'Quantity must be at least 1' };
      }

      // Check stock
      if (quantity > item.stock) {
        return {
          success: false,
          message: `Only ${item.stock} item(s) in stock`,
        };
      }

      const items = this.getItems();
      const existingItem = items.find((i) => i.id === item.id);

      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > existingItem.stock) {
          return {
            success: false,
            message: `Cannot add ${quantity} more. Only ${existingItem.stock - existingItem.quantity} available`,
          };
        }
        existingItem.quantity = newQuantity;
      } else {
        items.push({ ...item, quantity });
      }

      this.saveCart(items);

      // Track event for analytics
      this.trackEvent('cart_add_item', {
        product_id: item.id,
        quantity,
        price: item.price,
      });

      return { success: true, message: 'Item added to cart' };
    } catch (error) {
      console.error('Add item error:', error);
      return { success: false, message: 'Failed to add item' };
    }
  }

  /**
   * Remove item from cart
   */
  removeItem(itemId: string): boolean {
    try {
      const items = this.getItems().filter((i) => i.id !== itemId);
      this.saveCart(items);

      this.trackEvent('cart_remove_item', { product_id: itemId });

      return true;
    } catch (error) {
      console.error('Remove item error:', error);
      return false;
    }
  }

  /**
   * Update item quantity
   * @param itemId - Product ID
   * @param quantity - New quantity (0 = remove)
   */
  updateQuantity(itemId: string, quantity: number): { success: boolean; message: string } {
    try {
      const items = this.getItems();
      const item = items.find((i) => i.id === itemId);

      if (!item) {
        return { success: false, message: 'Item not found' };
      }

      if (quantity === 0) {
        this.removeItem(itemId);
        return { success: true, message: 'Item removed' };
      }

      if (quantity < 0) {
        return { success: false, message: 'Quantity cannot be negative' };
      }

      if (quantity > item.stock) {
        return {
          success: false,
          message: `Only ${item.stock} item(s) available`,
        };
      }

      item.quantity = quantity;
      this.saveCart(items);

      this.trackEvent('cart_update_quantity', {
        product_id: itemId,
        quantity,
      });

      return { success: true, message: 'Quantity updated' };
    } catch (error) {
      console.error('Update quantity error:', error);
      return { success: false, message: 'Failed to update quantity' };
    }
  }

  /**
   * Get cart summary
   */
  getSummary(): {
    itemCount: number;
    uniqueItems: number;
    subtotal: number;
    tax: number;
    total: number;
  } {
    const items = this.getItems();

    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = Math.round(subtotal * 0.1); // 10% tax
    const total = subtotal + tax;

    return {
      itemCount,
      uniqueItems: items.length,
      subtotal,
      tax,
      total,
    };
  }

  /**
   * Clear entire cart
   */
  clear(): void {
    try {
      localStorage.removeItem(this.storageKey);
      this.trackEvent('cart_cleared');
    } catch (error) {
      console.error('Clear cart error:', error);
    }
  }

  /**
   * Private: Save cart to localStorage
   */
  private saveCart(items: CartItem[]): void {
    try {
      const state: CartState = {
        items,
        lastUpdated: Date.now(),
      };
      localStorage.setItem(this.storageKey, JSON.stringify(state));
    } catch (error) {
      console.error('Save cart error:', error);
      // localStorage is full or disabled - gracefully degrade
      // In production, could sync to server
    }
  }

  /**
   * Private: Track analytics events
   */
  private trackEvent(event: string, data?: Record<string, unknown>): void {
    try {
      // Send to analytics service (GTM, Mixpanel, etc.)
      if (typeof window !== 'undefined' && (window as Record<string, unknown>).gtag) {
        (window as Record<string, unknown>).gtag('event', event, data);
      }
    } catch (error) {
      // Silently fail - analytics shouldn't break app
      console.warn('Analytics tracking failed:', error);
    }
  }
}

/**
 * Export singleton instance for use in app
 */
export const cartManager = new CartManager();

/**
 * React Hook for cart management
 * Usage in component:
 * const { items, addItem, removeItem, updateQuantity, summary } = useCart();
 */
export function useCart() {
  const [items, setItems] = React.useState<CartItem[]>([]);

  const loadCart = React.useCallback(() => {
    setItems(cartManager.getItems());
  }, []);

  React.useEffect(() => {
    loadCart();
    // Listen for storage changes (tab sync)
    window.addEventListener('storage', loadCart);
    return () => window.removeEventListener('storage', loadCart);
  }, [loadCart]);

  const addItem = (item: CartItem, quantity?: number) => {
    const result = cartManager.addItem(item, quantity);
    if (result.success) {
      loadCart();
    }
    return result;
  };

  const removeItem = (itemId: string) => {
    cartManager.removeItem(itemId);
    loadCart();
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    const result = cartManager.updateQuantity(itemId, quantity);
    if (result.success) {
      loadCart();
    }
    return result;
  };

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    summary: cartManager.getSummary(),
    clear: () => {
      cartManager.clear();
      loadCart();
    },
  };
}

/**
 * PRODUCTION CONSIDERATIONS:
 * 
 * 1. PERSISTENCE:
 *    - localStorage persists across browser sessions
 *    - 30-day expiry prevents stale carts
 *    - Handles quota exceeded gracefully
 * 
 * 2. STOCK VALIDATION:
 *    - Frontend checks stock before adding/updating
 *    - ALWAYS re-validate on backend before checkout
 *    - Prices fetched fresh from database at checkout
 * 
 * 3. MULTI-TAB SYNC:
 *    - Storage events fired when localStorage changes in other tabs
 *    - Cart updates sync across all tabs
 *    - User sees consistent state everywhere
 * 
 * 4. ERROR HANDLING:
 *    - Graceful degradation if localStorage unavailable
 *    - Can fallback to in-memory cart + server sync
 * 
 * 5. ANALYTICS:
 *    - All cart events tracked for business intelligence
 *    - Funnel analysis: add → checkout → purchase
 *    - Cart abandonment tracking
 * 
 * 6. SECURITY:
 *    - localStorage is NOT secure (accessible via XSS)
 *    - Never store sensitive data (passwords, payment info)
 *    - Always re-validate all data on backend
 *    - Cart is just convenience for UX
 */

import React from 'react';
