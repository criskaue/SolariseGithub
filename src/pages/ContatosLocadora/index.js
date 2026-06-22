import { useState } from 'react';
import DashboardSidebar from '../../components/DashboardSidebar';
import styles from './ContatosLocadora.module.css';
import capaImg from '../../components/images/solar2.jpg';
import midia1 from '../../components/images/solar.jpg';
import midia2 from '../../components/images/solar2.jpg';

/* ── Modelo de dados do contato ── */
const PERFIL_PADRAO = {
  sub: 'Manutenção agendada: 17/06',
  stats: {
    contratos: '42',
    locadores: '31',
    tempo: '2,8',
    pagamento: '100%',
  },
  dados: {
    empresa: 'Solar',
    cnpj: 'XX.XXX.XXX/0001-XX',
    cidade: 'Manaus-Am',
    fundacao: '2017',
    statusVerificado: 'Empresa verificada',
  },
};

const novoContato = (c) => ({ ...PERFIL_PADRAO, ...c });

const recentes = [
  novoContato({ id: 'hugo', nome: 'Hugo da Instaladora Solar' }),
  novoContato({ id: 'carol', nome: 'Carol da Instaladora Solar' }),
];

const contatos = [
  novoContato({ id: 'isabel', nome: 'Isabel da Instaladora Solar' }),
  novoContato({ id: 'aline', nome: 'Aline da Manutenção' }),
  novoContato({ id: 'olive', nome: 'Olive da Administração' }),
  novoContato({ id: 'afonso', nome: 'Afonso da Manutenção' }),
];

/* ── Cartões de métricas do perfil ── */
const STATS = [
  { key: 'contratos', titulo: 'Contratos ativos', sufixo: '', ref: '12,4% vs. Abr/2026' },
  { key: 'locadores', titulo: 'Locadores parceiros', sufixo: '', ref: '' },
  { key: 'tempo', titulo: 'Tempo médio de parceria', sufixo: ' anos', ref: '' },
  { key: 'pagamento', titulo: 'Pagamento registrado', sufixo: '', ref: '12,4% vs. Abr/2026' },
];

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
  { hora: '05:48AM', titulo: 'Reunião com Carolina', desc: 'Alinhamento sobre instalação do sistema', cor: 'verde' },
  { hora: '10:28AM', titulo: 'Instalação agendada', desc: 'Equipe técnica no local para montagem dos painéis', cor: 'laranja' },
];

/* ── Conversa de exemplo ── */
const MENSAGENS = [
  {
    id: 1, tipo: 'recebida', hora: '3:00PM',
    galeria: [midia1, midia2, midia1],
    texto: 'Ah sei lá o que sei lá o que mais ah sei lá o que sei lá o que mais\nAh sei lá o que sei lá o que mais',
  },
  {
    id: 2, tipo: 'enviada', hora: '3:00PM',
    texto: 'Ah sei lá o que sei lá o que mais e tal e tal e tal',
  },
  {
    id: 3, tipo: 'enviada', hora: '3:00PM',
    citacao: { imagem: midia1, texto: 'Loren ipssun loratic son opinon suramorum octips larum' },
    texto: 'Isso é engraçado',
  },
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
const IconChevron = ({ dir = 'dir' }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {dir === 'esq' ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
  </svg>
);
const IconMenu = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="#fff">
    <circle cx="12" cy="5" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="12" cy="19" r="1.6" />
  </svg>
);
const IconCheckMsg = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#9bbf9e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconSetaCal = ({ dir }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {dir === 'esq' ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
  </svg>
);
const IconCalendario = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#9aa0a6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const IconUsuario = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#9aa0a6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);
const IconUp = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#7ab87e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="18 15 12 9 6 15" />
  </svg>
);
const Avatar = ({ grande }) => (
  <div className={`${styles.avatar} ${grande ? styles.avatarGrande : ''}`}>
    <svg viewBox="0 0 24 24" width={grande ? 70 : 22} height={grande ? 70 : 22} fill="none" stroke={grande ? '#1a3d1e' : '#7ab87e'} strokeWidth="1.6">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  </div>
);

function ItemContato({ contato, selecionado, onSelect, onChat }) {
  return (
    <div
      className={`${styles.contatoItem} ${selecionado ? styles.contatoSelecionado : ''}`}
      onClick={() => onSelect(contato)}
    >
      <Avatar />
      <div className={styles.contatoInfo}>
        <span className={styles.contatoNome}>{contato.nome}</span>
        <span className={styles.contatoSub}>{contato.sub}</span>
      </div>
      <div className={styles.contatoAcoes}>
        <span className={styles.menuDots}>•••</span>
        <button
          className={styles.chatBtn}
          onClick={(e) => { e.stopPropagation(); onChat(contato); }}
        >
          <IconChat />
        </button>
      </div>
    </div>
  );
}

/* ── Visão de perfil (modelo da imagem 2) ── */
function VisaoPerfil({ contato }) {
  return (
    <>
      <section className={styles.perfil}>
        <div className={styles.capa}>
          <img src={capaImg} alt="" className={styles.capaImg} />
          <button className={styles.capaMenu}><IconMenu /></button>
          <Avatar grande />
        </div>

        <div className={styles.perfilNome}>
          <h2>{contato.nome}</h2>
          <span className={styles.perfilSub}>{contato.sub}</span>
        </div>

        <div className={styles.statsGrid}>
          {STATS.map((s) => (
            <div key={s.key} className={styles.statCard}>
              <div className={styles.statHeader}>
                <span className={styles.statIcone}>
                  {s.key === 'locadores' ? <IconUsuario /> : <IconCalendario />}
                </span>
                <span className={styles.statTitulo}>{s.titulo}</span>
              </div>
              <div className={styles.statValor}>
                {contato.stats[s.key]}
                {s.sufixo && <span className={styles.statSufixo}>{s.sufixo}</span>}
              </div>
              {s.ref && (
                <div className={styles.statRef}><IconUp /> {s.ref}</div>
              )}
            </div>
          ))}
        </div>

        <div className={styles.dadosSecao}>
          <p className={styles.dadosTitulo}>Dados sobre a instaladora</p>
          <table className={styles.dadosTabela}>
            <tbody>
              <tr><td className={styles.dadosChave}>Nome da empresa</td><td>{contato.dados.empresa}</td></tr>
              <tr><td className={styles.dadosChave}>CNPJ</td><td>{contato.dados.cnpj}</td></tr>
              <tr><td className={styles.dadosChave}>Cidade/Estado</td><td>{contato.dados.cidade}</td></tr>
              <tr><td className={styles.dadosChave}>Ano de fundação</td><td>{contato.dados.fundacao}</td></tr>
              <tr><td className={styles.dadosChave}>Status verificado</td><td>{contato.dados.statusVerificado}</td></tr>
            </tbody>
          </table>
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
        <div className={styles.midiasGrid}>
          <img src={midia1} alt="" className={styles.midiaGrande} />
          <div className={styles.midiasColuna}>
            <img src={midia2} alt="" />
            <img src={midia1} alt="" />
          </div>
        </div>
      </aside>
    </>
  );
}

/* ── Visão de chat (modelo da imagem 1) ── */
function VisaoChat({ contato, onVoltar }) {
  return (
    <section className={styles.chat}>
      <header className={styles.chatHeader}>
        <button className={styles.chatNav} onClick={onVoltar}><IconChevron dir="esq" /></button>
        <div className={styles.chatHeaderInfo}>
          <span className={styles.chatHeaderNome}>{contato.nome}</span>
          <span className={styles.chatHeaderSub}>{contato.sub}</span>
        </div>
        <button className={styles.chatNav}><IconChevron dir="dir" /></button>
      </header>

      <div className={styles.chatCorpo}>
        {MENSAGENS.map((m) => (
          <div
            key={m.id}
            className={`${styles.msgLinha} ${m.tipo === 'enviada' ? styles.msgLinhaEnviada : ''}`}
          >
            {m.tipo === 'recebida' && <Avatar />}

            <div className={styles.msgConteudo}>
              {m.galeria && (
                <div className={styles.msgGaleria}>
                  <img src={m.galeria[0]} alt="" className={styles.msgGaleriaGrande} />
                  <div className={styles.msgGaleriaColuna}>
                    <img src={m.galeria[1]} alt="" />
                    <img src={m.galeria[2]} alt="" />
                  </div>
                </div>
              )}

              {m.citacao && (
                <div className={styles.msgCitacao}>
                  <img src={m.citacao.imagem} alt="" className={styles.msgCitacaoImg} />
                  <span>{m.citacao.texto}</span>
                </div>
              )}

              {m.texto && (
                <p className={`${styles.msgTexto} ${m.tipo === 'enviada' ? styles.msgTextoEnviada : ''}`}>
                  {m.texto}
                </p>
              )}

              <span className={styles.msgHora}>
                {m.hora}
                {m.tipo === 'enviada' && <IconCheckMsg />}
              </span>
            </div>

            {m.tipo === 'enviada' && <Avatar />}
          </div>
        ))}
      </div>
    </section>
  );
}

function ContatosLocadora() {
  const [selecionado, setSelecionado] = useState(recentes[0]); // Hugo
  const [visao, setVisao] = useState('perfil'); // 'perfil' | 'chat'
  const [busca, setBusca] = useState('');

  const abrirPerfil = (c) => { setSelecionado(c); setVisao('perfil'); };
  const abrirChat = (c) => { setSelecionado(c); setVisao('chat'); };

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
                <ItemContato
                  key={c.id} contato={c}
                  selecionado={selecionado?.id === c.id}
                  onSelect={abrirPerfil} onChat={abrirChat}
                />
              ))}
            </>
          )}
          {contatosFiltrados.length > 0 && (
            <>
              <p className={styles.grupoTitulo}>Contatos</p>
              {contatosFiltrados.map((c) => (
                <ItemContato
                  key={c.id} contato={c}
                  selecionado={selecionado?.id === c.id}
                  onSelect={abrirPerfil} onChat={abrirChat}
                />
              ))}
            </>
          )}
        </div>
      </section>

      {/* ── Conteúdo: perfil ou chat ── */}
      {visao === 'chat'
        ? <VisaoChat contato={selecionado} onVoltar={() => setVisao('perfil')} />
        : <VisaoPerfil contato={selecionado} />}
    </div>
  );
}

export default ContatosLocadora;
