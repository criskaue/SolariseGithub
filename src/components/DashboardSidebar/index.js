import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './DashboardSidebar.module.css';
import logoImg from '../images/Logo (2).png';

const Icons = {
  user: (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#ccc" strokeWidth="1.5">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  inicio: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  pesquisa: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  contatos: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  historico: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  registro: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
};

const NAV_ITEMS = [
  { key: 'inicio',    label: 'Início',    icon: Icons.inicio },
  { key: 'pesquisa',  label: 'Pesquisa',  icon: Icons.pesquisa },
  { key: 'contatos',  label: 'Contatos',  icon: Icons.contatos },
  { key: 'historico', label: 'Histórico', icon: Icons.historico },
  { key: 'registro',  label: 'Registro',  icon: Icons.registro },
];

function DashboardSidebar() {
  const { user } = useAuth();
  const primeiroNome = user?.name?.split(' ')[0] ?? 'Usuário';
  const homeHref = user?.role === 'instaladora' ? '/homeinstaladora' : '/homelocadora';

  return (
    <aside className={styles.sidebar}>
      <div className={styles.topSection}>
        <div className={styles.avatarTopo}>{Icons.user}</div>
        <img src={logoImg} alt="Solarise" className={styles.logo} />
        <div className={styles.greeting}>
          <span className={styles.greetingText}>Bem vindo(a)</span>
          <span className={styles.userName}>{primeiroNome}</span>
        </div>
      </div>

      <nav className={styles.nav}>
        {NAV_ITEMS.map(({ key, label, icon }) =>
          key === 'inicio' ? (
            <NavLink
              key={key}
              to={homeHref}
              end
              className={({ isActive }) => `${styles.navItem} ${isActive ? styles.navActive : ''}`}
            >
              {icon}
              <span>{label}</span>
            </NavLink>
          ) : (
            <button key={key} className={styles.navItem}>
              {icon}
              <span>{label}</span>
            </button>
          )
        )}
      </nav>

      <div className={styles.section}>
        <p className={styles.sectionTitle}>Últimas atualizações</p>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={styles.updateCard}>
            <div className={styles.avatarCircle} />
            <div className={styles.updateLines}>
              <div className={styles.line} />
              <div className={`${styles.line} ${styles.lineShort}`} />
            </div>
          </div>
        ))}
      </div>

      <div className={styles.section}>
        <p className={styles.sectionTitle}>Eventos próximos</p>
        <div className={styles.event}>
          <span className={`${styles.dot} ${styles.dotYellow}`} />
          <div>
            <span className={styles.eventTime}>05:48AM</span>
            <p className={styles.eventTitle}>Reunião com cliente</p>
            <p className={styles.eventDesc}>Alinhamento sobre instalação do sistema</p>
          </div>
        </div>
        <div className={styles.event}>
          <span className={`${styles.dot} ${styles.dotOrange}`} />
          <div>
            <span className={styles.eventTime}>10:28AM</span>
            <p className={styles.eventTitle}>Instalação agendada</p>
            <p className={styles.eventDesc}>Equipe técnica no local para montagem dos painéis</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default DashboardSidebar;
