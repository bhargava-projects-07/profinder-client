

// Added a default span prop so fields can choose their layout size dynamically
export const FormField = ({ label, htmlFor, span = "col-span-full", children }) => (
  <div className={span}>
    <label htmlFor={htmlFor} className="block text-sm/6 font-medium text-gray-900">
      {label}
    </label>
    <div className="mt-2">{children}</div>
  </div>
);

// Standardized Styled Input Element
export const FormInput = ({ ...props }) => (
  <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-emerald-600">
    <input
      className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
      {...props}      
    />
  </div>
);

export const FormFileInput = ({ ...props }) => (
  <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-emerald-600">
    <input type="file"
      className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
      {...props}      
    />
  </div>
);

// Standardized Styled Textarea Element
 export const FormTextarea = ({ ...props }) => (
  <>
  <textarea
    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-600 sm:text-sm/6"
    {...props}
  />
  </>
);

export const FormSelect = ({ options = [], ...props }) => (
  <div className="flex items-center rounded-md bg-white pr-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-emerald-600">
    <select
      className="block min-w-0 grow bg-white py-2 pl-3 pr-8 text-base text-gray-900 outline-none focus:outline-none sm:text-sm/6 appearance-none"
      {...props}
    >
      <option value="">Select an option...</option>
      
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);
