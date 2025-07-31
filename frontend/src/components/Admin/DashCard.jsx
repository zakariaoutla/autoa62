export default function DaschCard({ totalVehicles, changeAmount, timeFrame, icon,title }) {

    const isPositive = changeAmount >= 0;
    const changeText = `${isPositive ? '+' : ''}${changeAmount} ${timeFrame}`;
    const changeClass = isPositive ? 'text-success' : 'text-danger';
    return (
        <>

            <div className="card card-dash  text-white p-4 " style={{ width: '18rem'}}>
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <p className="mb-1">{title}</p>
                        <h3 style={{ fontWeight:"700"}}>{totalVehicles}</h3>
                        <p  className={`mb-0 ${changeClass}`}>{changeText} </p>
                        <span className="" style={{fontSize:"13px", color: "#afadadff"}}>from last month</span>
                    </div>
                    <div className="icon-circle d-flex justify-content-center align-items-center" >
                        {icon}
                    </div>
                </div>
            </div>

        </>
    )
}