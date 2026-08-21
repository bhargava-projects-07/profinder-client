
import { FormField, FormFileInput, FormInput, FormTextarea } from "../components/TWFormElements";
import SubmitButton from "./SubmitButton";

const BlogForm = ({ entity, blogImageInputRef, changeHandler, fileHandler, submitForm, entity_id,entity_name, isSubmitting }) => {

    const btnLable = entity_id ? `Update ${entity_name}` : `Add ${entity_name}`;
    
  return (
    <form onSubmit={submitForm} className="mt-10 mb-3">

      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
        <FormField label="Blog Title" htmlFor="title" span="sm:col-span-2">
            <FormInput required id="title" name="title" value={entity.title} onChange={changeHandler} />
        </FormField>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
        <FormField label="Blog Image" htmlFor="blogimage" span="sm:col-span-2">
            <FormFileInput required type="file" name="blogimage" ref={blogImageInputRef} onChange={fileHandler} />
        </FormField>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
        <FormField label="Blog Content" htmlFor="content" span="col-span-2">
            <FormTextarea required id="content" rows="3" name="content" value={entity.content} onChange={changeHandler} />
        </FormField>
      </div>

      <SubmitButton isSubmitting={isSubmitting} btnLable={btnLable} />

    </form>
  );
};

export default BlogForm;
