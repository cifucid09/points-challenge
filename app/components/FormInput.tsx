import { useField } from "remix-validated-form";
import { ErrorMessage } from "./ErrorMessage";

export type Props = {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
};

export const FormInput = ({
  name,
  label,
  placeholder = "0.00",
  required = false,
}: Props) => {
  const { error, getInputProps } = useField(name);

  return (
    <fieldset>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
        aria-label={label}
      >
        {label}
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          {...getInputProps({ id: name, placeholder, required })}
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          aria-label={`${name}`}
          aria-invalid={!!error}
          aria-errormessage={`error-msg-${name}`}
        />
      </div>
      {error && <ErrorMessage id={`error-msg-${name}`} error={error} />}
    </fieldset>
  );
};
