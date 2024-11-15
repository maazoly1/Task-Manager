import useIntl from "@/app/hooks/useIntl";
import { Props } from "react-intl/src/components/message";

const FormattedMessage = ({
  id,
  defaultMessage,
  description,
  values,
}: Props) => {
  const intl = useIntl();
  return intl.formatMessage(
    {
      id,
      defaultMessage,
      description,
    },
    values
  );
};

export default FormattedMessage;
