import { useState, useEffect } from 'react';
import api from '../../services/api';
import DashboardSidebar from '../../components/DashboardSidebar';
import styles from './Geracao.module.css';

const IconCheck = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

export default function Geracao() {
  const [contratos, setContratos] = useState([]);
  const [contractId, setContractId] = useState('');
  const [energiaGerada, setEnergiaGerada] = useState('');
  const [dataHora, setDataHora] = useState('');
  const [preview, setPreview] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [baixandoPdf, setBaixandoPdf] = useState(false);

  useEffect(() => {
    api.get('/contracts/').then(({ data }) => setContratos(data));
  }, []);

  async function handlePreview(e) {
    e.preventDefault();
    setErro('');
    setCarregando(true);
    try {
      const { data } = await api.post('/generation/preview', {
        contract_id: contractId,
        generated_energy: parseFloat(energiaGerada),
        date: new Date(dataHora).toISOString(),
      });
      setPreview(data);
    } catch {
      setErro('Erro ao calcular preview. Verifique os dados e tente novamente.');
    } finally {
      setCarregando(false);
    }
  }

  async function handleDownloadPdf(geracaoId) {
    setBaixandoPdf(true);
    setErro('');
    try {
      const response = await api.get(`/pdf/${geracaoId}`, {
        responseType: 'blob', // instrui o axios a tratar a resposta como dado binário
      });

      // Cria uma URL temporária apontando para o blob recebido
      const url = URL.createObjectURL(response.data);

      // Cria um link invisível, dispara o download e remove o link
      const link = document.createElement('a');
      link.href = url;
      link.download = `geracao_${geracaoId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Libera a memória ocupada pela URL temporária
      URL.revokeObjectURL(url);
    } catch {
      setErro('Não foi possível baixar o PDF. Tente novamente.');
    } finally {
      setBaixandoPdf(false);
    }
  }

  async function handleConfirm() {
    setErro('');
    setCarregando(true);
    try {
      const { data } = await api.post('/generation/', {
        contract_id: contractId,
        generated_energy: parseFloat(energiaGerada),
        date: new Date(dataHora).toISOString(),
      });
      setResultado(data);
    } catch {
      setErro('Erro ao registrar geração.');
    } finally {
      setCarregando(false);
    }
  }

  if (resultado) {
    return (
      <div className={styles.page}>
        <DashboardSidebar />
        <main className={styles.main}>
          <div className={styles.card}>
            <div className={styles.sucessoBanner}>
              <IconCheck />
              <span className={styles.sucessoTexto}>Geração registrada com sucesso!</span>
            </div>

            <div className={styles.resumo}>
              <div className={styles.linha}>
                <span className={styles.linhaLabel}>Hash SHA256</span>
                <span className={styles.linhaValor}>{resultado.hash_sha256}</span>
              </div>
              <div className={styles.linha}>
                <span className={styles.linhaLabel}>Hash anterior</span>
                <span className={styles.linhaValor}>{resultado.previous_hash}</span>
              </div>
              <div className={styles.linha}>
                <span className={styles.linhaLabel}>Valor</span>
                <span className={`${styles.linhaValor} ${styles.valorDestaque}`}>R$ {resultado.value}</span>
              </div>
              <div className={styles.linha}>
                <span className={styles.linhaLabel}>Data</span>
                <span className={styles.linhaValor}>{new Date(resultado.date).toLocaleString('pt-BR')}</span>
              </div>
            </div>

            {erro && <p className={styles.erro}>{erro}</p>}

            <div className={styles.botoes}>
              <button className={styles.btnPrimario} onClick={() => handleDownloadPdf(resultado.id)} disabled={baixandoPdf}>
                {baixandoPdf ? 'Gerando PDF...' : 'Baixar PDF'}
              </button>
              <button
                className={styles.btnSecundario}
                onClick={() => { setResultado(null); setPreview(null); setContractId(''); setEnergiaGerada(''); setDataHora(''); }}
              >
                Novo Registro
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (preview) {
    return (
      <div className={styles.page}>
        <DashboardSidebar />
        <main className={styles.main}>
          <div className={styles.card}>
            <h2 className={styles.titulo}>Preview do Cálculo</h2>
            <p className={styles.subtitulo}>Confira os valores antes de registrar a geração.</p>

            <div className={styles.resumo}>
              <div className={styles.linha}>
                <span className={styles.linhaLabel}>Energia gerada</span>
                <span className={styles.linhaValor}>{preview.generated_energy} kWh</span>
              </div>
              <div className={styles.linha}>
                <span className={styles.linhaLabel}>Tarifa</span>
                <span className={styles.linhaValor}>R$ {preview.tariff}/kWh</span>
              </div>
              <div className={styles.linha}>
                <span className={styles.linhaLabel}>% Proprietário</span>
                <span className={styles.linhaValor}>{preview.landlord_percentage}%</span>
              </div>
              <div className={styles.linha}>
                <span className={styles.linhaLabel}>Fator de perda</span>
                <span className={styles.linhaValor}>{preview.loss_factor}</span>
              </div>
              <div className={styles.linha}>
                <span className={styles.linhaLabel}>Fórmula</span>
                <span className={styles.linhaValor}>{preview.formula}</span>
              </div>
              <div className={styles.linha}>
                <span className={styles.linhaLabel}>Valor calculado</span>
                <span className={`${styles.linhaValor} ${styles.valorDestaque}`}>R$ {preview.value}</span>
              </div>
            </div>

            {erro && <p className={styles.erro}>{erro}</p>}

            <div className={styles.botoes}>
              <button className={styles.btnPrimario} onClick={handleConfirm} disabled={carregando}>
                {carregando ? 'Registrando...' : 'Confirmar Registro'}
              </button>
              <button className={styles.btnSecundario} onClick={() => setPreview(null)}>
                Voltar
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <DashboardSidebar />
      <main className={styles.main}>
        <form className={styles.card} onSubmit={handlePreview}>
          <h2 className={styles.titulo}>Registrar Geração</h2>
          <p className={styles.subtitulo}>Informe os dados para calcular o valor da geração.</p>

          <div className={styles.campo}>
            <label className={styles.label}>Contrato</label>
            <select className={styles.select} value={contractId} onChange={e => setContractId(e.target.value)} required>
              <option value="">Selecione um contrato...</option>
              {contratos.map(c => (
                <option key={c.id} value={c.id}>{c.number}</option>
              ))}
            </select>
          </div>

          <div className={styles.campo}>
            <label className={styles.label}>Energia gerada (kWh)</label>
            <input
              className={styles.input}
              type="number"
              step="0.01"
              min="0.01"
              value={energiaGerada}
              onChange={e => setEnergiaGerada(e.target.value)}
              required
            />
          </div>

          <div className={styles.campo}>
            <label className={styles.label}>Data e hora</label>
            <input
              className={styles.input}
              type="datetime-local"
              value={dataHora}
              onChange={e => setDataHora(e.target.value)}
              required
            />
          </div>

          {erro && <p className={styles.erro}>{erro}</p>}

          <div className={styles.botoes}>
            <button className={styles.btnPrimario} type="submit" disabled={carregando}>
              {carregando ? 'Calculando...' : 'Calcular Preview'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
