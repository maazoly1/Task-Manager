"use client";

import { ReactNode } from "react";
import { IntlProvider, MessageFormatElement } from "react-intl";

interface IntlProviderProps {
  children: ReactNode;
  messages: Record<string, MessageFormatElement[]> | Record<string, string>;
  lang: string;
}

function NextIntlProvider({ children, messages, lang }: IntlProviderProps) {
  return (
    <IntlProvider locale={lang} messages={messages}>
      {children}
    </IntlProvider>
  );
}
export default NextIntlProvider;
