import type { ActionFunction, V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useActionData, useNavigation } from "@remix-run/react";
import { withZod } from "@remix-validated-form/with-zod";
import { ValidatedForm, validationError } from "remix-validated-form";
import { z } from "zod";

import TaxApiInstance from "~/api/TaxApi";
import { ErrorMessage } from "~/components/ErrorMessage";
import { FormInput } from "~/components/FormInput";
import { FormInputCurrency } from "~/components/FormInputCurrency";
import { TaxInformation } from "~/components/TaxInformation";
import TaxCalculatorInstance from "~/services/TaxCalculator";

export const formValidator = withZod(
  z.object({
    annualIncome: z.preprocess(
      (val) => (val === "" ? null : Number(val)),
      z
        .number({
          invalid_type_error: "Annual Income must be a number",
          required_error: "Annual Income is required",
        })
        .nonnegative("Annual Income must be a positive number")
    ),
    taxYear: z.preprocess(
      (val) => (val === "" ? null : Number(val)),
      z
        .number({
          invalid_type_error: "Tax Year must be a number",
          required_error: "Tax Year is required",
        })
        .nonnegative("Tax Year must be a positive number")
    ),
  })
);

export const meta: V2_MetaFunction = () => {
  return [{ title: "Points Tax Calculator" }];
};

export const action: ActionFunction = async ({ request }) => {
  // Validate form information
  const validationData = await formValidator.validate(await request.formData());

  // Let the form know of any errors
  if (validationData.error) {
    return validationError(validationData.error);
  }

  // Zod already returns data with corresponding types
  const { annualIncome, taxYear } = validationData.data;

  try {
    // Fetch Tax Year stuff
    const result = await TaxApiInstance.getTaxRatesByYear(taxYear);
    const calculatedTax = TaxCalculatorInstance.getCalculatedTax(
      annualIncome,
      result
    );

    return json({ calculatedTax });
  } catch (error) {
    // We log the actual error for monitoring and troubleshoot
    console.error("Failed to calculate Taxes", error);

    // Return concise error and user friendly message (adding more details?)
    return json({ error: "Failed to calculate Taxes" });
  }
};

export default function Index() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();

  const hasError = !!actionData?.error;
  const hasTaxInfo = !!actionData?.calculatedTax;
  const isSubmitting = navigation.state === "submitting";
  const submitButtonLabel = isSubmitting
    ? "Calculating ..."
    : "Calculate taxes";

  return (
    <div className="flex h-screen content-center bg-gray-200 p-4">
      <div className="m:w-1/2 m-auto w-full rounded-xl border border-gray-900/10 bg-white pb-12 lg:w-2/3">
        <ValidatedForm
          validator={formValidator}
          method="post"
          defaultValues={{ annualIncome: 100000, taxYear: 2022 }}
        >
          <div className="m-4 mt-10 grid gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-6 text-center">
              <span className="text-2xl text-blue-700">Tax Calculator</span>
            </div>
            <div className="col-span-6 sm:col-span-3">
              <FormInputCurrency name="annualIncome" label="Annual income" />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <FormInput name="taxYear" label="Tax Year" />
            </div>
            <div className="col-span-6 mt-6 text-center">
              <button
                disabled={isSubmitting}
                type="submit"
                className="
                  focus:shadow-outline
                  h-10
                  rounded-lg
                  bg-blue-700
                  px-5
                  text-indigo-100
                  transition-colors
                  duration-150
                  hover:bg-blue-800
                  disabled:opacity-25
                  "
              >
                {submitButtonLabel}
              </button>
            </div>
          </div>
        </ValidatedForm>
        {hasError && (
          <div className="w-full text-center">
            <ErrorMessage error={actionData?.error} />
          </div>
        )}
        {hasTaxInfo && <TaxInformation data={actionData?.calculatedTax} />}
      </div>
    </div>
  );
}
