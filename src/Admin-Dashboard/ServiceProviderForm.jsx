
import { FormField, FormInput, FormSelect, FormTextarea } from "../components/TWFormElements";
import SubmitButton from "./SubmitButton";

const ServiceProviderForm = ({ entity, changeHandler, submitForm, entity_id,entity_name,optionsArr,subOptionsArr, isSubmitting }) => {

    const btnLable = entity_id ? `Update ${entity_name}` : `Add ${entity_name}`;
    
  return (
    <form onSubmit={submitForm} className="mt-10 mb-3">

      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
        <FormField label="Select Service " htmlFor="serviceid" span="sm:col-span-1">
            <FormSelect id="serviceid" name="serviceid" value={entity.serviceid} onChange={changeHandler} options={optionsArr} />
        </FormField>
        <FormField label="Select Sub Service " htmlFor="subserviceid" span="sm:col-span-1">
            <FormSelect id="subserviceid" name="subserviceid" value={entity.subserviceid} onChange={changeHandler} options={subOptionsArr} />
        </FormField>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
        <FormField label="Service Provider Name" htmlFor="name" span="sm:col-span-1">
            <FormInput id="name" name="name" value={entity.name} onChange={changeHandler} />
        </FormField>
        <FormField label="Service Provider Business Name" htmlFor="businessname" span="sm:col-span-1">
            <FormInput id="businessname" name="businessname" value={entity.businessname} onChange={changeHandler} />
        </FormField>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
        <FormField label="Service Provider Email" htmlFor="email" span="sm:col-span-1">
            <FormInput id="email" name="email" value={entity.email} onChange={changeHandler} />
        </FormField>
        <FormField label="Service Provider Phone" htmlFor="phone" span="sm:col-span-1">
            <FormInput id="phone" name="phone" value={entity.phone} onChange={changeHandler} />
        </FormField>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
        <FormField label="Service Provider Address" htmlFor="address" span="col-span-2">
            <FormTextarea id="address" rows="3" name="address" value={entity.address} onChange={changeHandler} />
        </FormField>
      </div>

      <SubmitButton isSubmitting={isSubmitting} btnLable={btnLable} />

    </form>
  );
};

export default ServiceProviderForm;
