// src/pages/LandingPage.jsx
import React from 'react';
import EraCard from '../components/EraCard';

const LandingPage = () => {
  const eras = [
    { id: 'paleozoico', name: 'PALEOZOICO', age: '541 - 252 m.a.', image: 'https://media.istockphoto.com/id/1144091536/es/foto/criaturas-del-período-cámbrico-escena-submarina-con-anomalocaris-opabinia-hallucigenia-pirania.jpg?s=612x612&w=0&k=20&c=XD683S0yCOb2WhXsT3iRx5XGVS7jCNjS3EN4SK0e7uA=', desc: 'El origen de la vida compleja. Trilobites, bosques de helechos gigantes y los primeros anfibios.' },
    { id: 'mesozoico', name: 'MESOZOICO', age: '252 - 66 m.a.', image: 'https://i.pinimg.com/736x/7e/0f/a7/7e0fa7367f9c74319d952ab3c700ba57.jpg', desc: 'La era de los dinosaurios. Triásico, Jurásico y Cretácico. El reinado de los reptiles gigantes.' },
    { id: 'cenozoico', name: 'CENOZOICO', age: '66 m.a. - Actualidad', image: 'https://i.pinimg.com/736x/fa/50/eb/fa50eb31911ad031402b4d316d3e9f80.jpg', desc: 'El ascenso de los mamíferos. Megafauna, glaciaciones y la evolución de los primates.' }
  ];

  return (
    <div className="min-h-[80vh] flex flex-col justify-center bg-[#0f0d0c] px-4 pt-12 pb-20">

      {/* TITULO Y BIENVENIDA */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-amber-500 font-mono text-sm tracking-[0.3em] mb-4 uppercase">
          Archivo de Paleontología Digital
        </h2>
        <h1 className="text-6xl md:text-8xl font-black text-cream tracking-tighter mb-6 italic">
          EXPLORA <span className="text-amber-600">EL PASADO</span>
        </h1>
        <p className="max-w-2xl mx-auto text-cream/60 text-lg leading-relaxed">
          Selecciona una era geológica para acceder a los registros fósiles y reconstrucciones biológicas de nuestro archivo.
        </p>
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