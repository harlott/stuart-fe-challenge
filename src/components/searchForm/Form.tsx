import React, { ReactElement, useEffect, useRef, RefObject } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import './search-form.css';

type Inputs = {
  pick_address: string,
  drop_address: string,
};

type FormStatus = 'loading' | 'success' | 'error';

type SearchFormProps = {
  createJob: (pickup:string, dropoff:string) => void;
  status: FormStatus;
  geolocalizeAddress: (address:string, type:string) => void;
};
/**
 * 
 * Some react-hook-form upgrades generate some issues on input state.
 * It's impossible by their API to estabilish valid field vs initial field (DOC is not truthy).
 * This generate two bugs: badge state and submit button disabled style by initial value :(
 * I can't look for a workaround now
 * 
 */
const SearchForm = ({ createJob, status, geolocalizeAddress }: SearchFormProps):ReactElement => {
  const { 
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({ mode: 'onChange',  reValidateMode: 'onChange', defaultValues: { pick_address: null, drop_address: null},});
  
  const onSubmit: SubmitHandler<Inputs> = data => { createJob(data.pick_address, data.drop_address); console.log(data) };
  const formRef = useRef<HTMLFormElement>(null);
  const validateAddress = (value:string) => {
    return value === '29 Rue du 4 Septembre' ||
    value === '15 Rue de Bourgogne'
  };

  useEffect(() => {
    if (formRef && status === 'success') {
      formRef.current.reset();
    }
  },[status]);
  console.log(`status = ${status}`);
  const isSubmitDisabled = errors.pick_address || errors.drop_address || status === 'loading'; 

  return (
    <div id="search" className="search font-primary">
      <form id="form" className="form" ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <div className="input-container">
          <div
            className={`pick ${errors.pick_address ? 'error' : ''} 
              ${!errors.pick_address ? 'valid' : ''}
            `} />
          <input
            id="pick_address"
            name="pick_address"
            type="text"
            placeholder="Pick up address"
            aria-invalid={errors.pick_address ? "true" : "false"}
            {...register("pick_address", { validate: validateAddress })}
            onBlur={(e) => geolocalizeAddress(e.currentTarget.value, 'pick')}
          />
        </div>
        <div className="input-container">
          <div className={`drop ${errors.drop_address ? 'error' : ''} 
              ${!errors.drop_address ? 'valid' : ''}
          `}/>
          <input
            id="drop_address"
            name="drop_address"
            type="text"
            placeholder="Drop off address"
            {...register("drop_address", { validate: validateAddress })}
            onBlur={(e) => geolocalizeAddress(e.currentTarget.value, 'drop' )}
          />
        </div>
        <div className="button-container">
          <input
            type="submit"
            value={status === 'loading' ? 'Creating...' : 'Create Job'}
            className={isSubmitDisabled ? 'disabled' : ''}
            disabled={isSubmitDisabled ? true : false}
          />
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
