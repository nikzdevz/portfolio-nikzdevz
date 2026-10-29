import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COMPANY, PRODUCTS } from '../constants';
import { SceneSection } from '../components/SceneSection';

const ProductsPage = () => (
  <main id="main-content" className="page">
    <SceneSection className="page-header-scene">
      <header className="page-header">
        <div className="container page-header__inner">
          <span className="mono-label mono-label--accent">Nikhil Kumar Gupta / Founder, KraftStack</span>
          <h1>Work built to move <span>ideas forward.</span></h1>
          <div className="page-header__lower">
            <p className="page-header__lede">
              Nikhil's seven projects, built under {COMPANY.name}, span social cinema, Android building,
              adaptive learning, connected attendance and career tools. Open any project for its full story.
            </p>
            <div className="page-header__aside">
              <span className="mono-label">Seven products</span>
              <span className="mono-label">Five focal builds</span>
              <span className="mono-label">One classified experiment</span>
            </div>
          </div>
        </div>
      </header>
    </SceneSection>
    <section className="container page-section" aria-labelledby="project-index-title">
      <div className="section-heading">
        <div>
          <p className="mono-label mono-label--accent">Archive / Field notes</p>
          <h2 id="project-index-title">The complete index.</h2>
        </div>
        <p>Live releases, research in progress and experiments that stay deliberately quiet.</p>
      </div>
      <div className="project-grid">
        {PRODUCTS.map((product) => (
          <article className="project-card" key={product.id}>
            <div className="project-card__top">
              <span className="product-index__number">{product.index}</span>
              <span className={`status-tag status-tag--${product.status}`}>{product.statusLabel}</span>
            </div>
            <p className="mono-label">{product.kicker}</p>
            <h2>{product.title}</h2>
            <p>{product.tagline}</p>
            <p className="project-card__summary">{product.description}</p>
            <div className="project-card__tags">
              {product.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            <div className="project-card__actions">
              <Link className="text-link" to={`/product/${product.id}`}>
                Project details <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
              {product.link && (
                <a className="text-link" href={product.link} target="_blank" rel="noopener noreferrer">
                  Visit live <ArrowUpRight size={12} aria-hidden="true" />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  </main>
);

export default ProductsPage;
