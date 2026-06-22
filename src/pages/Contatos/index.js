import { useState } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
} from 'recharts';
import DashboardSidebar from '../../components/DashboardSidebar';
import styles from './Contatos.module.css';
import capaImg from '../../components/images/solar2.jpg';
import logoImg from '../../components/images/Logo (2).png';

/* ── Modelo de dados do contato ── */
const DETALHE_PADRAO = {
  referencia: 'Março/2026',
  dia: 'Dia 28',
  geracaoTotal: '400.000',
  contrato: {
    arquivo: '47308257238668893457983754730825723869345798375.pdf',
    info: '1 página · 360 kB · pdf',
  },
  geracaoMensal: [
    { label: 'Jan', realizado: 50, previsto: 50 },
    { label: 'Fev', realizado: 30, previsto: 40 },
    { label: 'Mar', realizado: 20, previsto: 15 },
  ],
};

const novoContato = (c) => ({ ...DETALHE_PADRAO, ...c });

const recentes = [
  novoContato({
    id: 'armando', nome: 'Armando Silva', endereco: 'Rua dos Sol, 120',
    consumo: '38.500Kwh - R$ 7.132,12 Mai/2026', status: null,
  }),
  novoContato({
    id: 'bernardo', nome: 'Bernardo Souza', endereco: 'Rua do Sol, 120',
    consumo: '----Kwh - R$ 000,00,00 00/0000', status: 'Aguardando registro',
  }),
];

const contatos = [
  novoContato({
    letra: 'A', id: 'aniele', nome: 'Aniele Lima', endereco: 'Rua das laranjas, 12',
    consumo: '38.500Kwh - R$ 7.132,12 Mai/2026', status: null,
  }),
  novoContato({
    letra: 'B', id: 'barolina', nome: 'Barolina Pinheiro', endereco: 'Rua das acácias, 8',
    consumo: '----Kwh - R$ 000,00,00 00/0000', status: 'Aguardando registro',
  }),
  novoContato({
    letra: 'C', id: 'carolina-k', nome: 'Carolina Katrina', endereco: 'Rua dos Sol, 120',
    consumo: '38.500Kwh - R$ 7.132,12 Mai/2026', status: null,
  }),
  novoContato({
    letra: 'C', id: 'carolina-p', nome: 'Carolina Pinhata', endereco: 'Rua das laranjas',
    consumo: '38.500Kwh - R$ 7.132,12 Mai/2026', status: null,
  }),
  novoContato({
    letra: 'C', id: 'carlos', nome: 'Carlos Souza', endereco: 'Rua das palmeiras, 30',
    consumo: '----Kwh - R$ 000,00,00 00/0000', status: 'Aguardando registro',
  }),
];

/* ── Gráficos ── */
const geracaoData = [
  { nome: 'João',   kwh: 14000 },
  { nome: 'Diego',  kwh: 28000 },
  { nome: 'Rose',   kwh: 20000 },
  { nome: 'Daniel', kwh: 30000 },
  { nome: 'Olívia', kwh: 24000 },
];
const BAR_COLORS = ['#a8d5ab', '#2d5e32', '#8fba93', '#1a3d1e', '#528B55'];

/* ── Calendário (Março/2026, conforme modelo) ── */
const DIAS_SEMANA = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const SEMANAS = [
  [null, 1, 2, 3, 4, 5, 6],
  [7, 8, 9, 10, 11, 12, 13],
  [14, 15, 16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25, 26, 27],
  [28, 29, 30, { n: 1, outro: true }, { n: 2, outro: true }, { n: 3, outro: true }, { n: 4, outro: true }],
];
const FAIXA_INICIO = 9;
const FAIXA_FIM = 13;

const eventos = [
  { hora: '05:48AM', titulo: 'Reunião com cliente', desc: 'Alinhamento sobre instalação do sistema', cor: 'verde' },
  { hora: '10:28AM', titulo: 'Instalação agendada', desc: 'Equipe técnica no local para montagem dos painéis', cor: 'laranja' },
];

/* ── Ícones ── */
const IconBusca = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const IconChat = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#bbb" strokeWidth="2" strokeLinecap="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const IconChevron = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#bbb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const IconMenu = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="#fff">
    <circle cx="12" cy="5" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="12" cy="19" r="1.6" />
  </svg>
);
const IconSetaCal = ({ dir }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {dir === 'esq' ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
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

function ItemContato({ contato, selecionado, onSelect }) {
  return (
    <div
      className={`${styles.contatoItem} ${selecionado ? styles.contatoSelecionado : ''}`}
      onClick={() => onSelect(contato)}
    >
      <Avatar />
      <div className={styles.contatoInfo}>
        <span className={styles.contatoNome}>{contato.nome}</span>
        <span className={styles.contatoEndereco}>{contato.status || contato.endereco}</span>
        <span className={styles.contatoDetalhe}>{contato.consumo}</span>
      </div>
      <div className={styles.contatoAcoes}>
        <span className={styles.menuDots}>•••</span>
        <button className={styles.chatBtn} onClick={(e) => { e.stopPropagation(); onSelect(contato); }}>
          <IconChat />
        </button>
      </div>
    </div>
  );
}

function Contatos() {
  const [selecionado, setSelecionado] = useState(recentes[1]); // Bernardo Souza
  const [busca, setBusca] = useState('');

  const filtra = (lista) => lista.filter((c) => c.nome.toLowerCase().includes(busca.toLowerCase()));
  const recentesFiltrados = filtra(recentes);
  const contatosFiltrados = filtra(contatos);

  return (
    <div className={styles.page}>
      <DashboardSidebar />

      {/* ── Lista de contatos ── */}
      <section className={styles.lista}>
        <h2 className={styles.listaTitulo}>Meus contatos</h2>
        <div className={styles.buscaWrapper}>
          <IconBusca />
          <input
            className={styles.buscaInput}
            placeholder="Pesquisar pelo nome ou data"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        <div className={styles.listaScroll}>
          {recentesFiltrados.length > 0 && (
            <>
              <p className={styles.grupoTitulo}>Recentes</p>
              {recentesFiltrados.map((c) => (
                <ItemContato key={c.id} contato={c} selecionado={selecionado?.id === c.id} onSelect={setSelecionado} />
              ))}
            </>
          )}
          {contatosFiltrados.length > 0 && (
            <>
              <p className={styles.grupoTitulo}>Contatos</p>
              {contatosFiltrados.map((c, i) => {
                const mostraLetra = i === 0 || contatosFiltrados[i - 1].letra !== c.letra;
                return (
                  <div key={c.id}>
                    {mostraLetra && <span className={styles.letraIndice}>{c.letra}</span>}
                    <ItemContato contato={c} selecionado={selecionado?.id === c.id} onSelect={setSelecionado} />
                  </div>
                );
              })}
            </>
          )}
        </div>
      </section>

      {/* ── Detalhe do contato ── */}
      <section className={styles.detalhe}>
        <div className={styles.capa}>
          <img src={capaImg} alt="" className={styles.capaImg} />
          <button className={styles.capaMenu}><IconMenu /></button>
          <Avatar grande />
        </div>
        <div className={styles.detalheNome}>
          <h2>{selecionado?.nome}</h2>
          {selecionado?.status && <span className={styles.detalheStatus}>{selecionado.status}</span>}
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

          {/* Coluna de gráficos */}
          <div className={styles.colunaGraficos}>
            <div className={styles.graficoCard}>
              <div className={styles.graficoHeader}>
                <h3 className={styles.graficoTitulo}>Geração por contrato</h3>
                <select className={styles.graficoSelect} defaultValue="ultimo">
                  <option value="ultimo">Último mês</option>
                  <option value="trimestre">Último trimestre</option>
                  <option value="ano">Último ano</option>
                </select>
              </div>
              <ResponsiveContainer width="100%" height={190}>
                <BarChart data={geracaoData} margin={{ top: 10, right: 8, left: -12, bottom: 0 }} barSize={26}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis dataKey="nome" tick={{ fontSize: 11, fill: '#aaa' }} axisLine={false} tickLine={false} />
                  <YAxis tickFormatter={(v) => (v === 0 ? '0' : `${v / 1000}K`)} tick={{ fontSize: 11, fill: '#aaa' }} axisLine={false} tickLine={false} />
                  <Bar dataKey="kwh" radius={[5, 5, 0, 0]}>
                    {geracaoData.map((_, i) => <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className={styles.graficoCard}>
              <h3 className={styles.graficoTitulo}>Geração mensal do cliente</h3>
              <ResponsiveContainer width="100%" height={190}>
                <BarChart layout="vertical" data={selecionado?.geracaoMensal} margin={{ top: 10, right: 16, left: 0, bottom: 0 }} barSize={22}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} tick={{ fontSize: 11, fill: '#aaa' }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="label" hide />
                  <Bar dataKey="realizado" stackId="a" fill="#7fae80" radius={[4, 0, 0, 4]} />
                  <Bar dataKey="previsto" stackId="a" fill="#cfe3d0" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* ── Painel direito: calendário, eventos, mídias ── */}
      <aside className={styles.painelDireito}>
        <div className={styles.calendario}>
          <div className={styles.calHeader}>
            <button className={styles.calSeta}><IconSetaCal dir="esq" /></button>
            <select className={styles.calSelect} defaultValue="Mar">
              <option>Jan</option><option>Fev</option><option>Mar</option><option>Abr</option>
              <option>Mai</option><option>Jun</option><option>Jul</option><option>Ago</option>
              <option>Set</option><option>Out</option><option>Nov</option><option>Dez</option>
            </select>
            <select className={styles.calSelect} defaultValue="2026">
              <option>2025</option><option>2026</option><option>2027</option>
            </select>
            <button className={styles.calSeta}><IconSetaCal dir="dir" /></button>
          </div>

          <div className={styles.calGrid}>
            {DIAS_SEMANA.map((d) => <span key={d} className={styles.calDiaSemana}>{d}</span>)}
            {SEMANAS.flat().map((dia, i) => {
              if (dia === null) return <span key={i} />;
              const outro = typeof dia === 'object';
              const n = outro ? dia.n : dia;
              const inicio = !outro && n === FAIXA_INICIO;
              const fim = !outro && n === FAIXA_FIM;
              const dentro = !outro && n > FAIXA_INICIO && n < FAIXA_FIM;
              const cls = [
                styles.calDia,
                outro ? styles.calDiaOutro : '',
                inicio || fim ? styles.calDiaSelecionado : '',
                dentro ? styles.calDiaFaixa : '',
              ].join(' ');
              return <span key={i} className={cls}>{n}</span>;
            })}
          </div>
        </div>

        <div className={styles.eventos}>
          <p className={styles.eventosTitulo}>Eventos próximos</p>
          {eventos.map((e, i) => (
            <div key={i} className={styles.evento}>
              <span className={`${styles.eventoDot} ${e.cor === 'verde' ? styles.dotVerde : styles.dotLaranja}`} />
              <div>
                <span className={styles.eventoHora}>{e.hora}</span>
                <p className={styles.eventoTitulo}>{e.titulo}</p>
                <p className={styles.eventoDesc}>{e.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p className={styles.midiasTitulo}>Mídias</p>
      </aside>
    </div>
  );
}

export default Contatos;
