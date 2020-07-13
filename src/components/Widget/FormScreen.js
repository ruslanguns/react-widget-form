import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { GoogleReCaptcha } from 'react-google-recaptcha-v3';
import PhoneInput from 'react-phone-input-2'
import es from 'react-phone-input-2/lang/es.json'


export const FormScreen = () => {
  const emailRegx=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const subjectOptions = [
    { value: 'Obtener Licencia GRATIS', label: 'Obtener Licencia GRATIS' },
    { value: 'Comprar Plan — Demostración', label: 'Comprar Plan — Demostración' },
    { value: 'Comprar Plan — Distribuidor', label: 'Comprar Plan — Distribuidor' },
    { value: 'Comprar Plan — Local', label: 'Comprar Plan — Local' },
    { value: 'Información — Instalación de Wifi', label: 'Información — Instalación de Wifi' },
    { value: 'Información — WiFi Hoteles', label: 'Información — WiFi Hoteles' },
    { value: 'Información — Otros', label: 'Información — Otros' }
  ];
  const { register, handleSubmit, errors, formState, control } = useForm({ mode: 'onChange' });

  const onSubmit = (data) => {
    console.log(data);
  }
  return (
    <div className="widget-container">

      <div className="container pt-4">
        <div className="row">
          <div className="col-12">
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
              <div className="form-row">

                <div className="col-sm-6 mb-3">
                  <label htmlFor="subject">Nombre</label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    ref={register({ required: true, minLength: 2 })}
                    className={`form-control ${errors.firstname && 'is-invalid'} form-control-lg`}
                    />
                  {
                    errors.firstname &&
                    (<div className="invalid-feedback d-block">
                      {
                        errors.firstname.type === 'required' && 'Este campo es obligatorio' ||
                        errors.firstname.type === 'minLength' && 'Debe introducir como mínimo dos caracteres'
                      }
                    </div>)
                  }
                </div>

                <div className="col-sm-6 mb-3">
                  <label htmlFor="company">Empresa</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    ref={register({ required: false })}
                    className="form-control form-control-lg"
                    autoComplete="off"/>
                </div>

              </div>

              <div className="form-group">
                <label htmlFor="phone">Teléfono</label>
                <Controller
                  as={
                    <PhoneInput
                      id="phone"
                      localization={es}
                      country={'es'}
                      inputClass={`${errors.phone && 'is-invalid' || ''} form-control-lg`}
                      // inputStyle={{
                      //   width: '100%',
                      //   height: '50px',
                      //   fontSize: '1.4em'
                      // }}
                      // dropdownStyle={{
                      //   width: '300px',
                      //   fontSize: '1.2em'
                      // }}
                      inputRef={register}
                    />
                  }
                  name="phone"
                  control={control}
                  rules= {{required: true, minLength: 10}}
                />
                {
                  errors.phone &&
                  (<div className="invalid-feedback d-block">
                    {
                      errors.phone.type === 'required' && 'Este campo es obligatorio'
                    }
                  </div>)
                }
              </div>

              <div className="form-group">
                <label htmlFor="email">Correo electrónico *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  ref={register({ required: true, pattern: emailRegx })}
                  className={`form-control ${errors.email && 'is-invalid'} form-control-lg`}
                  autoComplete="nope"
                  />
                
              {
                errors.email &&
                (<div className="invalid-feedback d-block">
                  {
                    errors.email.type === 'required' && 'Este campo es obligatorio' ||
                    errors.email.type === 'pattern' && 'Debe ser un correo válido'
                  }
                </div>)
              }
              </div>

              <div className="form-group">

                <label htmlFor="subject">Motivo de contacto *</label>

                <select
                  name="subject"
                  id="subject"
                  defaultValue={''}
                  ref={register({ required: true })}
                  className={`form-control ${errors.subject && 'is-invalid'} form-control-lg`}
                  >
                    
                  <option value="" disabled>-- Seleccione una opción --</option> 
                  {
                    subjectOptions.map(({ value, label }) => (
                      <option value={value} key={value}>{label}</option>
                    ))
                  }

                </select>

                {
                  errors.subject &&
                  (<div className="invalid-feedback d-block">
                    {
                      errors.subject.type === 'required' && 'Este campo es obligatorio'
                    }
                  </div>)
                }
              </div>

              <div className="form-group">
                <label htmlFor="message">Mensaje</label>
                <textarea
                  id="message"
                  name="message"
                  ref={register({ required: true })}
                  className={`form-control ${errors.message && 'is-invalid'} form-control-lg`}
                  rows="3"/>
                {
                  errors.message &&
                  (<div className="invalid-feedback d-block">
                    {
                      errors.message.type === 'required' && 'Este campo es obligatorio'
                    }
                  </div>)
                }
              </div>
              
              <div className="custom-control form-control-lg custom-checkbox">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  ref={register({ required: true })}
                  className={`${errors.terms && 'is-invalid'} custom-control-input`}
                  />
                <label htmlFor="terms" className="custom-control-label" htmlFor="terms">
                  Para continuar acepte nuestros <a href="#" onClick={e => e.preventDefault()}>Términos de servicios y políticas de privacidad.</a>
                </label>
                {
                  errors.terms &&
                  (<div className="invalid-feedback d-block">
                    {
                      errors.terms.type === 'required' && 'Este campo es obligatorio'
                    }
                  </div>)
                }
              </div>

              <div className="col-12 mt-4">  
                <div className="text-center">
                  <button
                    type="submit"
                    id="sendContactButton"
                    // disabled={!formState.isValid}
                    data-sitekey="6LeLZ7AZAAAAAB5tTLi-L5I5atxIZa6W6r0JwjSo"
                    data-callback='onSubmit'
                    data-action='submit'
                    className="btn btn-primary btn-lg btn-block">
                    Enviar
                  </button>
                  <GoogleReCaptcha  action="submit" onVerify={token => null} />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
}