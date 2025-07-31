
export default function FeatureCard({ icon, title, description, list, color }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 border-0 shadow-sm rounded-4 p-4">
        <div className={`icon mb-3 text-${color}`}>{icon}</div>
        <h5 className={`fw-bold text-${color}`}>{title}</h5>
        <p className="text-muted">{description}</p>
        <ul className="list-unstyled mt-2">
          {list.map((item, index) => (
            <li key={index} className={`mb-2 d-flex align-items-start text-${color}`}>
              <span className={`dot bg-${color} mt-2 me-2`}></span>
              <span className="text-muted">{item}</span>
            </li>
          ))}
        </ul>
      </div>
      
    </div>
  );
}
