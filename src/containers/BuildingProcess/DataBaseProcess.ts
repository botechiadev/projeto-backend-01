export const DataBaseProcess:string=`
<article id="DataBaseProcess">
      <h3 class="titleEndpoint">DATA BASE building Process</h3>
      <ol>
        <li class="topicTitle">BaseDatabase</li>
          <ul>
          <li>Criacao da <strong>class BaseDatabase</strong> : Camada de conexao a banco de dados que permite uma estrutura padronizada a traves da padronizacao com POO e criacao de uma classe propria que centraliza a conexao com o query builder knexx usado em projeto :
              <ul>  
                <li><strong>Class Abstract e Protected </strong>
                  <ul>
                    <li><strong>Abstract:</strong> Nao permite que classe seja instanciavel </li>

                    <li>
                      <strong>
                        Protected:
                      </strong> permite uso da classe somente em instancias filhas 
                    </li>
                  </ul>
                </li>
                <li><strong>Metodo Publico connection:</strong> Metodo publico que serve como centralizacao para conexao com base de dados</li>
              </ul>
          </li>  
          </ul>
      </ol>
</article>
`