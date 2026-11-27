import { useEffect, useRef, type PropsWithChildren, type ReactNode } from "react";

export function Sheet({
  title,
  description,
  onClose,
  children,
  footer,
  className,
  closeLabel = "Close",
}: PropsWithChildren<{
  title: string;
  description?: string;
  onClose: () => void;
  footer?: ReactNode;
  className?: string;
  closeLabel?: string;
}>) {
  const panelRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCloseRef.current();
    };

    document.addEventListener("keydown", onKeyDown);
    panelRef.current?.focus();

    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="ui-sheet-layer" role="presentation">
      <button
        aria-label={closeLabel}
        className="ui-sheet-backdrop"
        onClick={onClose}
        tabIndex={-1}
        type="button"
      />
      <div
        aria-describedby={description ? "ui-sheet-description" : undefined}
        aria-labelledby="ui-sheet-title"
        aria-modal="true"
        className={className ? "ui-sheet " + className : "ui-sheet"}
        ref={panelRef}
        role="dialog"
        tabIndex={-1}
      >
        <span aria-hidden="true" className="ui-sheet__handle" />
        <header className="ui-sheet__header">
          <div>
            <h2 id="ui-sheet-title">{title}</h2>
            {description ? (
              <p id="ui-sheet-description">{description}</p>
            ) : null}
          </div>
          <button
            aria-label={closeLabel}
            className="ui-sheet__close"
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </header>
        <div className="ui-sheet__body">{children}</div>
        {footer ? <footer className="ui-sheet__footer">{footer}</footer> : null}
      </div>
    </div>
  );
}

