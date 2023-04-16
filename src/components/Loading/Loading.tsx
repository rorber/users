import { FC } from "react";

export const Loading: FC = () => {
  return <div className="animate-spin border-8 border-t-red border-transparent border-solid h-20 rounded-[50%] w-20" data-testid="loading"></div>;
};
