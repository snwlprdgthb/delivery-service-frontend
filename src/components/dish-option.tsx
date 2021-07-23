import React from "react";

interface IDishOptionProps {
  id: number;
  name: string;
  extra: number | null;
  isSelected: boolean;
  addOptionToItem: (dishId: number, optionName: string) => void;
  removeOptionFromItem: (dishId: number, optionName: string) => void;
}

export const DishOption: React.FC<IDishOptionProps> = ({
  isSelected,
  id,
  name,
  extra,
  addOptionToItem,
  removeOptionFromItem
}) => {
  const onClick = () => {
    if (isSelected) {
      removeOptionFromItem(id, name);
    } else {
      addOptionToItem(id, name);
    }
  };

  return (
    <div
      onClick={onClick}
      className={`${
        isSelected ? "border-gray-600" : ""
      } border flex items-center`}
    >
      <h5 className="mr-2">{name}</h5>
      <h6 className="text-sm opacity-70">(${extra})</h6>
    </div>
  );
};
