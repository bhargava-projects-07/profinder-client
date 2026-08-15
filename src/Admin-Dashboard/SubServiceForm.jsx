import { FormField, FormInput, FormSelect, FormTextarea } from "../components/TWFormElements";

const SubServiceForm = ({ entity, changeHandler, submitForm, entity_id,entity_name,optionsArr }) => {

    const btnLable = entity_id ? `Update ${entity_name}` : `Add ${entity_name}`;
    
  return (
    <form onSubmit={submitForm} className="mt-10 mb-3">

      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
        <FormField label="Select Service " htmlFor="serviceid" span="sm:col-span-1">
            <FormSelect id="serviceid" name="serviceid" value={entity.serviceid} onChange={changeHandler} options={optionsArr} />
        </FormField>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
        <FormField label="Sub Service Name" htmlFor="name" span="sm:col-span-1">
            <FormInput id="name" name="name" value={entity.name} onChange={changeHandler} />
        </FormField>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
        <FormField label="Sub Service Description" htmlFor="description" span="col-span-2">
            <FormTextarea id="description" rows="3" name="description" value={entity.description} onChange={changeHandler} />
        </FormField>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
        <div className="col-span-full">
          <button type="submit" className="cursor-pointer rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-emerald-500  transition-colors">
            {btnLable}
          </button>
        </div>
      </div>

    </form>
  );
};

export default SubServiceForm;
