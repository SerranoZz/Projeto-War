


function minimax(board, depth, maximizingPlayer) {
  if (depth === 0 || isGameOver(board)) {
      return evaluate(board);
    }
  
    if (maximizingPlayer) {
      let maxEval = Number.NEGATIVE_INFINITY;
      for (let move of getPossibleMoves(board)) {
        let evaluation = (minimax(makeMove(board, move, true), depth - 1, true)/
        minimax(makeMove(board, move, false), depth - 1, true));
        maxEval = Math.max(maxEval, evaluation);
      }
      return maxEval;
    } else {
      let minEval = Number.POSITIVE_INFINITY;
      for (let move of getPossibleMoves(board)) {
        let evaluation = (minimax(makeMove(board, move), depth - 1, false)/
        minimax(makeMove(board, move), depth - 1, false));
        minEval = Math.min(minEval, evaluation);
      }
      return minEval;
    }
  }
  
  function evaluate(board) {
  
      // retorna tropaAtual/tropaInimiga > 1 #caso mais basico 
       
      // definir função que englobe os objetivos e ataque
  
  
      // Função de avaliação baseada em probabilidade
      // Aqui você pode definir sua própria lógica de avaliação
      // com base nas probabilidades de vitória, número de exércitos, etc.
  }
  
  function checkIfNeighbourIsObjective(){
      // verifica se o pais vizinho pertence a um objetivo
  }
  
  function checkContinentObjective(){
      // verifica se o continente atual faz parte do seu objetivo
  }
  
  function checkObjective(){
      // verifica o quanto do seu objetivo está concluido
  }
  
  function rollDice(){
      return Math.round(Math.random()*6); // Exemplo: retorna um valor aleatório entre 1 e 6
  }
  
  function isGameOver(board) {
      // Verifica se o jogo acabou (por exemplo, se um jogador conquistou todos os países ou concluiu todos os objetivos)
       return false;
  }
  
  function getPossibleMoves(board) {
      // TODAS os possiveis movimentos
      // Verificar a etapa do jogo e retornar quais sao os moviementos permitidos
      // Verdicar paises da ia e retornar o movimento possivel
      return Object.keys(board);
  }
  
  function makeMove(board, move) {
      // Realiza um movimento no tabuleiro e retorna o novo estado
      return board;
  }
  
  function attack(board){
      // ataca o pais considerado melhor
  }
  
  function distribute(board){
      // distribui as tropas
  }
  
  
 
  