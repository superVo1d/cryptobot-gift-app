"use client";

import { type PropsWithChildren, useEffect, useRef } from "react";
import { ErrorBoundary } from "../ErrorBoundary";
import { ErrorPage } from "../ErrorPage";
import { useDidMount } from "../../hooks/useDidMount";
import { TelegramApiProvider } from "../../contexts/TelegramApiContext";
import { LangProvider } from "../../contexts/LangContext";

function App(props: PropsWithChildren) {
  return (
    <TelegramApiProvider>
      <LangProvider>{props.children}</LangProvider>
    </TelegramApiProvider>
  );
}

function RootInner({ children }: PropsWithChildren) {
  const debug = process.env.NODE_ENV === "development";

  useEffect(() => {
    if (debug) {
      import("eruda").then((lib) => lib.default.init());
    }
  }, [debug]);

  return <App>{children}</App>;
}

export function Root(props: PropsWithChildren) {
  const didMount = useDidMount();

  return didMount ? (
    <>
      <ErrorBoundary fallback={ErrorPage}>
        <RootInner {...props} />
      </ErrorBoundary>
    </>
  ) : (
    <div className="root__loading">Loading</div>
  );
}
