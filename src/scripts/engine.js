const pianoKeys = document.querySelectorAll('.key');
const volumeSlider = document.querySelector('.volume-slider input');
const keysCheck = document.querySelector('.keys-check input');
const pianoLetters = document.querySelector('.piano-keys span');
const validKeys = [];
let currentVolume = 0.5; // Armazena o volume atual

const togglePianoKeys = () => {
    pianoKeys.forEach(key => key.classList.toggle('hide'))
};

keysCheck.addEventListener('click', togglePianoKeys);

const playTune = (key) => {
    if (!validKeys.includes(key)) return;

    // Cria um novo objeto Audio para cada nota
    const audio = new Audio(`./src/sounds/${key}.wav`);
    audio.volume = currentVolume; // Aplica o volume atual
    audio.play();

    const pressedKey = document.querySelector(`[data-key="${key}"]`);
    if (pressedKey) {
        pressedKey.classList.add('active');
        setTimeout(() => {
            pressedKey.classList.remove('active');
        }, 200);
    }
}

pianoKeys.forEach((key) => {
    key.addEventListener('click', () => playTune(key.dataset.key));
    validKeys.push(key.dataset.key);
});

document.addEventListener('keydown', (e) => {
  if (e.key.startsWith('F')) return
    e.preventDefault();
    if (e.repeat) return;
    const key = e.key.toLowerCase();
    playTune(key);
});

const handleVolume = (e) => {
    currentVolume = e.target.value;
}

volumeSlider.addEventListener('input', handleVolume);