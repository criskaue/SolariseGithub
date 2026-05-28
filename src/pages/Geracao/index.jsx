import { useState, useEffect } from 'react';
import api from '../../services/api';

export default function Geracao() {
  const [contratos, setContratos] = useState([]);
  const [contractId, setContractId] = useState('');
  const [energiaGerada, setEnergiaGerada] = useState('');
  const [dataHora, setDataHora] = useState('');
  const [preview, setPreview] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

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
      <div>
        <h2>Geração Registrada com Sucesso!</h2>
        <p><strong>Hash SHA256:</strong> {resultado.hash_sha256}</p>
        <p><strong>Hash anterior:</strong> {resultado.previous_hash}</p>
        <p><strong>Valor:</strong> R$ {resultado.value}</p>
        <p><strong>Data:</strong> {new Date(resultado.date).toLocaleString('pt-BR')}</p>
        <button onClick={() => { setResultado(null); setPreview(null); setContractId(''); setEnergiaGerada(''); setDataHora(''); }}>
          Novo Registro
        </button>
      </div>
    );
  }

  if (preview) {
    return (
      <div>
        <h2>Preview do Cálculo</h2>
        <p><strong>Energia gerada:</strong> {preview.generated_energy} kWh</p>
        <p><strong>Tarifa:</strong> R$ {preview.tariff}/kWh</p>
        <p><strong>% Proprietário:</strong> {preview.landlord_percentage}%</p>
        <p><strong>Fator de perda:</strong> {preview.loss_factor}</p>
        <p><strong>Fórmula:</strong> {preview.formula}</p>
        <p><strong>Valor calculado:</strong> R$ {preview.value}</p>
        {erro && <p style={{ color: 'red' }}>{erro}</p>}
        <button onClick={handleConfirm} disabled={carregando}>
          {carregando ? 'Registrando...' : 'Confirmar Registro'}
        </button>
        <button onClick={() => setPreview(null)} style={{ marginLeft: '8px' }}>
          Voltar
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handlePreview}>
      <h2>Registrar Geração</h2>

      <div>
        <label>Contrato</label>
        <select value={contractId} onChange={e => setContractId(e.target.value)} required>
          <option value="">Selecione um contrato...</option>
          {contratos.map(c => (
            <option key={c.id} value={c.id}>{c.number}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Energia gerada (kWh)</label>
        <input
          type="number"
          step="0.01"
          min="0.01"
          value={energiaGerada}
          onChange={e => setEnergiaGerada(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Data e hora</label>
        <input
          type="datetime-local"
          value={dataHora}
          onChange={e => setDataHora(e.target.value)}
          required
        />
      </div>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      <button type="submit" disabled={carregando}>
        {carregando ? 'Calculando...' : 'Calcular Preview'}
      </button>
    </form>
  );
}
