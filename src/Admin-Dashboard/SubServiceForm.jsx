
import { FormField, FormInput, FormSelect, FormTextarea } from "../components/TWFormElements";
import SubmitButton from "./SubmitButton";

const SubServiceForm = ({ entity, changeHandler, submitForm, entity_id,entity_name,optionsArr, isSubmitting }) => {

    const btnLable = entity_id ? `Update ${entity_name}` : `Add ${entity_name}`;
    
  return (
    <form onSubmit={submitForm} className="mt-10 mb-3">

      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
        <FormField label="Select Service " htmlFor="serviceid" span="sm:col-span-1">
            <FormSelect required id="serviceid" name="serviceid" value={entity.serviceid} onChange={changeHandler} options={optionsArr} />
        </FormField>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
        <FormField label="Sub Service Name" htmlFor="name" span="sm:col-span-1">
            <FormInput required id="name" name="name" value={entity.name} onChange={changeHandler} />
        </FormField>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
        <FormField label="Sub Service Description" htmlFor="description" span="col-span-2">
            <FormTextarea required id="description" rows="3" name="description" value={entity.description} onChange={changeHandler} />
        </FormField>
      </div>

      <SubmitButton isSubmitting={isSubmitting} btnLable={btnLable}  />

    </form>
  );
};

export default SubServiceForm;
