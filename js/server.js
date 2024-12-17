const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: true }));

const usuariosFilePath = path.join(__dirname, 'usuarios.json');


app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, 'cadastro.html'));
});


app.post('/cadastro', (req, res) => {
    const { email, senha, nome, sobrenome, endereco, bairro, cep } = req.body;

    
    fs.readFile(usuariosFilePath, 'utf8', (err, data) => {
        if (err) {
            console.log('Erro ao ler o arquivo:', err);
            return res.status(500).send('Erro no servidor.');
        }

        const usuarios = JSON.parse(data);  
        const newUser = { email, senha, nome, sobrenome, endereco, bairro, cep };

        usuarios.push(newUser); 


        fs.writeFile(usuariosFilePath, JSON.stringify(usuarios, null, 2), 'utf8', (err) => {
            if (err) {
                console.log('Erro ao salvar o arquivo:', err);
                return res.status(500).send('Erro no servidor.');
            }

            res.status(201).send('Usuário cadastrado com sucesso!');
        });
    });
});


app.listen(port, () => {
    console.log(`Servidor rodando na porta http://localhost:${port}`);
});