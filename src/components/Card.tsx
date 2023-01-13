import React from "react";

interface IProps {
  children: React.ReactNode;
  classNames?: string;
}

export const Card = ({ children, classNames }: IProps) => {
  return (
    <div className={`rounded-xl max-w-3xl mx-auto ${classNames}`}>
      {children}
    </div>
  );
};
