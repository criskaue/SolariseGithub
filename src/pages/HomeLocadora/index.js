import { useState, useEffect } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, PieChart, Pie, Tooltip,
} from 'recharts';
import DashboardSidebar from '../../components/DashboardSidebar';
import api from '../../services/api';
import styles from './HomeLocadora.module.css';

const STATUS_COLORS = ['#1a3020', '#528B55', '#8fba93', '#c4dfc7'];
const AVATAR_COLORS = ['#1a3d1e', '#528B55', '#7ab87e', '#a8d5ab'];

function fmtData(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('pt-BR');
}

function fmtMoeda(valor) {
  if (valor == null) return '—';
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function fmtNum(valor) {
  if (valor == null) return '—';
  return valor.toLocaleString('pt-BR');
}

function fmtTendencia(valor) {
  if (valor == null) return null;
  const sinal = valor >= 0 ? '↑' : '↓';
  return `${sinal} ${Math.abs(valor).toFixed(1)}%`;
}

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
const IconPdf = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="12" y1="18" x2="12" y2="12"/>
    <line x1="9" y1="15" x2="15" y2="15"/>
  </svg>
);

/* ── Label no último bar do gráfico ── */
const BarLabel = ({ x, y, width, index, data }) => {
  if (!data || index !== data.length - 1) return null;
  const lastKwh = data[data.length - 1]?.kwh ?? 0;
  return (
    <g>
      <rect x={x - 2} y={y - 22} width={width + 4} height={17} rx={4} fill="#1a3d1e" />
      <text x={x + width / 2} y={y - 10} fill="#fff" textAnchor="middle" fontSize={10} fontWeight="600">
        {fmtNum(lastKwh)} kWh
      </text>
    </g>
  );
};

function HomeLocadora() {
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [baixandoPdf, setBaixandoPdf] = useState(null);

  useEffect(() => {
    api.get('/dashboard/landlord')
      .then(({ data }) => setDados(data))
      .catch(() => setErro('Não foi possível carregar o dashboard.'))
      .finally(() => setCarregando(false));
  }, []);

  async function handleDownloadPdf(geracaoId) {
    setBaixandoPdf(geracaoId);
    try {
      const response = await api.get(`/pdf/${geracaoId}`, { responseType: 'blob' });
      const url = URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = url;
      link.download = `geracao_${geracaoId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {
      // falha silenciosa — o usuário pode tentar novamente
    } finally {
      setBaixandoPdf(null);
    }
  }

  const geracaoData = dados?.geracao_mensal ?? [];
  const statusData = (dados?.status_contratos ?? []).map((item, i) => ({
    name: item.nome,
    value: item.percentual,
    color: STATUS_COLORS[i] ?? '#ccc',
  }));
  const contratos = dados?.contratos_recentes ?? [];

  if (carregando) return (
    <div className={styles.page}>
      <DashboardSidebar />
      <main className={styles.main}>
        <p style={{ color: '#888', padding: '40px 0' }}>Carregando dashboard...</p>
      </main>
    </div>
  );

  if (erro) return (
    <div className={styles.page}>
      <DashboardSidebar />
      <main className={styles.main}>
        <p style={{ color: '#e53e3e', padding: '40px 0' }}>{erro}</p>
      </main>
    </div>
  );

  return (
    <div className={styles.page}>
      <DashboardSidebar />

      <main className={styles.main}>
        {/* ── Métricas ── */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statHeader}><IconCalendario /><span className={styles.statTitle}>Valor do mês</span></div>
            <div className={styles.statValue}>{fmtMoeda(dados?.valor_mes)}</div>
            <div className={styles.statRef}>Referência: {dados?.referencia_mes ?? '—'}</div>
            <div className={styles.statTrend} style={{ color: (dados?.tendencia_valor_pct ?? 0) >= 0 ? '#528B55' : '#e53e3e' }}>
              {fmtTendencia(dados?.tendencia_valor_pct)} vs. mês anterior
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statHeader}><IconPessoa /><span className={styles.statTitle}>Registros no mês</span></div>
            <div className={styles.statValue}>{fmtNum(dados?.registros_mes)}</div>
            <div className={styles.statRef}>&nbsp;</div>
            <div className={styles.statTrend} style={{ color: (dados?.tendencia_registros_pct ?? 0) >= 0 ? '#528B55' : '#e53e3e' }}>
              {fmtTendencia(dados?.tendencia_registros_pct)} vs. mês anterior
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statHeader}><IconGrupo /><span className={styles.statTitle}>Locadores ativos</span></div>
            <div className={styles.statValue}>{fmtNum(dados?.locadores_ativos)}</div>
            <div className={styles.statRef}>&nbsp;</div>
            <div className={styles.statTrend} style={{ color: (dados?.tendencia_locadores_pct ?? 0) >= 0 ? '#528B55' : '#e53e3e' }}>
              {fmtTendencia(dados?.tendencia_locadores_pct)} vs. mês anterior
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statHeader}><IconEnergia /><span className={styles.statTitle}>Energia gerada</span></div>
            <div className={styles.statValue}>{fmtNum(dados?.energia_gerada_kwh)}<span className={styles.statUnit}>kWh</span></div>
            <div className={styles.statRef}>&nbsp;</div>
            <div className={styles.statTrend} style={{ color: (dados?.tendencia_energia_pct ?? 0) >= 0 ? '#528B55' : '#e53e3e' }}>
              {fmtTendencia(dados?.tendencia_energia_pct)} vs. mês anterior
            </div>
          </div>
        </div>

        {/* ── Gráficos ── */}
        <div className={styles.chartsRow}>
          <div className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <h3 className={styles.chartTitle}>Geração de energia (kWh)</h3>
              <select className={styles.filterSelect}>
                <option>Últimos 6 meses</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={210}>
              <BarChart data={geracaoData} margin={{ top: 28, right: 8, left: -10, bottom: 0 }} barSize={36}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="mes" tick={{ fontSize: 11, fill: '#aaa' }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={(v) => v === 0 ? '0' : `${v / 1000}k`} tick={{ fontSize: 11, fill: '#aaa' }} axisLine={false} tickLine={false} />
                <Tooltip formatter={(v) => [v.toLocaleString('pt-BR') + ' kWh', 'Geração']} />
                <Bar dataKey="kwh" radius={[5, 5, 0, 0]} label={<BarLabel data={geracaoData} />}>
                  {geracaoData.map((_, i) => (
                    <Cell key={i} fill={i === geracaoData.length - 1 ? '#1a3d1e' : '#a8d5ab'} />
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

        {/* ── Contratos recentes ── */}
        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <h3 className={styles.tableTitle}>Contratos recentes</h3>
            <button className={styles.verTodosBtn}>Ver todos</button>
          </div>

          {contratos.map((c, i) => {
            const iniciais = c.nome_locador
              ? c.nome_locador.split(' ').slice(0, 2).map(p => p[0]).join('')
              : '??';
            return (
              <div key={c.id ?? i} className={styles.contratoRow}>
                <div className={styles.contratoAvatar} style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}>
                  {iniciais}
                </div>
                <div className={styles.contratoInfo}>
                  <span className={styles.contratoNome}>{c.nome_locador}</span>
                  <span className={styles.contratoNum}>Contrato #{c.numero_contrato} • {c.status_contrato}</span>
                </div>
                <div className={styles.contratoUsina}>
                  <span>{c.usina}</span>
                  <span className={styles.capacidade}>{c.capacidade_kwp} kWp</span>
                </div>
                <div className={styles.contratoData}>
                  <span className={styles.dataLabel}>Início</span>
                  <span className={styles.dataVal}><IconCalSmall />{fmtData(c.data_inicio)}</span>
                </div>
                <div className={styles.contratoData}>
                  <span className={styles.dataLabel}>Próximo pagamento</span>
                  <span className={styles.dataVal}><IconCalSmall />{fmtData(c.proximo_pagamento)}</span>
                </div>
                <div className={styles.contratoData}>
                  <span className={styles.dataLabel}>Valor mensal</span>
                  <span className={styles.valorMensal}>{fmtMoeda(c.valor_mensal)}</span>
                </div>
                {c.ultima_geracao_id != null && (
                  <button
                    className={styles.pdfBtn}
                    onClick={() => handleDownloadPdf(c.ultima_geracao_id)}
                    disabled={baixandoPdf === c.ultima_geracao_id}
                    title="Baixar PDF da última geração"
                  >
                    {baixandoPdf === c.ultima_geracao_id ? '...' : <IconPdf />}
                  </button>
                )}
              </div>
            );
          })}

          {contratos.length === 0 && (
            <p style={{ color: '#aaa', textAlign: 'center', padding: '20px 0', fontSize: '0.85rem' }}>
              Nenhum contrato recente.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

export default HomeLocadora;
