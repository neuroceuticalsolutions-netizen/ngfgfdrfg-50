import { useRef } from "react";
import { Link } from "react-router-dom";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart, formatPrice } from "@/context/CartContext";
import { HeroButton } from "@/components/ui/hero-button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { toast } from "sonner";

export const CartDrawer = () => {
  const { isOpen, closeCart, items, subtotal, updateQuantity, removeItem, addItem } = useCart();
  const undoTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  const handleRemove = (item: typeof items[number]) => {
    removeItem(item.slug);
    let undone = false;
    const timer = setTimeout(() => {
      undone = true;
      delete undoTimers.current[item.slug];
    }, 4000);
    undoTimers.current[item.slug] = timer;

    toast(`${item.name} removed`, {
      action: {
        label: "Undo",
        onClick: () => {
          if (!undone) {
            clearTimeout(timer);
            delete undoTimers.current[item.slug];
            addItem(item);
          }
        },
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={(o) => (o ? null : closeCart())}>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col p-0 bg-white">
        <SheetHeader className="px-6 py-4 border-b border-grey-200">
          <SheetTitle className="text-royal-purple text-lg">
            Your Cart {items.length > 0 && <span className="text-grey-500 text-sm">({items.length})</span>}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-12">
            <div className="w-16 h-16 rounded-full bg-grey-100 flex items-center justify-center mb-4">
              <ShoppingBag className="w-8 h-8 text-grey-500" />
            </div>
            <h3 className="heading-sm text-royal-purple mb-2">Your cart is empty</h3>
            <p className="body-md text-grey-600 mb-6">
              Looks like you haven't added any peptide products yet.
            </p>
            <Link to="/peptides/products" onClick={closeCart}>
              <HeroButton variant="hero">Browse Peptides</HeroButton>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.map((item) => (
                <div key={item.slug} className="flex gap-4 pb-4 border-b border-grey-100 last:border-0">
                  <div className="w-20 h-20 rounded-lg bg-grey-100 overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-semibold text-grey-900 text-sm leading-tight">{item.name}</h4>
                      <button
                        type="button"
                        onClick={() => removeItem(item.slug)}
                        aria-label={`Remove ${item.name}`}
                        className="text-grey-500 hover:text-royal-purple transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-grey-500 mt-1">{formatPrice(item.price)} each</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-grey-300 rounded-full">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="w-7 h-7 flex items-center justify-center text-grey-700 hover:text-royal-purple"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                          aria-label="Increase quantity"
                          className="w-7 h-7 flex items-center justify-center text-grey-700 hover:text-royal-purple"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-royal-purple font-bold text-sm">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <SheetFooter className="px-6 py-4 border-t border-grey-200 bg-grey-50 flex-col gap-3 sm:flex-col sm:space-x-0">
              <div className="flex items-center justify-between w-full">
                <span className="text-grey-700 font-medium">Subtotal</span>
                <span className="text-royal-purple font-bold text-lg">{formatPrice(subtotal)}</span>
              </div>
              <p className="text-xs text-grey-500 w-full">Shipping calculated at checkout.</p>
              <Link to="/checkout" onClick={closeCart} className="w-full">
                <HeroButton variant="hero" className="w-full">Proceed to Checkout</HeroButton>
              </Link>
              <HeroButton variant="outline" className="w-full" onClick={closeCart}>
                Continue Shopping
              </HeroButton>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};