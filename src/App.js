import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario.js'
import Cita from './components/Cita.js'

function App() {

  // Citas en localStorage
  let citasIniciales = JSON.parse( localStorage.getItem('citas') );

  if( !citasIniciales ) {
    citasIniciales = [];
  }

  const [citas, guardarCitas] = useState(citasIniciales);

  // UseEffect para realizar ciertas operaciones cuando el state cambia
  useEffect( () => {
    if( citasIniciales ) {
      localStorage.setItem( 'citas', JSON.stringify(citas) );
    } else {
      localStorage.setItem( 'citas', JSON.stringify([]) );
    }
  }, [citas]);

  // Funcion que toma las citas actuales y agregua la nueva
  const crearCita = cita => {
    guardarCitas([ ...citas, cita ]);
  }
  
  //Funcion que eliminar una cita por su id
  const eliminarCita = id => {
    const nuevasCitas = citas.filter( cita => cita.id !== id);
    guardarCitas(nuevasCitas);
  }

  // Mensaje condicional
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas' ;

  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario 
              crearCita={crearCita}
            / >
          </div>
          <div className="one-half column">
            <h2>
              { titulo }
            </h2>
            { citas.map(cita => (
              <Cita 
                cita={cita}
                key={cita.id}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
