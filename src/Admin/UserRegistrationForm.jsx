
import { FormField, FormInput, FormTextarea } from "../components/TWFormElements";

const UserRegistrationForm = ({ entity,changeHandler, submitForm,cancelReg  }) => {

    const btnLable = `Register Admin`;
    
  return (
    <form onSubmit={submitForm} className="mt-10 mb-3">

      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
        <FormField label="Admin Name" htmlFor="name" span="sm:col-span-1">
            <FormInput required id="name" name="name" value={entity.name} onChange={changeHandler} />
        </FormField>
        <FormField label="Admin Email" htmlFor="email" span="sm:col-span-1">
            <FormInput required type="email" id="email" name="email" value={entity.email} onChange={changeHandler} />
        </FormField>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
        <FormField label="Phone" htmlFor="phone" span="sm:col-span-1">
            <FormInput required id="phone" name="phone" value={entity.phone} onChange={changeHandler} />
        </FormField>
        <FormField label="Admin Password" htmlFor="password" span="sm:col-span-1">
            <FormInput required type="password" id="password" name="password" value={entity.password} onChange={changeHandler} />
        </FormField>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
        <FormField label="Address" htmlFor="address" span="col-span-2">
            <FormTextarea required id="address" rows="3" name="address" value={entity.address} onChange={changeHandler} />
        </FormField>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
        <div className="col-span-full">
          <button type="submit" className="cursor-pointer rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-emerald-500  transition-colors">
            {btnLable}
          </button>
          <button 
              type="button"
              onClick={cancelReg}
              className="ms-3 cursor-pointer rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 shadow-xs hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>            
        </div>
      </div>

    </form>
  );
};

export default UserRegistrationForm;
