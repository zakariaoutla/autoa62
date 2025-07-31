export default function StatusCard({ title, count, description, status,mode }) {
  return (
    <>
      <div className="card card-dash text-center text-light">
          <div className="card-body">
            <h5 className="card-title text-light">{title}</h5>
            <h2 className={`status-${mode === 'table' ? 'table' : 'card'} status-${status?.toLowerCase()}`}>{count}</h2>
            <small className="card-text">{description}</small>
            
          </div>
</div>
    </>
  );
}