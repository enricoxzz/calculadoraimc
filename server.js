const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.post('/calcular', (req, res) => {
    let { nome, peso, altura } = req.body;

    
    peso = parseFloat(peso);
    altura = parseFloat(altura);

    
    if (altura > 3) {
        altura = altura / 100;
    }
    // ---------------------

    const imc = peso / (altura * altura);

    let rota = '';
    let classificacao = '';
    let mensagem = '';

    if (imc < 18.5) {
        rota = '/abaixoPeso';
        classificacao = 'Abaixo do peso';
        mensagem = 'Você pode melhorar sua alimentação! 💪';
    } 
    else if (imc < 25) {
        rota = '/pesoNormal';
        classificacao = 'Peso normal';
        mensagem = 'Parabéns! Continue assim! 🎉';
    } 
    else if (imc < 30) {
        rota = '/sobrePeso';
        classificacao = 'Sobrepeso';
        mensagem = 'Pequenas mudanças fazem diferença! 🚀';
    } 
    else {
        rota = '/obesidade';
        classificacao = 'Obesidade';
        mensagem = 'Cuide da sua saúde, você consegue! ❤️';
    }

    res.redirect(
        `${rota}?nome=${encodeURIComponent(nome)}&peso=${peso}&altura=${altura}&classificacao=${encodeURIComponent(classificacao)}&mensagem=${encodeURIComponent(mensagem)}`
    );
});


app.get('/abaixoPeso', (req, res) => res.sendFile(__dirname + '/views/abaixoPeso.html'));
app.get('/pesoNormal', (req, res) => res.sendFile(__dirname + '/views/pesoNormal.html'));
app.get('/sobrePeso', (req, res) => res.sendFile(__dirname + '/views/sobrePeso.html'));
app.get('/obesidade', (req, res) => res.sendFile(__dirname + '/views/obesidade.html'));
app.get('/informacoes', (req, res) => res.sendFile(__dirname + '/views/informacoes.html'));

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});