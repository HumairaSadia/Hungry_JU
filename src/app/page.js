'use client';

/**
 * @file View for `/` - the public landing page.
 * @module app/page
 */

import Link from 'next/link';
import { useState } from 'react';

const menuItems = [
  { name: 'Campus breakfast', place: 'TSC Cafe', price: '৳85', category: 'Popular', image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=900&q=85', tone: 'sun' },
  { name: 'Chicken katsu bowl', place: 'JU Kitchen', price: '৳180', category: 'Meals', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85', tone: 'leaf' },
  { name: 'Iced matcha cloud', place: 'Green Room', price: '৳120', category: 'Drinks', image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=900&q=85', tone: 'mint' },
];

const categories = ['All', 'Popular', 'Meals', 'Drinks'];

/**
 * Landing page for discovering campus food and entering the ordering flow.
 *
 * @returns {import('react').ReactNode} Interactive landing page.
 */
export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [bagCount, setBagCount] = useState(0);

  const visibleItems = menuItems.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesQuery = `${item.name} ${item.place}`.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <main className="home-shell">
      <nav className="site-nav" aria-label="Main navigation">
        <Link className="wordmark" href="/">
          <span className="wordmark-mark">H</span>
          <span>Hungry<span className="wordmark-accent">JU</span></span>
        </Link>
        <div className="nav-links">
          <a href="#menu">Explore menu</a>
          <a href="#how-it-works">How it works</a>
        </div>
        <div className="nav-actions">
          <Link className="bag-button" href="/cart" aria-label={`Bag with ${bagCount} items`}>
            Bag <span>{bagCount}</span>
          </Link>
          <Link className="login-link" href="/login">Log in</Link>
          <Link className="nav-cta" href="/register">Join HungryJU <span aria-hidden="true">↗</span></Link>
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot" /> Jahangirnagar University, Savar</p>
          <h1>Good food.<br /><em>Zero wandering.</em></h1>
          <p className="hero-description">Your favorite campus bites, ready when your next class ends. Order ahead, pick up fresh, and get back to your day.</p>
          <div className="hero-actions">
            <Link className="primary-button" href="#menu">Find your next bite <span aria-hidden="true">↘</span></Link>
            <Link className="text-button" href="/register">I run a food spot <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="hero-proof"><span className="avatar-stack"><span>R</span><span>N</span><span>A</span></span><span><strong>2,400+</strong> JU students order here</span></div>
        </div>
        <div className="hero-visual">
          <div className="hero-photo-wrap">
            <img className="hero-photo" src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=90" alt="A fresh bowl of food on a campus table" />
            <div className="photo-sticker">made<br /><strong>for your<br />break</strong></div>
          </div>
          <div className="floating-order-card">
            <div className="order-card-top"><span className="live-dot" /> <span>Live at TSC Cafe</span><span className="order-time">12 min</span></div>
            <div className="order-item"><img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=160&q=80" alt="Chicken rice bowl" /><div><strong>Chicken rice bowl</strong><span>Extra chili · ৳180</span></div><button type="button" onClick={() => setBagCount((count) => count + 1)} aria-label="Add chicken rice bowl to bag">+</button></div>
          </div>
          <span className="sunburst sunburst-one" aria-hidden="true">✳</span>
          <span className="sunburst sunburst-two" aria-hidden="true">✳</span>
        </div>
      </section>

      <section className="menu-section" id="menu">
        <div className="section-heading"><div><p className="eyebrow">The campus edit</p><h2>What&apos;s cooking <span>today.</span></h2></div><div className="search-wrap"><span aria-hidden="true">⌕</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search your craving..." aria-label="Search menu" /></div></div>
        <div className="menu-toolbar"><div className="category-tabs" role="tablist" aria-label="Menu categories">{categories.map((category) => <button className={activeCategory === category ? 'active' : ''} key={category} type="button" onClick={() => setActiveCategory(category)}>{category}</button>)}</div><Link className="view-all" href="/shops">View all spots <span aria-hidden="true">→</span></Link></div>
        <div className="menu-grid">{visibleItems.map((item) => <article className={`menu-card ${item.tone}`} key={item.name}><div className="menu-image-wrap"><img src={item.image} alt={item.name} /><span>{item.category}</span></div><div className="menu-card-copy"><div><h3>{item.name}</h3><p>{item.place}</p></div><div className="menu-card-bottom"><strong>{item.price}</strong><button type="button" onClick={() => setBagCount((count) => count + 1)} aria-label={`Add ${item.name} to bag`}>Add <span aria-hidden="true">+</span></button></div></div></article>)}</div>
        {visibleItems.length === 0 && <p className="empty-state">No bites match that search yet. Try “bowl” or “drink”.</p>}
      </section>

      <section className="how-section" id="how-it-works"><div className="how-intro"><p className="eyebrow">The easy part</p><h2>From hungry<br /><em>to happy.</em></h2></div><div className="steps"><div className="step"><span>01</span><h3>Pick a spot</h3><p>See what&apos;s open around campus right now.</p></div><div className="step"><span>02</span><h3>Build your order</h3><p>Choose your favorites and set a pickup time.</p></div><div className="step"><span>03</span><h3>Skip the queue</h3><p>Grab, go, and make the most of your break.</p></div></div></section>
      <footer className="site-footer"><Link className="wordmark" href="/"><span className="wordmark-mark">H</span><span>Hungry<span className="wordmark-accent">JU</span></span></Link><p>Built around your campus rhythm.</p><Link href="/register">Start ordering <span aria-hidden="true">↗</span></Link></footer>
    </main>
  );
}
