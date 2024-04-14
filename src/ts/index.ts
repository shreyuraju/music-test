import { notesToPlayInOrder } from "./music-to-play";
import { MusicalNote, BEATS_PER_MINUTE } from "./musical-score";

const delay = 60000/BEATS_PER_MINUTE;

//function to get audio id
function getAudioId(note: MusicalNote): HTMLAudioElement {
    let id = note.pitch + note.octave.toString();
    //adding the extra pitch if it exist
    if (note.accidental) {
        id += note.accidental;
    }
    console.log(id);
//returning the audio element which is already exist in index.html
    return document.getElementById(id) as HTMLAudioElement;
}

//function to play audio using notes
function playAudio(note: MusicalNote) {
    //call back function get Audio ID 
    const audioId = getAudioId(note);
    // console.log(audioId);
    if (audioId) {
        //playing audio
        audioId.play();
        setTimeout(() => {
            //stopping audio and reseting play time to 0
            audioId.pause()
            audioId.currentTime = 0;
            //use of note.beats to play the duration of audio
        }, note.beats * delay);
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
        }, time * delay);
        time += note.beats;
    });
}

document.getElementById('start-playing')?.addEventListener('click', playMusic);
