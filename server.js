// =============================================
// SERVIDOR MULTIPLAYER BÁSICO PARA ELDORIA
// =============================================

const WebSocket = require('ws');

// Define a porta em que o servidor vai rodar.
// Usamos 8081 para não conflitar com o servidor do jogo (8080).
const wss = new WebSocket.Server({ port: 8081 });

console.log("✅ Servidor Multiplayer de Eldoria iniciado na porta 8081.");
console.log("Aguardando jogadores se conectarem...");

// Esta função será chamada toda vez que um novo jogador se conectar.
wss.on('connection', function connection(ws) {
    
    console.log("👨‍💻 Um novo jogador se conectou!");

    // Envia uma mensagem de boas-vindas para o jogador que acabou de entrar.
    ws.send("Bem-vindo ao mundo online de Eldoria!");

    // Esta função será chamada quando o servidor receber uma mensagem do jogador.
    ws.on('message', function incoming(message) {
        console.log('Mensagem recebida do jogador:', message.toString());

        // Re-envia a mensagem para todos os outros jogadores conectados.
        // É assim que o chat e as ações compartilhadas funcionarão no futuro.
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });

    // Esta função será chamada quando um jogador se desconectar.
    ws.on('close', () => {
        console.log("👋 Um jogador se desconectou.");
    });
});