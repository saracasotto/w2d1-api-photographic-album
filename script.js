
const apiKey = 'OPVxaSax5EsWIL2BnWR1tOeFtLwf12SUrazsHLVis38iJHhDoIYUpCg9';
const query = 'japan';  // query ricerca
let page = 1; // Numero di pagina iniziale
let loading = false; // Stato del caricamento

// Funzione per caricare le immagini
async function loadImages() {
    if (loading) return; // Evita il doppio caricamento
    loading = true;

    const url = `https://api.pexels.com/v1/search?query=${query}&page=${page}`;
    const response = await fetch(url, {
        headers: {
            'Authorization': apiKey
        }
    });

    const data = await response.json();

    const imageContainer = document.getElementById('image-container');
    data.photos.forEach(photo => {
        const col = document.createElement('div');
        col.classList.add('col-md-4', 'mb-4');

        const card = document.createElement('div');
        card.classList.add('card');

        const img = document.createElement('img');
        img.src = photo.src.medium;
        img.classList.add('card-img-top', 'img-fluid');

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.innerText = photo.photographer;

        cardBody.appendChild(cardTitle);
        card.appendChild(img);
        card.appendChild(cardBody);
        col.appendChild(card);
        imageContainer.appendChild(col);
    });

    loading = false;
    page++; // Incrementa il numero di pagina per la prossima richiesta
}

// Funzione per controllare se l'utente ha raggiunto il fondo della pagina
function handleScroll() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
        loadImages();
    }
}

// Aggiungi un listener per l'evento scroll
window.addEventListener('scroll', handleScroll);

// Carica le prime immagini al caricamento della pagina
loadImages();