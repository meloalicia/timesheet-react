import { useEffect, useState } from 'react';
import Modal from '../Modal/Modal';
import './styles.css';

function Timer() {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startCount, setStartCount] = useState(0);
  const [pauseCount, setPauseCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);



  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const startTimer = () => {
    setIsActive(true);
    setStartCount(prev => prev + 1)
  };
  
  const pauseTimer = () => {
    setIsActive(false);
    setPauseCount(prev => prev + 1)
  };

  const resetTimer = () => {
    setIsFinished(true);
    setIsActive(false);
  };

  const parseTimeToString = (time) => {
    return String(time).padStart(2, '0');
  }

  // Function to format seconds to hh:mm:ss
  const formatTime = (time) => {
    const hours = parseTimeToString(Math.floor(time / 3600));
    const minutes = parseTimeToString(Math.floor((time % 3600) / 60));
    const seconds = parseTimeToString(Math.floor(time % 60));

    return `${hours}:${minutes}:${seconds}`;
  };

  const currentDate = new Date().toLocaleDateString();

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p>Data: {currentDate}</p>
        <p>Tempo total contado: {formatTime(time)}</p>
        <p>Quantidade de vezes iniciado: {startCount}</p>
        <p>Quantidade de vezes pausado: {pauseCount}</p>
      </Modal>
      <h1 id="counter">{isFinished ? '00:00:00' : formatTime(time)}</h1>
      <span className="timesheet-buttons">
          <button id="start" onClick={startTimer} disabled={isActive} className="start-button">Iniciar</button>
          <button id="pause" onClick={pauseTimer} className="pause-button" disabled={!isActive}>Pausar</button>
          <button id="stop" onClick={resetTimer} className="stop-button"  disabled={isActive}>Encerrar</button>
      </span>
      <span className="timesheet-progress">
          <button id="dashboard" onClick={() => setIsModalOpen(true)} className="progress-button" disabled={!isFinished}>Vamos ver como foi seu dia?</button>
      </span>
    </>
  );
}

export default Timer;
