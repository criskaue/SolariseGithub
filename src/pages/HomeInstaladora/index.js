import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, PieChart, Pie, Tooltip,
} from 'recharts';
import DashboardSidebar from '../../components/DashboardSidebar';
import styles from './HomeInstaladora.module.css';

/* ── Dados dos gráficos ── */
const geracaoData = [
  { nome: 'João',   kwh: 14000 },
  { nome: 'Diego',  kwh: 18000 },
  { nome: 'Rosa',   kwh: 30000 },
  { nome: 'Daniel', kwh: 20000 },
  { nome: 'Olivia', kwh: 24000 },
];

const BAR_COLORS = ['#a8d5ab', '#2d5e32', '#1a3d1e', '#528B55', '#7ab87e'];

const statusData = [
  { name: 'Registrado',          value: 52.1, color: '#1a3020' },
  { name: 'Pendente',            value: 22.8, color: '#528B55' },
  { name: 'Aguardando ativação', value: 13.9, color: '#8fba93' },
  { name: 'Inativo',             value: 11.2, color: '#c4dfc7' },
];

const contatos = [
  {
    nome: 'Armando Silva', contrato: 'Contrato #10234 - Ativo',
    usina: 'Usina solar Boa Vista', capacidade: '100 kWp',
    inicio: '12/03/2023', valorMensal: 'R$ 1.250,00',
  },
  {
    nome: 'Armando Silva', contrato: 'Contrato #10234 - Ativo',
    usina: 'Usina solar Boa Vista', capacidade: '100 kWp',
    inicio: '12/03/2023', valorMensal: 'R$ 1.250,00',
  },
];

/* ── Ícones ── */
const IconCalendario = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#528B55" strokeWidth="1.5" strokeLinecap="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const IconPessoa = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#528B55" strokeWidth="1.5" strokeLinecap="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconGrupo = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#528B55" strokeWidth="1.5" strokeLinecap="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const IconEnergia = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#528B55" strokeWidth="1.5" strokeLinecap="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);
const IconCalSmall = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" style={{ marginRight: 3, verticalAlign: 'middle' }}>
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const IconChat = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#bbb" strokeWidth="2" strokeLinecap="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);
const IconAvatarUser = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="#bbb">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4" fill="#bbb"/>
  </svg>
);

function HomeInstaladora() {
  return (
    <div className={styles.page}>
      <DashboardSidebar />

      <main className={styles.main}>
        {/* ── Métricas ── */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statHeader}><IconCalendario /><span className={styles.statTitle}>Valor do mês</span></div>
            <div className={styles.statValue}>R$ 9.325,50</div>
            <div className={styles.statRef}>Referência: Maio/2026</div>
            <div className={styles.statTrend}>↑ 12,4% vs. Abr/2026</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statHeader}><IconPessoa /><span className={styles.statTitle}>Registros no mês</span></div>
            <div className={styles.statValue}>180</div>
            <div className={styles.statRef}>&nbsp;</div>
            <div className={styles.statTrend}>↑ 5,3% vs. Abr/2026</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statHeader}><IconGrupo /><span className={styles.statTitle}>Locadores ativos</span></div>
            <div className={styles.statValue}>280</div>
            <div className={styles.statRef}>&nbsp;</div>
            <div className={styles.statTrend}>↑ 8,6% vs. Abr/2026</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statHeader}><IconEnergia /><span className={styles.statTitle}>Energia gerada</span></div>
            <div className={styles.statValue}>400.000<span className={styles.statUnit}>kWh</span></div>
            <div className={styles.statRef}>&nbsp;</div>
            <div className={styles.statTrend}>↑ 10,1% vs. Abr/2026</div>
          </div>
        </div>

        {/* ── Gráficos ── */}
        <div className={styles.chartsRow}>
          <div className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <h3 className={styles.chartTitle}>Geração por contrato</h3>
              <select className={styles.chartSelect} defaultValue="ultimo">
                <option value="ultimo">Último mês</option>
                <option value="trimestre">Último trimestre</option>
                <option value="ano">Último ano</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={210}>
              <BarChart data={geracaoData} margin={{ top: 10, right: 8, left: -10, bottom: 0 }} barSize={40}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="nome" tick={{ fontSize: 11, fill: '#aaa' }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={(v) => v === 0 ? '0' : `${v / 1000}K`} tick={{ fontSize: 11, fill: '#aaa' }} axisLine={false} tickLine={false} />
                <Tooltip formatter={(v) => [v.toLocaleString('pt-BR') + ' kWh', 'Geração']} />
                <Bar dataKey="kwh" radius={[5, 5, 0, 0]}>
                  {geracaoData.map((_, i) => (
                    <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className={styles.chartCard}>
            <h3 className={styles.chartTitle}>Status dos contratos</h3>
            <div className={styles.donutWrapper}>
              <PieChart width={160} height={160}>
                <Pie data={statusData} cx={75} cy={75} innerRadius={50} outerRadius={76} dataKey="value" strokeWidth={0}>
                  {statusData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
              </PieChart>
              <div className={styles.donutLegend}>
                {statusData.map((item) => (
                  <div key={item.name} className={styles.legendItem}>
                    <span className={styles.legendDot} style={{ background: item.color }} />
                    <span className={styles.legendName}>{item.name}</span>
                    <span className={styles.legendPct}>{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Contatos Regulares ── */}
        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <h3 className={styles.tableTitle}>Contatos Regulares</h3>
            <button className={styles.verTodosBtn}>Ver todos</button>
          </div>

          {contatos.map((c, i) => (
            <div key={i} className={styles.contatoRow}>
              <div className={styles.contatoAvatar}><IconAvatarUser /></div>
              <div className={styles.contatoInfo}>
                <span className={styles.contatoNome}>{c.nome}</span>
                <span className={styles.contatoNum}>{c.contrato}</span>
              </div>
              <div className={styles.contatoUsina}>
                <span>{c.usina}</span>
                <span className={styles.capacidade}>{c.capacidade}</span>
              </div>
              <div className={styles.contatoData}>
                <span className={styles.dataLabel}>Início</span>
                <span className={styles.dataVal}><IconCalSmall />{c.inicio}</span>
              </div>
              <div className={styles.contatoData}>
                <span className={styles.dataLabel}>Valor mensal</span>
                <span className={styles.valorMensal}>{c.valorMensal}</span>
              </div>
              <button className={styles.chatBtn}><IconChat /></button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default HomeInstaladora;
