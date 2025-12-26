const INIT_AUDIOS = [
    {
        key: 'gameover',
        path: '/src/assets/sound/music/gameover.mp3'
    }
]

export function initAudios({ load }) {
    INIT_AUDIOS.forEach(audio => {
        load.audio(audio.key, audio.path)
    })
}

export function playAudio(id, { sound }, { volume = 1 } = {}) {
    try {
        const audio = sound.add(id, { volume })
        audio.play()
    } catch (e) {
        console.error("Error playing audio:", e)
    }
}