"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import rightIcon from "../../../public/svg/rightIcon.svg";

export default function Categories() {
  const categories = [
    "PC ARMADAS",
    "PERIFERICOS",
    "GABINETES",
    "PROCESADORES",
    "PLACAS MADRE",
    "MONITORES",
    "FUENTES DE PODER",
    "PLACAS DE VIDEOS",
    "MEMORIAS RAM",
    "REFRIGERAMIENTOS",
    "SILLAS GAMER",
  ];
  const [animationIcon, setAnimationIcon] = useState<string>("");
  return (
    <div className="relative w-full min-w-[244px] max-w-[244px]">
      <aside className="fixed flex flex-col inset-shadow-xs shadow-xl/30 shadow-[3px_0px_10px_1px_#0000001a] gap-[15px] bg-content py-[10px] px-[15px] w-full max-w-[244px] rounded-[30px]">
        <h3 className="text-[#FD4E4E] font-semibold">CATEGORÍAS</h3>
        <ul className="flex flex-col gap-5">
          {categories.map((category, index) => (
            <Link
              className={`flex items-center transition-all duration-75 ease-in-out delay-75 ${
                animationIcon == category ? "gap-[6px]" : "gap-[3px]"
              } font-bold`}
              key={index}
              href={`/productos/${category.toLowerCase().replaceAll(" ", "")}`}
              onMouseEnter={() => setAnimationIcon(category)}
              onMouseLeave={() => setAnimationIcon("")}
            >
              {category}
              <Image src={rightIcon} width={24} height={24} alt="" />
            </Link>
          ))}
        </ul>
      </aside>
    </div>
  );
}
