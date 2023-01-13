import { spawn } from "child_process";
import React from "react";

interface IProps {
  icon: string;
  type: string;
  data: string | number | null;
  description: string;
  width: string;
  meta?: string;
  arrow?: string;
}

export const Row = ({
  icon,
  type,
  data,
  description,
  width,
  meta,
  arrow,
}: IProps) => {
  return (
    <div className="flex justify-between items-center mx-2 px-2 border-b py-2">
      <div className="flex items-center">
        <p className="pr-2">
          <img className={width} src={icon} alt={description} />
        </p>
        <p>{type}</p>
      </div>
      <p>
        {meta && <span className="pr-2">{meta}</span>}
        {arrow && <span className="pr-2">{`${arrow}`}</span>}
        <span> {data}</span>
      </p>
    </div>
  );
};
