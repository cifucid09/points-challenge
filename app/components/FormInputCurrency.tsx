import { useField } from "remix-validated-form";
import { ErrorMessage } from "./ErrorMessage";

export type Props = {
  name: string;
  label: string;
  placeholder?: string;
  currency?: string;
  required?: boolean;
};

// TODO: Refactor so that we can have common form field information in one place and just add in the inputs

export const FormInputCurrency = ({
  name,
  label,
  placeholder = "0.00",
  currency = "CAD",
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
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-gray-500 sm:text-sm">$</span>
        </div>
        <input
          {...getInputProps({ id: name, placeholder, required })}
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          aria-label={`${name}`}
          aria-invalid={!!error}
          aria-errormessage={`error-msg-${name}`}
        />
        <div className="absolute inset-y-0 right-0 mr-2 flex items-center">
          <span>{currency}</span>
        </div>
      </div>
      {error && <ErrorMessage id={`error-msg-${name}`} error={error} />}
    </fieldset>
  );
};
