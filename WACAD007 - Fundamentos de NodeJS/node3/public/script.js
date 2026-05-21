document.getElementById('btn-gerar').addEventListener('click', async () => {
    const qtd = document.getElementById('quantidade').value;
    const resultadoDiv = document.getElementById('resultado');
    
    resultadoDiv.innerHTML = '';

    try {
        const response = await fetch(`/api/lorem?paragraphs=${qtd}`);
        const data = await response.json();

        data.paragraphs.forEach(texto => {
            const p = document.createElement('p');
            p.textContent = texto;
            resultadoDiv.appendChild(p);
        });
    } catch (error) {
        console.error('Erro ao buscar o Lorem Ipsum:', error);
    }
});