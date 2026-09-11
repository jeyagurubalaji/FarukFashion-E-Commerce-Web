import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { productAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import { FiShoppingBag, FiMinus, FiPlus } from 'react-icons/fi';
import { mediaUrl } from '../utils/mediaUrl';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    productAPI.getById(id)
      .then((res) => {
        setProduct(res.data);
        if (res.data.colors?.length) setColor(res.data.colors[0]);
        if (res.data.sizes?.length) setSize(res.data.sizes[0]);
      })
      .catch(() => toast.error('Product not found'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="loader" />;
  if (!product) return <p style={{ textAlign: 'center', padding: '4rem' }}>Product not found</p>;

  const price = product.discountPrice || product.price;

  const handleAdd = () => {
    if (!product.inStock) return toast.error('Out of stock');
    addToCart(product, qty, color, size);
    toast.success('Added to cart');
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1.25rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
        <div style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid var(--border)' }}>
          {product.mainImage ? (
            <img src={mediaUrl(product.mainImage)} alt={product.name} style={{ width: '100%', aspectRatio: '1', objectFit: 'cover' }} />
          ) : (
            <div style={{ aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', color: 'var(--gold-dark)', fontFamily: 'var(--font-display)' }}>
              FF
            </div>
          )}
        </div>

        <div>
          <span style={{ color: 'var(--gold)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {product.category?.replace(/_/g, ' ')}
          </span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', margin: '0.5rem 0 1rem', color: 'var(--cream)' }}>
            {product.name}
          </h1>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'baseline', marginBottom: '1.25rem' }}>
            <span style={{ fontSize: '1.75rem', fontWeight: 600, color: 'var(--gold)' }}>
              ₹{Number(price).toLocaleString('en-IN')}
            </span>
            {product.discountPrice && (
              <span style={{ textDecoration: 'line-through', color: 'var(--text-muted)' }}>
                ₹{Number(product.price).toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.7 }}>
            {product.description || product.shortDescription}
          </p>

          {product.colors?.length > 0 && (
            <div className="form-group">
              <label>Color</label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`btn ${color === c ? 'btn-primary' : 'btn-outline'}`}
                    style={{ padding: '0.4rem 0.9rem', fontSize: '0.8rem' }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.sizes?.length > 0 && (
            <div className="form-group">
              <label>Size</label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`btn ${size === s ? 'btn-primary' : 'btn-outline'}`}
                    style={{ padding: '0.4rem 0.9rem', fontSize: '0.8rem' }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="form-group">
            <label>Quantity</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button className="btn btn-outline" style={{ padding: '0.5rem' }} onClick={() => setQty((q) => Math.max(1, q - 1))}>
                <FiMinus />
              </button>
              <span style={{ minWidth: 30, textAlign: 'center' }}>{qty}</span>
              <button className="btn btn-outline" style={{ padding: '0.5rem' }} onClick={() => setQty((q) => Math.min(product.stockQuantity || 10, q + 1))}>
                <FiPlus />
              </button>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                {product.inStock ? `${product.stockQuantity} in stock` : 'Out of stock'}
              </span>
            </div>
          </div>

          <button
            className="btn btn-primary"
            style={{ width: '100%', padding: '1rem', marginTop: '1rem' }}
            onClick={handleAdd}
            disabled={!product.inStock}
          >
            <FiShoppingBag /> Add to Cart
          </button>

          {product.specifications && (
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', marginBottom: '0.75rem' }}>Specifications</h3>
              <table style={{ width: '100%', fontSize: '0.9rem' }}>
                <tbody>
                  {Object.entries(product.specifications).map(([k, v]) => (
                    <tr key={k} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '0.5rem 0', color: 'var(--text-muted)', width: '40%' }}>{k}</td>
                      <td style={{ padding: '0.5rem 0', color: 'var(--text-secondary)' }}>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .container > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
