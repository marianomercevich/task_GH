import React, { useState } from 'react';
import './RegistroForm.css';

const RegistroForm = () => {
  const [registro, setRegistro] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: '',
  });

  const [errores, setErrores] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Validación del nombre y apellido
    if (name === 'nombre' || name === 'apellido') {
      const soloLetras = /^[A-Za-zÁ-ÿ\s]+$/;
      setErrores((prevErrores) => ({
        ...prevErrores,
        [name]: soloLetras.test(value) ? '' : 'Ingrese solo letras',
      }));
    }

    // Validación del correo electrónico
    if (name === 'email') {
      const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      setErrores((prevErrores) => ({
        ...prevErrores,
        email: emailValido ? '' : 'Formato de correo electrónico incorrecto',
      }));
    }

    // Validación del teléfono
    if (name === 'telefono') {
      const formatoTelefono = /^\d{10}$/; // Asumiendo que el teléfono tiene 10 dígitos
      setErrores((prevErrores) => ({
        ...prevErrores,
        telefono: formatoTelefono.test(value) ? '' : 'Ingrese un número de teléfono válido',
      }));
    }

    // Validación de la contraseña
    if (name === 'password') {
      setErrores((prevErrores) => ({
        ...prevErrores,
        password: value.length >= 6 ? '' : 'La contraseña debe tener al menos 6 caracteres',
      }));
    }

    // Validación de la confirmación de contraseña
    if (name === 'confirmPassword') {
      const esIgual = value === registro.password;
      setErrores((prevErrores) => ({
        ...prevErrores,
        confirmPassword: esIgual ? '' : 'Las contraseñas no coinciden',
      }));
    }

    setRegistro((prevRegistro) => ({
      ...prevRegistro,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validación final antes de enviar los datos al servidor
    const isValid = Object.values(errores).every((error) => error === '');

    if (isValid) {
      console.log('Registro enviado:', registro);
    } else {
      console.log('Error en el formulario. Por favor, corrija los campos.');
    }
  };

  return (
    <form className="registro-form" onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input type="text" name="nombre" value={registro.nombre} onChange={handleInputChange} />
        {errores.nombre && <span className="mensaje-error">{errores.nombre}</span>}
      </label>
      <br />
      <label>
        Apellido:
        <input type="text" name="apellido" value={registro.apellido} onChange={handleInputChange} />
        {errores.apellido && <span className="mensaje-error">{errores.apellido}</span>}
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={registro.email}
          onChange={handleInputChange}
          className={errores.email ? 'error' : ''}
        />
        {errores.email && <span className="mensaje-error">{errores.email}</span>}
      </label>
      <br />
      <label>
        Teléfono:
        <input
          type="tel"
          name="telefono"
          value={registro.telefono}
          onChange={handleInputChange}
          className={errores.telefono ? 'error' : ''}
        />
        {errores.telefono && <span className="mensaje-error">{errores.telefono}</span>}
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={registro.password}
          onChange={handleInputChange}
          className={errores.password ? 'error' : ''}
        />
        {errores.password && <span className="mensaje-error">{errores.password}</span>}
      </label>
      <br />
      <label>
        Confirmar Password:
        <input
          type="password"
          name="confirmPassword"
          value={registro.confirmPassword}
          onChange={handleInputChange}
          className={errores.confirmPassword ? 'error' : ''}
        />
        {errores.confirmPassword && <span className="mensaje-error">{errores.confirmPassword}</span>}
      </label>
      <br />
      <button type="submit">Registrarse</button>
    </form>
  );
};

export default RegistroForm;