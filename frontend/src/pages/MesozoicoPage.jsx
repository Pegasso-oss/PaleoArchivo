import React from 'react';
import EraCard from '../components/EraCard';

const MesozoicoPage = () => {
  const periodos = [
    {
      id: 'triasico',
      name: 'TRIÁSICO',
      age: '252 - 201 m.a.',
      image: 'https://www.mundoprehistorico.com/wp-content/uploads/Herrerasaurus-01.jpg',
      desc: 'El resurgir tras la gran extinción. Aparecen los primeros dinosaurios y mamíferos verdaderos.'
    },
    {
      id: 'jurasico',
      name: 'JURÁSICO',
      age: '201 - 145 m.a.',
      image: 'https://www.papelpintado.com/media/catalog/product/cache/765175cf1e0a4cff0292d295081d4aa3/w/0/w09424_-_small.jpg',
      desc: 'La edad de oro de los gigantes. El Allosaurus y el Brachiosaurus dominan un mundo húmedo y verde.'
    },
    {
      id: 'cretacico',
      name: 'CRETÁCICO',
      age: '145 - 66 m.a.',
      image: 'https://images.unsplash.com/photo-1525877442103-5ddb2089b2bb?auto=format&fit=crop&q=80&w=800',
      desc: 'El fin de una era. Aparecen las flores y el T-Rex reina antes del impacto del meteorito.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0f0d0c] px-4 py-12">
      <div className="max-w-6xl mx-auto mb-16">
        <button 
          onClick={() => window.history.back()}
          className="text-amber-500/80 hover:text-amber-500 font-mono text-xs uppercase tracking-[0.3em] mb-8 transition-colors"
        >
          ← Volver a las eras
        </button>
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter italic leading-none">
          PERIODOS DEL <span className="text-amber-600">MESOZOICO</span>
        </h1>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {periodos.map((p) => (
          <EraCard 
            key={p.id}
            id={`mesozoico/${p.id}`} // <--- ESTO CREA LA RUTA /era/mesozoico/jurasico
            name={p.name}
            age={p.age}
            image={p.image}
          >
            {p.desc}
          </EraCard>
        ))}
      </div>
    </div>
  );
};

export default MesozoicoPage;