import { useEffect, useState } from 'react'; // Importa useEffect e useState do React
import Modal from '../Modal/Modal'; // Importa o componente Modal
import './styles.css'; // Importa o arquivo de estilos CSS

function Timer() {
  // Define os estados iniciais
  const [time, setTime] = useState(0); // Estado para controlar o tempo do cronômetro
  const [isActive, setIsActive] = useState(false); // Estado para verificar se o cronômetro está ativo
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar a abertura do modal
  const [startCount, setStartCount] = useState(0); // Estado para contar quantas vezes o cronômetro foi iniciado
  const [pauseCount, setPauseCount] = useState(0); // Estado para contar quantas vezes o cronômetro foi pausado
  const [isFinished, setIsFinished] = useState(false); // Estado para verificar se o cronômetro foi encerrado
  const [showDashboardButton, setShowDashboardButton] = useState(false); // Estado para controlar a habilitação do botão do dashboard

  // useEffect para controlar o intervalo do cronômetro
  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1); // Incrementa o tempo em 1 segundo
      }, 1000);
    } else {
      clearInterval(interval); // Limpa o intervalo se o cronômetro não estiver ativo
    }
    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, [isActive]); // Executa o efeito quando o estado isActive muda

  // Função para iniciar o cronômetro
  const startTimer = () => {
    setIsActive(true); // Ativa o cronômetro
    setStartCount(prev => prev + 1); // Incrementa o contador de inícios
    setShowDashboardButton(false); // Desabilita o botão do dashboard quando o cronômetro inicia
    setIsFinished(false); // Define isFinished como false ao iniciar o cronômetro novamente
  };
  
  // Função para pausar o cronômetro
  const pauseTimer = () => {
    setIsActive(false); // Desativa o cronômetro
    setPauseCount(prev => prev + 1); // Incrementa o contador de pausas
  };                              

  // Função para encerrar o cronômetro
  const resetTimer = () => {
    setIsFinished(true); // Define isFinished como true
    setIsActive(false); // Desativa o cronômetro
    setShowDashboardButton(true); // Habilita o botão do dashboard ao encerrar o cronômetro
  };

  // Função para formatar números para string com 2 dígitos
  const parseTimeToString = (time) => {
    return String(time).padStart(2, '0'); // Adiciona zero à esquerda se necessário
  }

  // Função para formatar o tempo em hh:mm:ss
  const formatTime = (time) => {
    const hours = parseTimeToString(Math.floor(time / 3600)); // Calcula horas
    const minutes = parseTimeToString(Math.floor((time % 3600) / 60)); // Calcula minutos
    const seconds = parseTimeToString(Math.floor(time % 60)); // Calcula segundos

    return `${hours}:${minutes}:${seconds}`; // Retorna o tempo formatado
  };

  const currentDate = new Date().toLocaleDateString(); // Obtém a data atual formatada

  return (
    <>
      {/* Modal para mostrar as informações do dia */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p>Data: {currentDate}</p>
        <p>Tempo total contado: {formatTime(time)}</p>
        <p>Quantidade de vezes iniciado: {startCount}</p>
        <p>Quantidade de vezes pausado: {pauseCount}</p>
      </Modal>
      {/* Exibição do cronômetro */}
      <h1 id="counter">{isFinished ? '00:00:00' : formatTime(time)}</h1>
      {/* Botões de controle do cronômetro */}
      <span className="timesheet-buttons">
          <button id="start" onClick={startTimer} disabled={isActive} className="start-button">Iniciar</button>
          <button id="pause" onClick={pauseTimer} className="pause-button" disabled={!isActive}>Pausar</button>
          <button id="stop" onClick={resetTimer} className="stop-button" disabled={isActive}>Encerrar</button>
      </span>
      {/* Botão para abrir o dashboard */}
      <span className="timesheet-progress">
          <button id="dashboard" onClick={() => setIsModalOpen(true)} className="progress-button" disabled={!showDashboardButton}>Vamos ver como foi seu dia?</button>
      </span>
    </>
  );
}

export default Timer;
