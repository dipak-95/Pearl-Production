import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:9999/api';

const AdminDashboard = () => {
  const navigate  = useNavigate();
  const adminName = localStorage.getItem('pearl_admin_name') || 'Admin';

  const [activeTab, setActiveTab]   = useState('overview');
  const [stats, setStats]           = useState({ total: 0, confirmed: 0, pending: 0, revenue: 0 });
  const [inquiries, setInquiries]   = useState([]);
  const [hireInquiries, setHireInquiries] = useState([]);
  const [hireStats, setHireStats]   = useState({ total: 0, pending: 0, confirmed: 0, revenue: 0 });
  const [loading, setLoading]       = useState(true);
  const [filterStatus, setFilterStatus]     = useState('all');
  const [hireFilter, setHireFilter]         = useState('all');

  // Confirm modal — shared for both inquiry types
  const [confirmModal, setConfirmModal] = useState(null); // { id, name, type }
  const [amount, setAmount]             = useState('');
  const [modalLoading, setModalLoading] = useState(false);

  // Auth check
  useEffect(() => {
    const token = localStorage.getItem('pearl_admin_token');
    if (!token) { navigate('/login'); return; }
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [statsRes, inqRes, hireRes, hireStatsRes] = await Promise.all([
        fetch(`${API}/inquiries/stats`),
        fetch(`${API}/inquiries`),
        fetch(`${API}/hire`),
        fetch(`${API}/hire/stats`),
      ]);
      const sData  = await statsRes.json();
      const iData  = await inqRes.json();
      const hData  = await hireRes.json();
      const hsData = await hireStatsRes.json();
      if (sData.success)  setStats(sData.stats);
      if (iData.success)  setInquiries(iData.inquiries);
      if (hData.success)  setHireInquiries(hData.inquiries);
      if (hsData.success) setHireStats(hsData.stats);
    } catch { console.error('API unreachable'); }
    setLoading(false);
  };

  const handleConfirm = async () => {
    if (!amount || isNaN(amount)) return;
    setModalLoading(true);
    const endpoint = confirmModal.type === 'hire'
      ? `${API}/hire/${confirmModal.id}/confirm`
      : `${API}/inquiries/${confirmModal.id}/confirm`;
    try {
      const res  = await fetch(endpoint, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Number(amount) }),
      });
      const data = await res.json();
      if (data.success) { setConfirmModal(null); setAmount(''); fetchAll(); }
    } catch { console.error('Confirm failed'); }
    setModalLoading(false);
  };

  const handleDelete = async (id, type = 'inquiry') => {
    if (!window.confirm('Delete this permanently?')) return;
    const url = type === 'hire' ? `${API}/hire/${id}` : `${API}/inquiries/${id}`;
    try { await fetch(url, { method: 'DELETE' }); fetchAll(); }
    catch { console.error('Delete failed'); }
  };

  const handleReject = async (id) => {
    try {
      await fetch(`${API}/hire/${id}/reject`, { method: 'PATCH' });
      fetchAll();
    } catch { console.error('Reject failed'); }
  };

  const handleLogout = () => {
    localStorage.removeItem('pearl_admin_token');
    localStorage.removeItem('pearl_admin_name');
    navigate('/login');
  };

  const totalRevenue  = stats.revenue + hireStats.revenue;
  const filteredInq   = filterStatus === 'all' ? inquiries : inquiries.filter(i => i.status === filterStatus);
  const filteredHire  = hireFilter === 'all' ? hireInquiries : hireInquiries.filter(h => h.status === hireFilter);

  const statCards = [
    { label: 'Total Revenue',     value: `₹${totalRevenue.toLocaleString('en-IN')}`, icon: '💰', color: '#C9922A', desc: 'Project + Hire revenue' },
    { label: 'Total Inquiries',   value: stats.total,      icon: '📨', color: '#6366f1', desc: 'All project inquiries' },
    { label: 'Hire Requests',     value: hireStats.total,  icon: '👥', color: '#22c55e', desc: 'Developer hire requests' },
    { label: 'Pending Review',    value: stats.pending + hireStats.pending, icon: '⏳', color: '#f59e0b', desc: 'Awaiting your action' },
  ];

  return (
    <div className="admin-layout">
      {/* ── Sidebar ── */}
      <aside className="admin-sidebar">
        <div className="sidebar-logo">
          <img src="/logo.png" alt="Pearl Production" className="sb-logo" />
        </div>

        <nav className="sidebar-nav">
          <button className={`sb-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
            <span className="sb-icon">📊</span> Overview
          </button>
          <button className={`sb-item ${activeTab === 'inquiries' ? 'active' : ''}`} onClick={() => setActiveTab('inquiries')}>
            <span className="sb-icon">📨</span> Inquiries
            {stats.pending > 0 && <span className="sb-badge">{stats.pending}</span>}
          </button>
          <button className={`sb-item ${activeTab === 'hire' ? 'active' : ''}`} onClick={() => setActiveTab('hire')}>
            <span className="sb-icon">👥</span> Hire Requests
            {hireStats.pending > 0 && <span className="sb-badge sb-badge-green">{hireStats.pending}</span>}
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="admin-avatar">{adminName.charAt(0)}</div>
          <div className="admin-info">
            <p className="admin-name">{adminName}</p>
            <p className="admin-role">Administrator</p>
          </div>
          <button className="logout-btn" onClick={handleLogout} title="Logout">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
            </svg>
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="admin-main">
        <header className="admin-header">
          <div>
            <h1 className="admin-page-title">
              {activeTab === 'overview' ? '📊 Business Overview' : activeTab === 'inquiries' ? '📨 Inquiries' : '👥 Hire Requests'}
            </h1>
            <p className="admin-page-sub">
              {activeTab === 'overview' ? 'Live stats from your inquiry pipeline'
                : activeTab === 'inquiries' ? 'Manage and confirm client project inquiries'
                : 'Developer hire requests from potential clients'}
            </p>
          </div>
          <button className="btn btn-outline refresh-btn" onClick={fetchAll}>🔄 Refresh</button>
        </header>

        {loading ? (
          <div className="admin-loading">
            <div className="loading-spinner" />
            <p>Loading data…</p>
          </div>
        ) : (
          <>
            {/* ── Overview ── */}
            {activeTab === 'overview' && (
              <div>
                <div className="stat-cards-grid">
                  {statCards.map((s) => (
                    <div className="stat-card" key={s.label} style={{ '--accent': s.color }}>
                      <div className="stat-card-icon">{s.icon}</div>
                      <div className="stat-card-body">
                        <p className="stat-card-label">{s.label}</p>
                        <p className="stat-card-value">{s.value}</p>
                        <p className="stat-card-desc">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recent Project Inquiries */}
                <div className="recent-section" style={{ marginBottom: 24 }}>
                  <h3 className="section-sm-title">Recent Project Inquiries</h3>
                  <div className="mini-table">
                    {inquiries.slice(0, 4).map(inq => (
                      <div className="mini-row" key={inq._id}>
                        <div className="mini-avatar">{inq.name.charAt(0)}</div>
                        <div className="mini-info">
                          <p className="mini-name">{inq.name}</p>
                          <p className="mini-service">{inq.service}</p>
                        </div>
                        <span className={`status-badge ${inq.status}`}>{inq.status}</span>
                        {inq.status === 'confirmed' && <span className="mini-amt">₹{inq.amount.toLocaleString('en-IN')}</span>}
                      </div>
                    ))}
                    {inquiries.length === 0 && <p className="empty-msg">No project inquiries yet.</p>}
                  </div>
                  <button className="btn btn-outline see-all-btn" onClick={() => setActiveTab('inquiries')}>See All →</button>
                </div>

                {/* Recent Hire Requests */}
                <div className="recent-section">
                  <h3 className="section-sm-title">Recent Hire Requests</h3>
                  <div className="mini-table">
                    {hireInquiries.slice(0, 4).map(h => (
                      <div className="mini-row" key={h._id}>
                        <div className="mini-avatar" style={{ background: 'rgba(34,197,94,0.12)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.2)' }}>{h.clientName.charAt(0)}</div>
                        <div className="mini-info">
                          <p className="mini-name">{h.clientName}</p>
                          <p className="mini-service">{h.developerName} · {h.developerRole}</p>
                        </div>
                        <span className={`status-badge ${h.status}`}>{h.status}</span>
                        {h.status === 'confirmed' && <span className="mini-amt">₹{h.amount.toLocaleString('en-IN')}</span>}
                      </div>
                    ))}
                    {hireInquiries.length === 0 && <p className="empty-msg">No hire requests yet.</p>}
                  </div>
                  <button className="btn btn-outline see-all-btn" onClick={() => setActiveTab('hire')}>See All →</button>
                </div>
              </div>
            )}

            {/* ── Project Inquiries Tab ── */}
            {activeTab === 'inquiries' && (
              <div>
                <div className="filter-row">
                  {['all', 'pending', 'confirmed'].map(f => (
                    <button key={f} className={`filter-btn ${filterStatus === f ? 'active' : ''}`} onClick={() => setFilterStatus(f)}>
                      {f.charAt(0).toUpperCase() + f.slice(1)}
                      {f === 'pending' && stats.pending > 0 && <span className="filter-count">{stats.pending}</span>}
                    </button>
                  ))}
                </div>
                <div className="inquiry-cards">
                  {filteredInq.length === 0 && <div className="empty-state">No {filterStatus} inquiries found.</div>}
                  {filteredInq.map(inq => (
                    <div className={`inquiry-card ${inq.status}`} key={inq._id}>
                      <div className="inq-header">
                        <div className="inq-avatar">{inq.name.charAt(0)}</div>
                        <div className="inq-person">
                          <h4>{inq.name}</h4>
                          <p>{inq.email} · {inq.phone}</p>
                        </div>
                        <span className={`status-badge ${inq.status}`}>{inq.status}</span>
                      </div>
                      <div className="inq-body">
                        <div className="inq-service-tag">{inq.service}</div>
                        <p className="inq-message">{inq.message}</p>
                      </div>
                      <div className="inq-footer">
                        <span className="inq-date">{new Date(inq.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                        {inq.status === 'confirmed' && <span className="inq-revenue-tag">💰 ₹{inq.amount.toLocaleString('en-IN')}</span>}
                        <div className="inq-actions">
                          {inq.status === 'pending' && (
                            <button className="action-btn confirm-btn" onClick={() => setConfirmModal({ id: inq._id, name: inq.name, type: 'inquiry' })}>✅ Confirm</button>
                          )}
                          <button className="action-btn delete-btn" onClick={() => handleDelete(inq._id, 'inquiry')}>🗑️ Delete</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Hire Requests Tab ── */}
            {activeTab === 'hire' && (
              <div>
                <div className="filter-row">
                  {['all', 'pending', 'confirmed', 'rejected'].map(f => (
                    <button key={f} className={`filter-btn ${hireFilter === f ? 'active' : ''}`} onClick={() => setHireFilter(f)}>
                      {f.charAt(0).toUpperCase() + f.slice(1)}
                      {f === 'pending' && hireStats.pending > 0 && <span className="filter-count">{hireStats.pending}</span>}
                    </button>
                  ))}
                </div>
                <div className="inquiry-cards">
                  {filteredHire.length === 0 && <div className="empty-state">No {hireFilter} hire requests found.</div>}
                  {filteredHire.map(h => (
                    <div className={`inquiry-card hire-card ${h.status}`} key={h._id}>
                      <div className="inq-header">
                        <div className="inq-avatar" style={{ background: 'rgba(34,197,94,0.1)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.2)' }}>
                          {h.clientName.charAt(0)}
                        </div>
                        <div className="inq-person">
                          <h4>{h.clientName}</h4>
                          <p>{h.clientEmail} · {h.clientPhone}</p>
                        </div>
                        <span className={`status-badge ${h.status}`}>{h.status}</span>
                      </div>

                      {/* Developer being hired */}
                      <div className="hire-dev-info">
                        <span className="hire-dev-label">👤 Developer:</span>
                        <span className="hire-dev-name">{h.developerName}</span>
                        <span className="hire-dev-role">{h.developerRole}</span>
                        <span className="hire-dev-rate">${h.hourlyRate}/hr</span>
                        {h.estimatedHours > 0 && (
                          <span className="hire-est">~{h.estimatedHours}h · Est. ${(h.hourlyRate * h.estimatedHours).toLocaleString()}</span>
                        )}
                      </div>

                      <div className="inq-body">
                        <p className="inq-message">{h.projectDesc}</p>
                      </div>

                      <div className="inq-footer">
                        <span className="inq-date">{new Date(h.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                        {h.status === 'confirmed' && <span className="inq-revenue-tag">💰 ₹{h.amount.toLocaleString('en-IN')}</span>}
                        <div className="inq-actions">
                          {h.status === 'pending' && (
                            <>
                              <button className="action-btn confirm-btn" onClick={() => setConfirmModal({ id: h._id, name: h.clientName, type: 'hire' })}>✅ Confirm</button>
                              <button className="action-btn reject-btn" onClick={() => handleReject(h._id)}>❌ Reject</button>
                            </>
                          )}
                          <button className="action-btn delete-btn" onClick={() => handleDelete(h._id, 'hire')}>🗑️ Delete</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* ── Confirm Modal ── */}
      {confirmModal && (
        <div className="modal-overlay" onClick={() => setConfirmModal(null)}>
          <div className="modal-box glass-card" onClick={e => e.stopPropagation()}>
            <h3 className="modal-title">Confirm {confirmModal.type === 'hire' ? 'Hire' : 'Project'}</h3>
            <p className="modal-sub">
              Confirming request from <strong>{confirmModal.name}</strong>.<br/>
              Enter the agreed amount:
            </p>
            <div className="modal-input-wrap">
              <span className="modal-currency">₹</span>
              <input type="number" placeholder="e.g. 25000" value={amount}
                onChange={e => setAmount(e.target.value)} className="modal-input" autoFocus />
            </div>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={() => setConfirmModal(null)}>Cancel</button>
              <button className={`btn btn-gold ${modalLoading ? 'loading' : ''}`} onClick={handleConfirm}
                disabled={modalLoading || !amount}>
                {modalLoading ? 'Saving…' : 'Confirm & Add Revenue'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
