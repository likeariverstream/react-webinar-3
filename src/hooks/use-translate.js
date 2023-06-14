import { useCallback, useEffect, useMemo, useState } from "react";
import useServices from "./use-services";
import shallowEqual from "shallowequal";

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */

export default function useTranslate() {
  const {i18n} = useServices();
  const [lang, setLang] = useState(i18n.lang);
  const t = useCallback((text, number) => i18n.t(text, number), [lang]);
  const unsubscribe = useMemo(() => {
    return i18n.subscribe(() => {
      const newState = i18n.lang;
      setLang(prevState => shallowEqual(prevState, newState) ? prevState : newState);
    });
  }, []); 

  useEffect(() => {
    i18n.setLang(lang);
  }, [lang]);

  useEffect(() => unsubscribe, [unsubscribe]);

  return {t, lang, setLang};
}
