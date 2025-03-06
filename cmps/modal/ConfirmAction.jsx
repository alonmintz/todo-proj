export function ConfirmAction({ action, onConfirm, onCancel }) {
  return (
    <section className="confirm-action">
      <h4>Are you sure you want to {action}?</h4>
      <div className="btn-group">
        <button onClick={onConfirm}>
          <i className="fa fa-check"></i>
        </button>
        <button onClick={onCancel}>
          <i className="fa-solid fa-x"></i>
        </button>
      </div>
    </section>
  );
}
