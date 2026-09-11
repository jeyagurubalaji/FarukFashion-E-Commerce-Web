import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const categories = ['HANDBAGS', 'TROLLEY_BAGS', 'SCHOOL_BAGS', 'COLLEGE_BAGS', 'KIDS_BAGS', 'OFFICE_BAGS', 'SLING_BAGS'];

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    address: user?.address || '',
    city: user?.city || '',
    state: user?.state || '',
    pincode: user?.pincode || '',
    preferredCategories: user?.preferredCategories || [],
    preferredStyle: user?.preferredStyle || ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const toggleCategory = (cat) => {
    setForm((f) => ({
      ...f,
      preferredCategories: f.preferredCategories.includes(cat)
        ? f.preferredCategories.filter((c) => c !== cat)
        : [...f.preferredCategories, cat]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(form);
      toast.success('Profile updated');
    } catch {
      toast.error('Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: 560, padding: '2.5rem 1.25rem' }}>
      <h1 className="section-title">My Profile</h1>
      <div className="gold-divider" />

      <form onSubmit={handleSubmit} style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem', fontSize: '0.9rem' }}>
          {user?.email} · {user?.phone}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label>First Name</label>
            <input className="form-control" name="firstName" value={form.firstName} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input className="form-control" name="lastName" value={form.lastName} onChange={handleChange} />
          </div>
        </div>
        <div className="form-group">
          <label>Address</label>
          <input className="form-control" name="address" value={form.address} onChange={handleChange} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
          <div className="form-group">
            <label>City</label>
            <input className="form-control" name="city" value={form.city} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>State</label>
            <input className="form-control" name="state" value={form.state} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Pincode</label>
            <input className="form-control" name="pincode" value={form.pincode} onChange={handleChange} />
          </div>
        </div>
        <div className="form-group">
          <label>Preferred Categories (for product suggestions)</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => toggleCategory(c)}
                className={`btn ${form.preferredCategories.includes(c) ? 'btn-primary' : 'btn-outline'}`}
                style={{ padding: '0.35rem 0.7rem', fontSize: '0.75rem' }}
              >
                {c.replace(/_/g, ' ')}
              </button>
            ))}
          </div>
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
          {loading ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </div>
  );
}
