import React from "react";

interface props {
  head: string;
  sub: string;
  id?: string;
}

interface props2 extends props {
  infos: string[];
}

export const AboutInfo = ({ head, sub, id }: props) => {
  return (
    <div id={id} className="flex flex-col gap-1 text-base">
      <div className="font-bold text-secondary">{head}</div>
      <p className="font-light text-accent">{sub}</p>
    </div>
  );
};

export const AboutInfoWithList = ({ head, sub, infos, id }: props2) => {
  return (
    <div id={id} className="flex flex-col gap-1 text-base">
      <div className="font-bold text-secondary">{head}</div>
      <p className="font-light text-accent">{sub}</p>
      <ul className="list-disc">
        {infos.map((val, index) => (
          <li key={index} className="font-light text-accent ml-5">
            {val}
          </li>
        ))}
      </ul>
    </div>
  );
};
