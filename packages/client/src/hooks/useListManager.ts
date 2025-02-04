import { useState, useCallback } from "react";

export const useListManager = <T extends { id: string }>(
  initialItems: T[],
  onListChange?: (newList: T[]) => void,
) => {
  const [items, setItems] = useState<T[]>(initialItems);

  const moveItem = useCallback(
    (_sourceList: string, targetList: string, itemId: string) => {
      setItems((currentItems) => {
        const updatedItems = currentItems.map((item) => {
          if (item.id === itemId) {
            return { ...item, list: targetList };
          }
          return item;
        });

        onListChange?.(updatedItems);
        return updatedItems;
      });
    },
    [onListChange],
  );

  return { items, setItems, moveItem };
};
