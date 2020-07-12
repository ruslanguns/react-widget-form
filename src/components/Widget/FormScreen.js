import React from 'react';
import validator from 'validator';
import Select from 'react-select';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { setError } from '../../actions/ui';


export const FormScreen = () => {

  const dispatch = useDispatch();
  const { loading, msgError } = useSelector(state => state.ui);
  const [formValues, handleInputChange, reset] = useForm({
    firstname: 'Ok',
    company: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
    terms: true
  });
  const { firstname, company, phone, email, subject, message, terms } = formValues;
  const subjectOptions = [
    { value: 'Obtener Licencia GRATIS', label: 'Obtener Licencia GRATIS' },
    { value: 'Comprar Plan — Demostración', label: 'Comprar Plan — Demostración' },
    { value: 'Comprar Plan — Distribuidor', label: 'Comprar Plan — Distribuidor' },
    { value: 'Comprar Plan — Local', label: 'Comprar Plan — Local' },
    { value: 'Información — Instalación de Wifi', label: 'Información — Instalación de Wifi' },
    { value: 'Información — WiFi Hoteles', label: 'Información — WiFi Hoteles' },
    { value: 'Información — Otros', label: 'Información — Otros' }
  ];

  const handleOnSubmit = (e) => {
    e.preventDefault();
    
    if (isFormValid) {
      
    }
  }

  const isFormValid = () => {
    if (firstname.trim().length === 0) {
      dispatch( setError('El nombre es requerido.'));
      return false;
    }
  }

  return (
    <div className="widget-container">

      <div className="container pt-4">
        <div className="row">
          <div className="col-12">
            <form onSubmit={handleOnSubmit} noValidate>
              <div className="form-row">

                <div className="col-sm-6 mb-3">
                  <label htmlFor="firstname">Nombre</label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    value={firstname}
                    onChange={handleInputChange}
                    className="form-control"
                    autoComplete="off"
                    />
                  <div className="valid-feedback">
                    Todo bien!
                  </div>
                  <div className="invalid-feedback">
                    Debe introducir su nombre
                  </div>
                </div>

                <div className="col-sm-6 mb-3">
                  <label htmlFor="company">Empresa</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={company}
                    onChange={handleInputChange}
                    className="form-control"
                    autoComplete="off"/>
                </div>

              </div>

              <div className="form-group">
                <label htmlFor="phone">Teléfono</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={handleInputChange}
                  className="form-control"
                  autoComplete="off" />
              </div>

              <div className="form-group">
                <label htmlFor="email">Correo electrónico *</label>
                <input
                  type="email"
                  value={email}
                  onChange={handleInputChange}
                  className="form-control"
                  id="email"
                  />
                <div className="valid-feedback">
                  Todo bien!
                </div>
                <div className="invalid-feedback">
                  Debe ser un correo electrónico válido.
                </div>
              </div>

              <div className="form-group">

                <label htmlFor="subject" defaultValue={''}>Motivo de contacto *</label>

                <Select
                  id="subject"
                  name="subject"
                  value={subject}
                  onChange={handleInputChange}
                  isClearable="true"
                  className=""
                  options={subjectOptions} />

                <div className="valid-feedback">
                  Todo bien!
                </div>
                <div className="invalid-feedback">
                  Seleccione el asunto de su correo.
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Mensaje</label>
                <textarea
                  id="message"
                  name="message"
                  value={message}
                  onChange={handleInputChange}
                  className="form-control"
                  name="message"
                  rows="3"
                  required></textarea>
                <div className="valid-feedback">
                  Todo bien!
                </div>
                <div className="invalid-feedback">
                  Díganos, ¿en qué podemos ayudarle?
                </div>
              </div>
              
              <div className="form-check">
                <input
                  id="terms"
                  name="terms"
                  onChange={handleInputChange}
                  checked={terms}
                  type="checkbox"
                  className="form-check-input
                  big-checkbox"
                  />
                <label htmlFor="terms" className="form-check-label" htmlFor="terms">
                  Para continuar acepte nuestros <a href="#" onClick={e => e.preventDefault()}>Términos de servicios y políticas de privacidad.</a>
                </label>
                <div className="invalid-feedback">
                  Debes aceptar los términos para poder continuar.
                </div>
              </div>

              <div className="text-center mt-3">
                <div className="col-12">
                  <button
                    type="submit"
                    id="sendContactButton"
                    disabled={ loading}
                    data-sitekey="reCAPTCHA_site_key"
                    data-callback='onSubmit'
                    data-action='submit'
                    className="btn btn-primary btn-lg">
                    Enviar
                </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
}