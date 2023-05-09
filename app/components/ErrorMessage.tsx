type Props = {
  error: string;
  id?: string;
};

export const ErrorMessage = ({ error, ...rest }: Props) => {
  return (
    <span {...rest} role="alert" className="text-md  italic text-red-500">
      {error}
    </span>
  );
};
