import React, { useState } from "react";
import { Link } from "react-router-dom";
import EraCard from "../components/EraCard";
import { allAnimals } from "../data/allData";
import { Search, X } from "lucide-react"; // Instala lucide-react si no lo tienes

const LandingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const eras = [
    {
      id: "paleozoico",
      name: "PALEOZOICO",
      age: "541 - 252 m.a.",
      image:
        "https://media.istockphoto.com/id/1144091536/es/foto/criaturas-del-período-cámbrico-escena-submarina-con-anomalocaris-opabinia-hallucigenia-pirania.jpg?s=612x612&w=0&k=20&c=XD683S0yCOb2WhXsT3iRx5XGVS7jCNjS3EN4SK0e7uA=",
      desc: "El origen de la vida compleja. Trilobites, bosques de helechos gigantes y los primeros anfibios.",
    },
    {
      id: "mesozoico",
      name: "MESOZOICO",
      age: "252 - 66 m.a.",
      image:
        "https://i.pinimg.com/736x/7e/0f/a7/7e0fa7367f9c74319d952ab3c700ba57.jpg",
      desc: "La era de los dinosaurios. Triásico, Jurásico y Cretácico. El reinado de los reptiles gigantes.",
    },
    {
      id: "cenozoico",
      name: "CENOZOICO",
      age: "66 m.a. - Actualidad",
      image:
        "https://i.pinimg.com/736x/fa/50/eb/fa50eb31911ad031402b4d316d3e9f80.jpg",
      desc: "El ascenso de los mamíferos. Megafauna, glaciaciones y la evolución de los primates.",
    },
  ];

 // Anti-Duplicats
const uniqueAnimals = Array.from(
  new Map(allAnimals.map(dino => [dino.nombre.toLowerCase(), dino])).values()
);

// 2. Filtros
const filteredDinos = uniqueAnimals.filter((dino) => {
    if (!searchTerm) return false;
    const search = searchTerm.toLowerCase().trim();
    const name = dino.nombre.toLowerCase();

    // Solo mostramos si el nombre EMPIEZA por lo que escribes
    return name.startsWith(search);
  }).sort((a, b) => a.nombre.localeCompare(b.nombre)).slice(0, 5); 

  return (
    <div className="min-h-[80vh] flex flex-col justify-center bg-[#1d1914] px-4 pt-12 pb-20">
      {/* TITULO Y BIENVENIDA */}
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-amber-500 font-mono text-sm tracking-[0.3em] mb-4 uppercase">
          Archivo de Paleontología Digital
        </h2>
        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-6 italic">
          EXPLORA <span className="text-amber-600">EL PASADO</span>
        </h1>
        <p className="max-w-2xl mx-auto text-white/60 text-lg leading-relaxed">
          Selecciona una era geológica para acceder a los registros fósiles y
          reconstrucciones biológicas de nuestro archivo.
        </p>

        {/* --- BUSCADOR TEXTUAL (OPCIÓN B: FLOTANTE) --- */}
        <div className="mt-12 mb-20 max-w-xl mx-auto relative z-50">
          <div className="relative group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Search
                className={`transition-colors ${searchTerm ? "text-amber-500" : "text-stone-600"}`}
                size={18}
              />
            </div>

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="BUSCAR EN EL ARCHIVO..."
              className="w-full bg-[#2a2420]/40 border border-stone-800 py-4 pl-14 pr-12 rounded-xl text-sm font-mono tracking-widest focus:outline-none focus:border-amber-600/50 focus:bg-[#2a2420]/80 transition-all placeholder:text-stone-700 text-white uppercase"
            />

            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-4 flex items-center text-stone-500 hover:text-white"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* RESULTADOS DESPLEGABLES */}
          {searchTerm && (
            <div className="absolute w-full mt-2 bg-[#1a1614] border border-stone-800 rounded-xl shadow-2xl overflow-hidden backdrop-blur-xl max-h-[400px] overflow-y-auto">
              {filteredDinos.length > 0 ? (
                filteredDinos.map((dino) => (
                  <Link
                    key={dino.id}
                    to={`/animal/${dino.nombre.toLowerCase()}`}
                    className="flex items-center gap-4 p-4 hover:bg-amber-600/10 transition-colors border-b border-white/5 last:border-none group/item">
                    <img
                      src={dino.imagen}
                      alt={dino.nombre}
                      className="w-12 h-12 object-cover rounded-lg border border-white/10"/>
                    <div className="text-left">
                      <p className="font-black uppercase italic text-amber-500 leading-none group-hover/item:text-white transition-colors">
                        {dino.nombre}
                      </p>
                      <p className="text-[10px] text-stone-500 uppercase tracking-widest mt-1.5">
                        {dino.subName}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-6 text-stone-600 font-mono text-xs uppercase tracking-[0.2em]">
                  Sin registros identificados en el archivo
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* GRID DE ERAS */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {eras.map((era) => (
          <EraCard
            key={era.id}
            id={era.id}
            name={era.name}
            age={era.age}
            image={era.image}
          >
            {era.desc}
          </EraCard>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
