import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { COMPANY, PRODUCTS, TESTIMONIALS, CAPABILITIES } from '../constants';
import { SignalHero } from '../components/SignalHero';
import { ProductStage } from '../components/ProductStage';

const FOCUS = PRODUCTS.filter((product) => product.focus);
const ARCHIVE = PRODUCTS.filter((product) => !product.focus);

const SectionHeading = ({
  index,
  title,
  copy,
  link,
}: {
  index: string;
  title: string;
  copy: string;
  link?: string;
}) => (
  <div className="section-heading">
    <div>
      <p className="mono-label mono-label--accent">{index}</p>
      <h2>{title}</h2>
    </div>
    <div>
      <p>{copy}</p>
      {link && <Link className="text-link" to={link}>Explore the full index <ArrowUpRight size={14} aria-hidden="true" /></Link>}
    </div>
  </div>
);

const Home = () => (
  <main id="main-content">
    <SignalHero />
    <div className="home-marquee" aria-hidden="true">
      <div className="home-marquee__track">
        {[0, 1].map((set) => (
          <span key={set}>
            Our Movies Night · DroidLabZ · Orbit Desk · Stack Labs · BEAN Attendance · Product engineering · Intelligent systems ·
          </span>
        ))}
      </div>
    </div>

    <section className="container page-section" id="studio">
      <SectionHeading
        index="01 / Studio"
        title="A product studio for the real world."
        copy="We move between screens and spaces: social cinema, visual Android tools, presence-aware classrooms and learning environments that respond to the person at the desk."
      />
      <div className="section-intro">
        <h2 className="section-intro__statement">
          Ideas become useful when they meet <em>people where they are.</em>
        </h2>
        <div className="section-intro__copy">
          <p>
            <strong>{COMPANY.name}</strong> builds products across software, connected devices and emerging AI.
            Each project starts with a practical need and ends in an interface people can use.
          </p>
          <p>
            Our current field spans live entertainment, app creation, adaptive learning and institutional attendance.
            One experiment, Stack Labs, remains under wraps for now.
          </p>
          <a className="text-link" href="#contact">Talk to the studio <ArrowUpRight size={14} aria-hidden="true" /></a>
        </div>
      </div>
    </section>

    <section className="container product-showcase" id="products" aria-label="Focal products">
      <SectionHeading
        index="02 / Focal products"
        title="Five things we are building."
        copy="Live products, an active research project and one classified surprise. Scroll through the field to see each idea take shape."
        link="/projects"
      />
      <h2 className="sr-only" id="products-title">Focal products</h2>
      {FOCUS.map((product) => <ProductStage key={product.id} product={product} />)}
    </section>

    <section className="container page-section" id="archive">
      <SectionHeading
        index="03 / Archive"
        title="More from the workshop."
        copy="Two additional products join the KraftStack collection, each built to remove friction from a practical workflow."
      />
      <div className="archive-grid">
        {ARCHIVE.map((product) => (
          <article className="archive-card" key={product.id}>
            <div className="archive-card__meta">
              <span className="product-index__number">{product.index}</span>
              <span className={`status-tag status-tag--${product.status}`}>{product.statusLabel}</span>
            </div>
            <p className="mono-label">{product.kicker}</p>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <div className="product-stage__actions">
              <Link className="text-link" to={`/product/${product.id}`}>Project details <ArrowUpRight size={13} aria-hidden="true" /></Link>
              {product.link && <a className="text-link" href={product.link} target="_blank" rel="noopener noreferrer">Visit product <ArrowUpRight size={13} aria-hidden="true" /></a>}
            </div>
          </article>
        ))}
      </div>
    </section>

    <section className="container page-section" id="capabilities">
      <SectionHeading
        index="04 / Capabilities"
        title="From interface to infrastructure."
        copy="A cross-disciplinary toolkit for products that need to look clear, reason well and hold up in the real world."
      />
      <div className="capability-grid">
        {CAPABILITIES.map((capability) => (
          <article className="capability-card" key={capability.number}>
            <div className="capability-card__top">
              <span className="capability-card__number">{capability.number}</span>
              <ArrowUpRight size={16} color="var(--teal)" aria-hidden="true" />
            </div>
            <h3>{capability.title}</h3>
            <p>{capability.description}</p>
            <ul aria-label={`${capability.title} tools`}>
              {capability.details.map((detail) => <li key={detail}>{detail}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>

    <section className="container page-section" id="testimonials">
      <SectionHeading
        index="05 / Words"
        title="What collaborators say."
        copy="A few words from people who have worked with Nikhil and the studio."
      />
      <div className="testimonial-list">
        {TESTIMONIALS.map((testimonial) => (
          <article className="testimonial-card" key={testimonial.name}>
            <div className="testimonial-card__head">
              <span className="testimonial-card__mark" aria-hidden="true">“</span>
              <span className="mono-label">Collaborator</span>
            </div>
            <blockquote>{testimonial.quote}</blockquote>
            <div className="testimonial-card__person">
              <span className="testimonial-card__avatar" aria-hidden="true">{testimonial.name[0]}</span>
              <div>
                <p className="testimonial-card__name">{testimonial.name}</p>
                <p className="testimonial-card__role">{testimonial.role}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>

    <section className="container page-section" id="contact">
      <div className="contact-panel">
        <div className="contact-panel__inner">
          <div>
            <span className="mono-label mono-label--accent">Start here</span>
            <h2>Have a product in mind?</h2>
            <p className="contact-panel__lede">
              Bring the problem, the sketch or the ambition. We can find the clearest path from idea to something real.
            </p>
            <div className="contact-panel__actions">
              <a className="button button--primary" href={`mailto:${COMPANY.email}`}>Email KraftStack <ArrowUpRight size={15} aria-hidden="true" /></a>
              <a className="button" href={COMPANY.whatsapp} target="_blank" rel="noopener noreferrer">Message on WhatsApp</a>
            </div>
          </div>
          <div className="contact-panel__details">
            <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}<span>Email</span></a>
            <a href={COMPANY.phoneHref}>{COMPANY.phoneDisplay}<span>Phone</span></a>
            <div>{COMPANY.author}<span>Founder</span></div>
          </div>
        </div>
      </div>
    </section>
  </main>
);

export default Home;
