import React, { useState } from 'react';
import './alertStyle.scss';
import { useForm, Controller } from 'react-hook-form';
import { GoogleReCaptcha } from 'react-google-recaptcha-v3';
import es from 'react-phone-input-2/lang/es.json'
import PhoneInput from 'react-phone-input-2'
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { subscribeLead } from '../../helpers/subscribeLead';
import { EMAIL_REGEX } from '../../constants';
import { loadingData } from '../../helpers/loadingData';
import { loadingDataFinish } from '../../helpers/loadingDataFinish';
import { startLoading, finishLoading, setError, removeError } from '../../actions/ui';

const FormScreen = ({ config }) => {
  const dispatch = useDispatch();
  const { listUid, replyTo, reCaptchaKey, selectOptions } = config;
  const { loading, msgError } = useSelector(state => state.ui);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { register, handleSubmit, errors, control, reset, setValue } = useForm({mode: 'onChange'});
  
  const onSubmit = async data => {
    loadingData('Enviando', 'Espera mientras enviamos el formulario');
    dispatch(startLoading());

    return await subscribeLead(data, listUid, replyTo)
      .then(() => {
        dispatch(finishLoading());
        setFormSubmitted(true);
        loadingDataFinish();
        reset();
        setValue('phone', '34', { shouldDirty: false, shouldValidate: false });
      })
      .catch(err => {
        loadingDataFinish();
        dispatch(finishLoading());
        if (err.response) {
          return dispatch(setError(err.response.data));
        } else {
          return dispatch(setError({ message: 'Ha surgido un problema, intente más tarde por favor.'}))
        }
      });
  }

  const handleHideAlert = () => {
    dispatch(removeError());
    setFormSubmitted(false);
  }

  return (
    <>
      <div className="bootstrap">

        <div className="container pt-4">
          <div className="row">
            <div className="col-12">
              
              {
                msgError && (

                  <div className="rus-alert-container">
                    <div className="rus-alert-danger">
                      <div>
                        <strong>{ msgError?.message }</strong>
                      </div>
                      <button
                        type="button"
                        onClick={handleHideAlert}
                        className="close">
                        <span>&times;</span>
                      </button>
                    </div>
                  </div>
                )
              }
              {
                formSubmitted && (

                  <div className="rus-alert-container">
                    <div className="rus-alert-success">
                      <div>
                        <strong>El formulario se ha enviado correctamente.</strong>
                      </div>
                      <button
                        type="button"
                        onClick={handleHideAlert}
                        className="close">
                        <span>&times;</span>
                      </button>
                    </div>
                  </div>
                )
              }
              
              <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
                <div className="form-row">

                  <div className="col-sm-6 mb-3">
                    <label htmlFor="subject">Nombre *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      autoComplete="nope"
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
                      autoComplete="off" />
                  </div>

                </div>

                <div className="form-group">
                  <label htmlFor="phone">Teléfono *</label>
                  <Controller
                    as={
                      <PhoneInput
                        id="phone"
                        localization={es}
                        country={'es'}
                        inputClass={`${errors.phone && 'is-invalid' || ''} form-control-lg`}
                        inputRef={register}
                      />
                    }
                    name="phone"
                    control={control}
                    rules={{ required: true, minLength: 10 }}
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
                    ref={register({ required: true, pattern: EMAIL_REGEX })}
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
                      selectOptions.map(({ value, label }) => (
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
                    rows="3" />
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
                    &nbsp; Para continuar acepte nuestros <a href={config?.termsUrl || '#'} target="_blank">Términos de servicios y políticas de privacidad.</a>
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

                <div className="col-12" style={{ marginTop: '20px' }}>
                  <div className="text-center">
                    <button
                      type="submit"
                      id="sendContactButton"
                      disabled={loading}
                      data-sitekey={reCaptchaKey}
                      data-callback='onSubmit'
                      data-action='submit'
                      className="btn btn-primary btn-lg btn-block">
                      Enviar
                    </button>
                    <GoogleReCaptcha action="submit" onVerify={token => null} />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
FormScreen.propTypes = {
  config: PropTypes.shape({
    listUid: PropTypes.string.isRequired,
    replyTo: PropTypes.string.isRequired,
    reCaptchaKey: PropTypes.string.isRequired,
    selectOptions: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })).isRequired
  })
}

export default FormScreen;
