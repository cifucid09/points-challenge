import type { TaxResult } from "app/types";
import {
  bracketToString,
  numberToCurrency,
  numberToPercentage,
} from "app/utils";
import classNames from "classnames";

type TaxMainInfoProps = {
  label: string;
  value: string;
};

const TaxMainInfo = ({ label, value }: TaxMainInfoProps) => {
  return (
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium leading-6 text-gray-900">
        {`${label}: `}
      </dt>
      <dd
        aria-label={label}
        className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
      >
        {value}
      </dd>
    </div>
  );
};

type TaxDetailRowProps = {
  label: string;
  value: string;
  isHeader?: boolean;
};

const TaxDetailRow = ({
  label,
  value,
  isHeader = false,
}: TaxDetailRowProps) => {
  return (
    <li
      className="flex items-center justify-evenly gap-2 py-4 pl-4 pr-5 text-sm leading-6"
      role={isHeader ? "rowheader" : "row"}
    >
      <div className={classNames("ml-4 flex-1", { "text-center": isHeader })}>
        <span
          className={classNames("font-medium", {
            "truncate text-gray-400": !isHeader,
          })}
        >
          {label}
        </span>
      </div>
      <div className={classNames("ml-4 flex-1", { "text-center": isHeader })}>
        <span
          className={classNames("font-medium", {
            "flex-shrink-0 truncate ": !isHeader,
          })}
        >
          {value}
        </span>
      </div>
    </li>
  );
};

export type Props = {
  title?: string;
  data: TaxResult;
};

export const TaxInformation: React.FC<Props> = ({
  title = "Tax Detailed Information",
  data,
}) => {
  if (!data) {
    // TODO: Right so i can not do anything without data, do i need to throw instead? Error Boundary will catch it
    console.error("TaxInformation has no data to work with", data);
    return null;
  }

  const { total, effectiveRate, byBracket } = data;

  const formattedTotal = numberToCurrency(total);
  const formattedEffectiveRate = numberToPercentage(effectiveRate);

  return (
    <div className="m-4 rounded-xl border border-gray-900/10 p-2">
      <div>
        <div className="px-4 sm:px-0">
          <h3
            aria-label={title}
            className="text-base font-semibold leading-7 text-gray-900"
          >
            {title}
          </h3>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <TaxMainInfo label="Total Tax" value={formattedTotal} />
            <TaxMainInfo
              label="Effective Tax Rate"
              value={formattedEffectiveRate}
            />
            {/**
             * TODO: This is for future US, if this format is required somewhere else (not as of now) this could be a ticketed improvement: Maybe this could be a separate component, and more generic on how we display table-format data
             */}
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Tax brackets
              </dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <ul className="divide-y divide-gray-100 rounded-md border border-gray-200">
                  <TaxDetailRow
                    key={"title"}
                    label="Bracket"
                    value="Tax"
                    isHeader
                  />
                  {byBracket.map((bracket) => {
                    const formattedBracket = bracketToString(bracket.bracket);
                    const formattedTax = numberToCurrency(bracket.taxAmount);
                    return (
                      <TaxDetailRow
                        key={formattedBracket}
                        label={formattedBracket}
                        value={formattedTax}
                      />
                    );
                  })}
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};
