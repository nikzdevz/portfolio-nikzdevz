import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { ProductScene } from '../components/ProductScene';
import { SceneSection } from '../components/SceneSection';

const ProductDetails = () => {
  const { id } = useParams();
  const index = PRODUCTS.findIndex((candidate) => candidate.id === id);
  const product = index >= 0 ? PRODUCTS[index] : undefined;

  if (!product) {
    return (
      <main id="main-content" className="page">
        <div className="container not-found">
          <span className="mono-label mono-label--accent">404 / Project not found</span>
          <h1>That build is not in this index.</h1>
          <p>Explore the released products, active research and classified work in the KraftStack collection.</p>
          <Link className="button button--primary" to="/projects">Browse every product</Link>
        </div>
      </main>
    );
  }

  const next = PRODUCTS[(index + 1) % PRODUCTS.length];

  return (
    <main id="main-content" className="page">
      <article className="container product-detail">
        <Link className="product-detail__back" to="/projects">
          <ArrowLeft size={15} aria-hidden="true" /> Back to product index
        </Link>
        <SceneSection>
          <header className="product-detail__layout">
            <div className="product-detail__copy">
              <div className="product-detail__label-row">
                <span className="product-stage__index">{product.index}</span>
                <span className={`status-tag status-tag--${product.status}`}>{product.statusLabel}</span>
                <span className="mono-label">{product.kicker}</span>
              </div>
              <h1>{product.title}</h1>
              <p className="product-detail__tagline">{product.tagline}</p>
              <p className="product-detail__description">{product.longDescription}</p>
              <ul className="project-card__tags product-detail__tag-list" aria-label="Product domains">
                {product.tags.map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
              <div className="product-detail__cta">
                {product.link && (
                  <a className="button button--primary" href={product.link} target="_blank" rel="noopener noreferrer">
                    Open live product <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                )}
                <Link className="text-link" to="/#contact">Discuss a build <ArrowUpRight size={13} aria-hidden="true" /></Link>
              </div>
            </div>
            <div className="product-detail__visual" aria-hidden="true">
              <ProductScene scene={product.scene} caption={`${product.index} / ${product.kicker}`} />
            </div>
          </header>
        </SceneSection>
        <div className="product-detail__info">
          <div>
            <p className="mono-label mono-label--accent">What it does</p>
            <h2>Built around the real workflow.</h2>
            <p>{product.description}</p>
            <ul className="project-card__tags product-detail__tag-list" aria-label="Product domains">
              {product.tags.map((tag) => <li key={tag}>{tag}</li>)}
            </ul>
          </div>
          <div>
            <p className="mono-label mono-label--accent">Project notes</p>
            <ul className="product-detail__features">
              {product.features.map((feature) => <li key={feature}>{feature}</li>)}
            </ul>
          </div>
        </div>
        <div className="product-detail__next">
          <div>
            <p className="mono-label">Next in the index / {next.index}</p>
            <strong>{next.title}</strong>
          </div>
          <Link className="button" to={`/product/${next.id}`}>
            Continue to project <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </article>
    </main>
  );
};

export default ProductDetails;
