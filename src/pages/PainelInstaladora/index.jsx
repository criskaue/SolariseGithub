import { useEffect, useState } from 'react';
import api from '../../services/api';
import DashboardSidebar from '../../components/DashboardSidebar';
import styles from './PainelInstaladora.module.css';

export default function PainelInstaladora() {
  const [contratos, setContratos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    api.get('/contracts/')
      .then(({ data }) => setContratos(data))
      .catch(() => setErro('Erro ao carregar contratos. Verifique sua sessão.'))
      .finally(() => setCarregando(false));
  }, []);

  if (carregando) return <div className={styles.estado}>Carregando contratos...</div>;
  if (erro) return <div className={`${styles.estado} ${styles.estadoErro}`}>{erro}</div>;

  return (
    <div className={styles.page}>
      <DashboardSidebar />

      <main className={styles.main}>
        <h2 className={styles.titulo}>Painel da Instaladora</h2>
        <p className={styles.subtitulo}>Acompanhe todos os contratos sob sua gestão.</p>

        <div className={styles.tabelaCard}>
          <table className={styles.tabela}>
            <thead>
              <tr>
                <th>Número</th>
                <th>Status</th>
                <th>Início</th>
                <th>Valor kWh</th>
                <th>% Proprietário</th>
              </tr>
            </thead>
            <tbody>
              {contratos.map(c => (
                <tr key={c.id}>
                  <td className={styles.numero}>{c.number}</td>
                  <td><span className={styles.statusBadge}>{c.status}</span></td>
                  <td>{new Date(c.start_date).toLocaleDateString('pt-BR')}</td>
                  <td>R$ {c.value_kwh}</td>
                  <td>{c.landlord_percentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
          {contratos.length === 0 && <p className={styles.vazio}>Nenhum contrato encontrado.</p>}
        </div>
      </main>
    </div>
  );
}
