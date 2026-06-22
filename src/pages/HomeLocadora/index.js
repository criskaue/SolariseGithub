import DashboardSidebar from '../../components/DashboardSidebar';
import styles from './HomeLocadora.module.css';

/* ── Histórico de auditoria ── */
const HASH_EXEMPLO = 'a3f7b2c1d9e0f4a7...';

const auditoria = [
  { mes: 'Junho',     hash: HASH_EXEMPLO, anterior: HASH_EXEMPLO, status: 'Válido' },
  { mes: 'Maio',      hash: HASH_EXEMPLO, anterior: HASH_EXEMPLO, status: 'Válido' },
  { mes: 'Abril',     hash: HASH_EXEMPLO, anterior: HASH_EXEMPLO, status: 'Válido' },
  { mes: 'Março',     hash: HASH_EXEMPLO, anterior: HASH_EXEMPLO, status: 'Válido' },
  { mes: 'Fevereiro', hash: HASH_EXEMPLO, anterior: HASH_EXEMPLO, status: 'Válido' },
  { mes: 'Janeiro',   hash: HASH_EXEMPLO, anterior: HASH_EXEMPLO, status: 'Válido' },
];

const explicacoes = [
  'Cada mês gera um código hash único que se conecta ao mês anterior.',
  'Se alguém alterar qualquer dado antigo, toda a corrente de hashes será quebrada',
  'Essa cadeia protege seus registros e garante que nada foi alterado em seu histórico de ganhos',
];

/* ── Ícones ── */
const IconEscudo = () => (
  <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);
const IconCheck = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconSeta = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

function HomeLocadora() {
  return (
    <div className={styles.page}>
      <DashboardSidebar />

      <main className={styles.main}>
        {/* ── Banner de verificação ── */}
        <div className={styles.banner}>
          <div className={styles.bannerIcone}><IconEscudo /></div>
          <p className={styles.bannerTexto}>
            <strong>Todos os registros verificados.</strong> Nenhuma adulteração detectada.
          </p>
        </div>

        {/* ── Histórico de Auditoria ── */}
        <div className={styles.divisor}>
          <span>Histórico de Auditoria</span>
        </div>

        <div className={styles.tabelaCard}>
          <table className={styles.tabela}>
            <thead>
              <tr>
                <th>Mês</th>
                <th>Hash do Mês</th>
                <th>Hash Anterior</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {auditoria.map((linha) => (
                <tr key={linha.mes}>
                  <td>
                    <span className={styles.mesDot} />
                    {linha.mes}
                  </td>
                  <td className={styles.hashCol}>{linha.hash}</td>
                  <td className={styles.hashCol}>
                    {linha.anterior}
                    <button className={styles.verBtn}>Ver completo <IconSeta /></button>
                  </td>
                  <td>
                    <span className={styles.statusBadge}>{linha.status} <IconCheck /></span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── Como funciona ── */}
        <div className={styles.explicacaoCard}>
          <h3 className={styles.explicacaoTitulo}>Como funciona a verificação?</h3>
          {explicacoes.map((texto, i) => (
            <div key={i} className={styles.explicacaoItem}>
              <span className={styles.explicacaoDot} />
              <span>{texto}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default HomeLocadora;
