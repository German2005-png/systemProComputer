'use client'
import Header from "@/components/header/header"
import Products from "@/components/products/products";
import ourPcMegas from "../jsons/ourPcMegas.json";
import ourPeripherals1 from "../jsons/ourPeripherals1.json";
import allProducts from "../jsons/allProduct.json";
import header2Image from '../../public/image/header2.png';
import header3Image from '../../public/image/header3.png';
import ContSponsors from "@/components/sponsors/contSponsors";
import Deliveries from "@/components/deliveries/deliveries";
import Footer from "@/components/footer/footer";

// import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col gap-[40px]">
      <Header image={header2Image} height="438px"/>
      <Products name="NUESTRAS MEGAS PC" showButton={true} data={allProducts.allProducts.filter((p)=> p.title === "NuestrasMegasPC")} />
      <Header image={header3Image} height="auto"/>
      <Products name="CONOCE NUESTROS PERIFERICOS" showButton={true} data={allProducts.allProducts.filter((p)=> p.title === "ConoceNuestrosPerifericos")} />
      <Products name="LOS PROCESADORES MAS POTENTES EN TU PC" showButton={true} data={allProducts.allProducts.filter((p)=> p.title === "LosProcesadoresMasPotentesEnTuPc")} />
      <ContSponsors />
      <Deliveries />
      <Footer />
    </main>
  );
}
