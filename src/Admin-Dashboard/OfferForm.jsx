
import { FormField, FormInput, FormTextarea } from "../components/TWFormElements";
import SubmitButton from "./SubmitButton";

const OfferForm = ({ entity, changeHandler, submitForm, entity_id,entity_name, isSubmitting }) => {

    const btnLable = entity_id ? `Update ${entity_name}` : `Add ${entity_name}`;
    
  return (
    <form onSubmit={submitForm} className="mt-10 mb-3">

      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
        <FormField label="Offer Title" htmlFor="title" span="sm:col-span-2">
            <FormInput required id="title" name="title" value={entity.title} onChange={changeHandler} />
        </FormField>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
        <FormField label="Offer Detail" htmlFor="detail" span="col-span-2">
            <FormTextarea required id="detail" rows="3" name="detail" value={entity.detail} onChange={changeHandler} />
        </FormField>
      </div>

      <SubmitButton isSubmitting={isSubmitting} btnLable={btnLable} />

    </form>
  );
};

export default OfferForm;
