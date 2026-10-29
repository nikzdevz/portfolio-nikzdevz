import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../types';
import { ProductScene } from './ProductScene';

const ProductActions = ({ product }: { product: Project }) => (
  <div className="product-stage__actions">
    <Link className="button" to={`/product/${product.id}`}>
      View project <ArrowUpRight size={14} aria-hidden="true" />
    </Link>
    {product.link && (
      <a className="text-link" href={product.link} target="_blank" rel="noopener noreferrer">
        Open live product <ArrowUpRight size={13} aria-hidden="true" />
      </a>
    )}
  </div>
);

interface ProductStageProps {
  product: Project;
}

type KeyedProductStageProps = ProductStageProps & { key?: string };

export const ProductStage = ({ product }: KeyedProductStageProps) => (
  <article className="product-stage" id={product.id} aria-labelledby={`product-${product.id}-title`}>
    <div className="product-stage__copy">
      <div className="product-stage__meta">
        <span className="product-stage__index">{product.index}</span>
        <span className={`status-tag status-tag--${product.status}`}>{product.statusLabel}</span>
      </div>
      <p className="mono-label">{product.kicker}</p>
      <h3 className="product-stage__title" id={`product-${product.id}-title`}>{product.title}</h3>
      <p className="product-stage__tagline">{product.tagline}</p>
      <p className="product-stage__description">{product.description}</p>
      <ul className="product-stage__features">
        {product.features.slice(0, 3).map((feature) => <li key={feature}>{feature}</li>)}
      </ul>
      <ul className="product-stage__tags" aria-label="Product domains">
        {product.tags.map((tag) => <li key={tag}>{tag}</li>)}
      </ul>
      <ProductActions product={product} />
    </div>
    <div className="product-stage__visual" aria-hidden="true">
      <ProductScene scene={product.scene} caption={`${product.index} / ${product.kicker}`} />
    </div>
  </article>
);

export const ProductIndex = ({ products }: { products: Project[] }) => (
  <div className="product-index">
    {products.map((product) => (
      <div className="product-index__item" key={product.id}>
        <span className="product-index__number">{product.index}</span>
        <Link className="product-index__title" to={`/product/${product.id}`}>{product.title}</Link>
        <p className="product-index__summary">{product.description}</p>
        <div className="product-index__meta">
          <span className={`status-tag status-tag--${product.status}`}>{product.statusLabel}</span>
          <Link className="text-link" to={`/product/${product.id}`}>Explore <ArrowUpRight size={12} aria-hidden="true" /></Link>
        </div>
      </div>
    ))}
  </div>
);



