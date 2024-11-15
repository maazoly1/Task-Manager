import { useIntl as ReactIntl } from "react-intl";

function useIntl() {
  const intl = ReactIntl();
  return intl;
}

export default useIntl;
