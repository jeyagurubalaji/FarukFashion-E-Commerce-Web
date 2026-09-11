import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FiShoppingBag, FiUser, FiMenu, FiX, FiSearch, FiLogOut } from 'react-icons/fi';
import './Navbar.css';

const categories = [
  { label: 'Handbags', value: 'HANDBAGS' },
  { label: 'Trolley Bags', value: 'TROLLEY_BAGS' },
  { label: 'School Bags', value: 'SCHOOL_BAGS' },
  { label: 'College Bags', value: 'COLLEGE_BAGS' },
  { label: 'Kids Bags', value: 'KIDS_BAGS' },
  { label: 'Office Bags', value: 'OFFICE_BAGS' },
  { label: 'Sling Bags', value: 'SLING_BAGS' }
];

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?q=${encodeURIComponent(search.trim())}`);
      setSearch('');
      setMenuOpen(false);
    }
  };

  const displayName = user?.fullName || user?.firstName || user?.email || 'Profile';

  return (
    <header className="navbar">
      <div className="navbar-top">
        <div className="container navbar-top-inner">
          <span className="navbar-bismillah">IN THE NAME OF ALLAH</span>
          <a href="https://wa.me/919344282751" target="_blank" rel="noreferrer" className="navbar-whatsapp">
            WhatsApp: +91 93442 82751
          </a>
        </div>
      </div>

      <div className="navbar-main">
        <div className="container navbar-main-inner">
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
            <div className="logo-mark">FF</div>
            <div className="logo-text">
              <span className="logo-name">FARUK FASHION</span>
              <span className="logo-tag">Style That Speaks</span>
            </div>
          </Link>

          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search bags, trolleys..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit"><FiSearch size={18} /></button>
          </form>

          <div className="navbar-actions">
            <Link to="/cart" className="nav-icon" title="Cart">
              <FiShoppingBag size={22} />
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </Link>

            {isAuthenticated && (
              <div className="user-menu" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {(user?.role === 'ADMIN' || (Array.isArray(user?.roles) && user.roles.includes('ADMIN'))) && (
                  <Link to="/admin" className="btn btn-outline nav-login" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>
                    Admin
                  </Link>
                )}
                <Link
                  to="/profile"
                  className="nav-profile"
                  title="My Profile"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: 'var(--gold)',
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    maxWidth: 140
                  }}
                >
                  <FiUser size={20} />
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {displayName}
                  </span>
                </Link>
                <button type="button" className="nav-icon" onClick={logout} title="Logout">
                  <FiLogOut size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <nav className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <div className="container">
          <NavLink to="/" end onClick={() => setMenuOpen(false)}>Home</NavLink>
          {categories.map((c) => (
            <NavLink
              key={c.value}
              to={`/products/category/${c.value}`}
              onClick={() => setMenuOpen(false)}
            >
              {c.label}
            </NavLink>
          ))}
          <NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink>
          <NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>
          {isAuthenticated && (
            <NavLink to="/orders" onClick={() => setMenuOpen(false)}>My Orders</NavLink>
          )}
          {isAuthenticated && (user?.role === 'ADMIN' || (Array.isArray(user?.roles) && user.roles.includes('ADMIN'))) && (
            <NavLink to="/admin" onClick={() => setMenuOpen(false)}>Admin Panel</NavLink>
          )}
        </div>
      </nav>
    </header>
  );
}