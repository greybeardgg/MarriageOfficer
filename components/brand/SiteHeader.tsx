export function SiteHeader() {
  return (
    <header style={{ borderBottom: '1px solid var(--border-hairline)' }}>
      <div className="mx-auto max-w-5xl px-6" style={{ display: 'flex', alignItems: 'center', padding: 'var(--space-4) 0' }}>
        <a href="/">
          <img src="/logo-charcoal.svg" alt="Ryan Hogarth Professional Marriage Officers" width={168} height={118} style={{ width: 168, height: 'auto' }} />
        </a>
      </div>
    </header>
  );
}
