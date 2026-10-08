import AdminLayout from "../../components/admin/AdminLayout";
import "./css/Dashboard.css";

function Dashboard() {
    const sales = [
        { month: "Jan", value1: 18, value2: 12 },
        { month: "Feb", value1: 16, value2: 11 },
        { month: "Mar", value1: 5, value2: 4 },
        { month: "Apr", value1: 8, value2: 6 },
        { month: "May", value1: 3, value2: 2 },
        { month: "Jun", value1: 14, value2: 9 },
        { month: "Jul", value1: 14, value2: 9 },
        { month: "Aug", value1: 16, value2: 10 },
        { month: "Sep", value1: 17, value2: 11 },
        { month: "Oct", value1: 19, value2: 12 },
        { month: "Nov", value1: 18, value2: 13 },
        { month: "Dec", value1: 20, value2: 13 }
    ];

    return (
        <AdminLayout
            // title="Dashboard"
            // subtitle="Welcome back to your admin panel"
        >

            <div className="dashboard-page">

                {/* =========================
                    STAT CARDS
                ========================= */}

                <div className="dashboard-stats">

                    <div className="stat-card">
                        <div className="stat-content">
                            <span className="stat-label">
                                BUDGET
                            </span>

                            <h2>$24K</h2>

                            <div className="stat-growth positive">
                                ↑ 12%
                                <span>Since last month</span>
                            </div>
                        </div>

                        <div className="stat-icon red">
                            $
                        </div>
                    </div>


                    <div className="stat-card">
                        <div className="stat-content">
                            <span className="stat-label">
                                TOTAL CUSTOMERS
                            </span>

                            <h2>1.6K</h2>

                            <div className="stat-growth negative">
                                ↓ 16%
                                <span>Since last month</span>
                            </div>
                        </div>

                        <div className="stat-icon green">
                            👥
                        </div>
                    </div>


                    <div className="stat-card">
                        <div className="stat-content">
                            <span className="stat-label">
                                TASK PROGRESS
                            </span>

                            <h2>75.5%</h2>

                            <div className="progress-bar">
                                <div></div>
                            </div>
                        </div>

                        <div className="stat-icon orange">
                            ☷
                        </div>
                    </div>


                    <div className="stat-card">
                        <div className="stat-content">
                            <span className="stat-label">
                                TOTAL PROFIT
                            </span>

                            <h2>$15K</h2>
                        </div>

                        <div className="stat-icon purple">
                            $
                        </div>
                    </div>

                </div>


                {/* =========================
                    CHART SECTION
                ========================= */}

                <div className="dashboard-charts">

                    {/* SALES */}
                    <div className="chart-card sales-card">

                        <div className="chart-header">
                            <h3>Sales</h3>

                            <button className="sync-btn">
                                ⟳ &nbsp; Sync
                            </button>
                        </div>

                        <div className="sales-chart">

                            <div className="chart-y-axis">
                                <span>20K</span>
                                <span>15K</span>
                                <span>10K</span>
                                <span>5K</span>
                                <span>0</span>
                            </div>

                            <div className="chart-area">

                                <div className="chart-grid">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>

                                <div className="bars">

                                    {sales.map((item) => (

                                        <div
                                            className="bar-group"
                                            key={item.month}
                                        >

                                            <div className="bars-wrapper">

                                                <div
                                                    className="bar bar-primary"
                                                    style={{
                                                        height: `${item.value1 * 10}px`
                                                    }}
                                                ></div>

                                                <div
                                                    className="bar bar-secondary"
                                                    style={{
                                                        height: `${item.value2 * 10}px`
                                                    }}
                                                ></div>

                                            </div>

                                            <span className="month">
                                                {item.month}
                                            </span>

                                        </div>

                                    ))}

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* TRAFFIC SOURCE */}
                    <div className="chart-card traffic-card">

                        <h3>Traffic Source</h3>

                        <div className="donut-wrapper">

                            <div className="donut-chart">
                                <div className="donut-center"></div>
                            </div>

                        </div>


                        <div className="traffic-items">

                            <div className="traffic-item">
                                <div className="traffic-icon">
                                    🖥️
                                </div>

                                <strong>Desktop</strong>
                                <span>63%</span>
                            </div>


                            <div className="traffic-item">
                                <div className="traffic-icon">
                                    📱
                                </div>

                                <strong>Tablet</strong>
                                <span>15%</span>
                            </div>


                            <div className="traffic-item">
                                <div className="traffic-icon">
                                    📞
                                </div>

                                <strong>Phone</strong>
                                <span>22%</span>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </AdminLayout>
    );
}

export default Dashboard;