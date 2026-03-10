export default function Header() {
  return (
    <header className="header">
      <div className="header-bar">
        <div className="header-logo">
          <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="18" fill="white" />
            <path
              d="M20 6C12.27 6 6 12.27 6 20s6.27 14 14 14 14-6.27 14-14S27.73 6 20 6zm-2 22.5l-7-7 1.41-1.41L18 25.67l9.59-9.59L29 17.5l-11 11z"
              fill="#EC0029"
            />
          </svg>
          <span className="header-title">BANORTE</span>
        </div>
        <nav className="header-nav">
          <span>Inicio</span>
          <span>Cuentas</span>
          <span>Inversiones</span>
          <span>Transferencias</span>
        </nav>
      </div>
    </header>
  );
}
