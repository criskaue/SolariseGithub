import { useEffect, useState } from 'react';
import api from '../../services/api';

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

  if (carregando) return <p>Carregando contratos...</p>;
  if (erro) return <p style={{ color: 'red' }}>{erro}</p>;

  return (
    <div>
      <h2>Painel da Instaladora</h2>
      <table>
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
              <td>{c.number}</td>
              <td>{c.status}</td>
              <td>{new Date(c.start_date).toLocaleDateString('pt-BR')}</td>
              <td>R$ {c.value_kwh}</td>
              <td>{c.landlord_percentage}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      {contratos.length === 0 && <p>Nenhum contrato encontrado.</p>}
    </div>
  );
}
