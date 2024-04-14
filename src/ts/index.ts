import { notesToPlayInOrder } from "./music-to-play";
import { MusicalNote, BEATS_PER_MINUTE } from "./musical-score";

function getAudioId(note: MusicalNote): HTMLAudioElement {
    let id = note.pitch + note.octave.toString();
    if (note.accidental) {
        id += note.accidental;
    }
    console.log(id);
    return document.getElementById(id) as HTMLAudioElement;
}

function playAudio(note: MusicalNote) {
    const audioId = getAudioId(note);
    // console.log(audioId);
    if (audioId) {
        audioId.play();
        setTimeout(() => {
            audioId.pause()
            audioId.currentTime = 0;
        }, note.beats * (60000 / BEATS_PER_MINUTE));
    } else {
        console.log(`Audio element not found or ${note}`);
    }
}

function playMusic() {
    const notes = notesToPlayInOrder;

    // TODO Play these notes one after the other at the pitch and rhythm given in each note
    let time: number = 0;
    notes.forEach(note => {
        setTimeout(() => {
            playAudio(note)
        }, time * (60000 / BEATS_PER_MINUTE));
        time += note.beats
    });
}

document.getElementById('start-playing')?.addEventListener('click', playMusic);
