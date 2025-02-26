export function ModalFrame({ onClose, children }) {
  function evStop(ev) {
    ev.stopPropagation();
  }

  return (
    <section className="modal-backdrop" onClick={onClose}>
      <section className="modal-content" onClick={evStop}>
        {children}
      </section>
    </section>
  );
}
