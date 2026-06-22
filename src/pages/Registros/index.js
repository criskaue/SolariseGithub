import { useState } from 'react';
import DashboardSidebar from '../../components/DashboardSidebar';
import styles from './Registros.module.css';
import capaImg from '../../components/images/solar2.jpg';
import logoImg from '../../components/images/Logo (2).png';

/* ── Modelo de dados do registro ── */
const PADRAO = {
  referencia: 'Março/2026',
  dia: 'Dia 28',
  geracaoTotal: '400.000',
  contrato: {
    arquivo: '47308257238668893457983754730825723869345798375.pdf',
    info: '1 página · 360 kB · pdf',
  },
  locador: 'Energia Solar LTDA',
  locatario: 'Bernardo Souza',
  energiaGerada: '1.000 kWh',
  tarifa: 'R$ 1.0000/kWh',
  percentualLocador: '100.0%',
  descontoScee: '95%',
  inicioContrato: '24/04/2024',
  valorReceber: 'R$ 950.00',
  hash: '47308257238668893457983754730825723869345798375',
};

const novoRegistro = (r) => ({ ...PADRAO, ...r });

const registros = [
  novoRegistro({ id: 'armando',  nome: 'Armando Silva',    endereco: 'Rua das laranjas, 12', consumo: '38.500Kwh - R$ 7.132,12 Mai/2026', status: null }),
  novoRegistro({ id: 'barolina', nome: 'Barolina Pinheiro', endereco: 'Rua das acácias, 8',   consumo: '----Kwh - R$ 000,00,00 00/0000',   status: 'Aguardando Registro' }),
  novoRegistro({ id: 'carolina', nome: 'Carolina Katrina',  endereco: 'Rua do Sol, 120',      consumo: '38.500Kwh - R$ 7.132,12 Mai/2026', status: null }),
  novoRegistro({ id: 'carmando', nome: 'Carmando Silva',    endereco: 'Rua do Sol, 120',      consumo: '38.500Kwh - R$ 7.132,12 Mai/2026', status: null }),
  novoRegistro({ id: 'cernarda', nome: 'Cernarda Souza',    endereco: 'Rua das flores, 5',    consumo: '----Kwh - R$ 000,00,00 00/0000',   status: 'Aguardando Registro' }),
  novoRegistro({ id: 'bernardo', nome: 'Bernardo Souza',    endereco: 'Rua do Sol, 120',      consumo: '----Kwh - R$ 000,00,00 00/0000',   status: 'Aguardando Registro' }),
  novoRegistro({ id: 'alexandra', nome: 'Alexandra Silva',  endereco: 'Rua das palmeiras, 30', consumo: '----Kwh - R$ 000,00,00 00/0000',  status: 'Aguardando Registro' }),
  novoRegistro({ id: 'weliton',  nome: 'Weliton Salgado',   endereco: 'Rua das mangueiras, 14', consumo: '----Kwh - R$ 000,00,00 00/0000', status: 'Aguardando Registro' }),
];

/* ── Ícones ── */
const IconBusca = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const IconChevron = ({ cor = '#bbb' }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={cor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const IconMais = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const Avatar = ({ grande }) => (
  <div className={`${styles.avatar} ${grande ? styles.avatarGrande : ''}`}>
    <svg viewBox="0 0 24 24" width={grande ? 64 : 22} height={grande ? 64 : 22} fill="none" stroke={grande ? '#1a3d1e' : '#7ab87e'} strokeWidth="1.6">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  </div>
);

function ItemRegistro({ registro, selecionado, onSelect }) {
  return (
    <div
      className={`${styles.registroItem} ${selecionado ? styles.registroSelecionado : ''}`}
      onClick={() => onSelect(registro)}
    >
      <Avatar />
      <div className={styles.registroInfo}>
        <span className={styles.registroNome}>{registro.nome}</span>
        <span className={styles.registroEndereco}>{registro.status || registro.endereco}</span>
        <span className={styles.registroDetalhe}>{registro.consumo}</span>
      </div>
      <IconChevron />
    </div>
  );
}

function Registros() {
  const [selecionado, setSelecionado] = useState(registros[0]); // Armando Silva
  const [busca, setBusca] = useState('');

  const registrosFiltrados = registros.filter((r) =>
    r.nome.toLowerCase().includes(busca.toLowerCase()));

  const detalhesContrato = [
    ['Locador:', selecionado?.locador],
    ['Locatário:', selecionado?.locatario],
    ['Energia gerada:', selecionado?.energiaGerada],
    ['Tarifa vigente:', selecionado?.tarifa],
    ['Percentual do locador:', selecionado?.percentualLocador],
    ['Desconto SCEE / Fio B:', selecionado?.descontoScee],
    ['Início do contrato:', selecionado?.inicioContrato],
    ['Valor a receber', selecionado?.valorReceber],
  ];

  return (
    <div className={styles.page}>
      <DashboardSidebar />

      {/* ── Lista de registros ── */}
      <section className={styles.lista}>
        <h2 className={styles.listaTitulo}>Registros</h2>
        <div className={styles.buscaWrapper}>
          <IconBusca />
          <input
            className={styles.buscaInput}
            placeholder="Pesquisar pelo nome ou data"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        <div className={styles.listaHeader}>
          <span className={styles.grupoTitulo}>Todos os registros</span>
          <button className={styles.novoBtn}><IconMais /> Novo registro</button>
        </div>

        <div className={styles.listaScroll}>
          {registrosFiltrados.map((r) => (
            <ItemRegistro key={r.id} registro={r} selecionado={selecionado?.id === r.id} onSelect={setSelecionado} />
          ))}
        </div>
      </section>

      {/* ── Detalhe do registro ── */}
      <section className={styles.detalhe}>
        <div className={styles.capa}>
          <img src={capaImg} alt="" className={styles.capaImg} />
          <Avatar grande />
        </div>
        <div className={styles.detalheNome}>
          <h2>{selecionado?.nome}</h2>
        </div>

        <div className={styles.detalheCorpo}>
          {/* Coluna de informações */}
          <div className={styles.colunaInfo}>
            <div className={styles.infoCard}>
              <div>
                <span className={styles.infoTitulo}>{selecionado?.nome}</span>
                <span className={styles.infoSub}>{selecionado?.endereco}</span>
              </div>
              <IconChevron />
            </div>
            <div className={styles.infoCard}>
              <div>
                <span className={styles.infoTitulo}>{selecionado?.referencia}</span>
                <span className={styles.infoSub}>{selecionado?.dia}</span>
              </div>
              <IconChevron />
            </div>
            <div className={styles.infoCard}>
              <div className={styles.geracaoValor}>
                <span className={styles.geracaoNum}>{selecionado?.geracaoTotal}</span>
                <span className={styles.geracaoUnidade}>kW/h</span>
              </div>
              <IconChevron />
            </div>

            <div className={styles.pdfCard}>
              <div className={styles.pdfHeader}>
                <img src={logoImg} alt="Solarise" className={styles.pdfLogo} />
                <span className={styles.pdfData}>Data: 12/03/2026</span>
              </div>
              <p className={styles.pdfTitulo}>PDF de autenticação</p>
              <div className={styles.pdfBotao}>Dados do Contrato</div>
              <p className={styles.pdfArquivo}>{selecionado?.contrato.arquivo}</p>
              <p className={styles.pdfInfo}>{selecionado?.contrato.info}</p>
            </div>
          </div>

          {/* Coluna de dados do contrato */}
          <div className={styles.colunaContrato}>
            <div className={styles.contratoCard}>
              {detalhesContrato.map(([label, valor]) => (
                <div key={label} className={styles.contratoLinha}>
                  <span className={styles.contratoLabel}>{label}</span>
                  <span className={styles.contratoValor}>{valor}</span>
                </div>
              ))}
            </div>

            <div className={styles.hashCard}>
              <div className={styles.hashHeader}>Hash de integridade SHA-256</div>
              <div className={styles.hashBox}>{selecionado?.hash}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Registros;
