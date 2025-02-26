export function ConfirmAction({ action, onConfirm, onCancel }) {
  return (
    <section className="confirm-action">
      <h4>Are you sure you want to {action}?</h4>
      <button onClick={onConfirm}>Confirm</button>
      <button onClick={onCancel}>Cancel</button>
    </section>
  );
}
